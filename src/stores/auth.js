import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(email, password) {
      try {
        // Remplacez ceci par votre appel API réel
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const userData = await response.json();
        this.user = userData;
        this.isAuthenticated = true;

        // Si vous utilisez des tokens JWT, vous pouvez les stocker ici
        if (userData.token) {
          localStorage.setItem("token", userData.token);
        }

        return true;
      } catch (error) {
        console.error("Login error:", error);
        this.user = null;
        this.isAuthenticated = false;
        return false;
      }
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
  },
});
