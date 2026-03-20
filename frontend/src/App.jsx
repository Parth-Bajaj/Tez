import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { NewsProvider } from "./context/NewsContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NewsProvider>
          <RouterProvider router={router} />
        </NewsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

