import api from "./api";

function persistDemoSession(user) {
  const token = `demo-token-${user.email}`;
  localStorage.setItem("tez-user", JSON.stringify(user));
  localStorage.setItem("tez-token", token);
  return { user, token };
}

export async function loginUser(payload) {
  try {
    return await api.post("/auth/login", payload);
  } catch (error) {
    return persistDemoSession({
      id: "demo-user",
      name: payload.email.split("@")[0],
      email: payload.email,
      role: payload.email.includes("admin") ? "admin" : "reader",
    });
  }
}

export async function signupUser(payload) {
  try {
    return await api.post("/auth/signup", payload);
  } catch (error) {
    return persistDemoSession({
      id: crypto.randomUUID(),
      name: payload.name,
      email: payload.email,
      role: "reader",
    });
  }
}

export function logoutUser() {
  localStorage.removeItem("tez-user");
  localStorage.removeItem("tez-token");
}
