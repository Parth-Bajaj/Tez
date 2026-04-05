import { createContext, useEffect, useMemo, useState } from "react";

import { seededNews } from "@/data/newsSeed";
import { analyticsApi, authApi, blockchainApi, predictionApi } from "@/services/api";
import {
  CACHE_KEY,
  CUSTOM_NEWS_KEY,
  HISTORY_KEY,
  TOKEN_KEY,
  USER_KEY,
  decodeToken,
  readJSON,
  writeJSON,
} from "@/utils/storage";
import { applyTheme, getStoredTheme } from "@/utils/theme";

export const AuthContext = createContext(null);

function normalizeAxiosError(error, fallback) {
  return (
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => readJSON(USER_KEY, null));
  const [history, setHistory] = useState(() => readJSON(HISTORY_KEY, []));
  const [customNews, setCustomNews] = useState(() => readJSON(CUSTOM_NEWS_KEY, []));
  const [predictionCache, setPredictionCache] = useState(() => readJSON(CACHE_KEY, {}));
  const [bootstrapping, setBootstrapping] = useState(true);
  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!token) {
      setBootstrapping(false);
      return;
    }

    const decoded = decodeToken(token);
    if (!decoded?.sub) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
      setBootstrapping(false);
      return;
    }

    const hydratedUser = {
      username: decoded.sub,
      role: decoded.role || "user"
    };

    setUser((currentUser) => currentUser || hydratedUser);
    writeJSON(USER_KEY, hydratedUser);
    setBootstrapping(false);
  }, [token]);

  useEffect(() => {
    writeJSON(HISTORY_KEY, history);
  }, [history]);

  useEffect(() => {
    writeJSON(CUSTOM_NEWS_KEY, customNews);
  }, [customNews]);

  useEffect(() => {
    writeJSON(CACHE_KEY, predictionCache);
  }, [predictionCache]);

  const pushToast = (message, type = "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToast({ id, message, type });
    window.clearTimeout(pushToast.timeoutId);
    pushToast.timeoutId = window.setTimeout(() => setToast(null), 3200);
  };

  const persistSession = (accessToken) => {
    const decoded = decodeToken(accessToken);
    const nextUser = {
      username: decoded?.sub || "unknown",
      role: decoded?.role || "user"
    };

    localStorage.setItem(TOKEN_KEY, accessToken);
    writeJSON(USER_KEY, nextUser);
    setToken(accessToken);
    setUser(nextUser);
    return nextUser;
  };

  const signup = async (payload) => {
    const response = await authApi.signup(payload);
    persistSession(response.data.access_token);
    pushToast("Account created successfully.", "success");
  };

  const login = async (payload) => {
    const response = await authApi.login(payload);
    persistSession(response.data.access_token);
    pushToast("Welcome back.", "success");
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    pushToast("You have been signed out.", "info");
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const getPredictionKey = (text) => text.trim().toLowerCase();

  const recordHistory = (entry) => {
    setHistory((currentHistory) => [
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        createdAt: new Date().toISOString(),
        ...entry
      },
      ...currentHistory
    ]);
  };

  const saveCustomNews = (article) => {
    const item = {
      id: `custom-${Date.now()}`,
      headline: article.headline.trim(),
      content: article.content.trim(),
      source: "Submitted by you",
      category: "Custom"
    };
    setCustomNews((currentItems) => [item, ...currentItems]);
    return item;
  };

  const requestPrediction = async (text, options = { store: false, headline: "" }) => {
    const key = getPredictionKey(text);
    if (!options.store && predictionCache[key]) {
      return { ...predictionCache[key], cached: true };
    }

    try {
      const response = options.store
        ? await predictionApi.predictAndStore({ text })
        : await predictionApi.predict({ text });

      const result = response.data;
      const cacheableResult = {
        ...result,
        text,
        headline: options.headline
      };

      setPredictionCache((currentCache) => ({
        ...currentCache,
        [key]: cacheableResult
      }));

      recordHistory({
        headline: options.headline || text.slice(0, 60),
        text,
        label: result.label,
        confidence: result.confidence,
        txHash: result.txHash || null,
        verificationId: result.hash || null
      });

      return result;
    } catch (error) {
      const message = normalizeAxiosError(error, "Request failed. Please try again.");
      pushToast(message, "error");
      throw new Error(message);
    }
  };

  const refreshProfile = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await authApi.profile();
      const nextUser = {
        username: response.data.username || user?.username,
        role: response.data.role || user?.role || "user"
      };
      setUser(nextUser);
      writeJSON(USER_KEY, nextUser);
      return response.data;
    } catch {
      return {
        username: user?.username,
        role: user?.role || "user",
        history
      };
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsApi.summary();
      return response.data;
    } catch (error) {
      const message = normalizeAxiosError(error, "Unable to load analytics.");
      pushToast(message, "error");
      throw new Error(message);
    }
  };

  const verifyHash = async (hash) => {
    try {
      const response = await blockchainApi.verify(hash.trim());
      return response.data;
    } catch (error) {
      const message = normalizeAxiosError(error, "Verification record not found.");
      pushToast(message, "error");
      throw new Error(message);
    }
  };

  const feedItems = useMemo(() => [...customNews, ...seededNews], [customNews]);

  const value = useMemo(
    () => ({
      token,
      user,
      history,
      customNews,
      feedItems,
      predictionCache,
      bootstrapping,
      toast,
      theme,
      isAuthenticated: Boolean(token),
      signup,
      login,
      logout,
      toggleTheme,
      pushToast,
      requestPrediction,
      saveCustomNews,
      refreshProfile,
      fetchAnalytics,
      verifyHash,
    }),
    [token, user, history, customNews, feedItems, predictionCache, bootstrapping, toast, theme]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
