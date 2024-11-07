import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(credentials) {
      // Implémentez votre logique de connexion ici
    },

    async logout() {
      this.user = null;
      this.token = null;
      // Ajoutez ici toute logique supplémentaire de déconnexion
    },

    async register(userData) {
      // Implémentez votre logique d'inscription ici
    },
  },
});
