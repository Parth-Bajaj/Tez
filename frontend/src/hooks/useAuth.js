import { useContext } from "react";

  const context = useContext(AuthContext);
  if (!context) {
  }
  return context;
}
