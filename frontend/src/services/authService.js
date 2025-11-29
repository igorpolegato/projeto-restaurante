// Chave para salvar o "token" no navegador
const AUTH_KEY = "quiosque_admin_token";

// Helper de delay para simular API
const delay = () => new Promise((resolve) => setTimeout(resolve, 800));

export const authService = {
  // 1. LOGIN (Verifica senha e cria sessão)
  async login(email, password) {
    await delay(); // Simula tempo de rede

    // MOCK: Num sistema real, isso bateria na API do Firebase/Backend
    if (email === "admin@quiosque.com" && password === "admin123") {
      const fakeToken = "jwt_token_simulado_" + Date.now();
      localStorage.setItem(AUTH_KEY, fakeToken);

      return {
        success: true,
        user: { name: "Gerente", email: "admin@quiosque.com" },
        token: fakeToken,
      };
    }

    return { success: false, message: "Credenciais inválidas." };
  },

  // 2. LOGOUT (Destrói sessão)
  logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "/admin/login"; // Força recarregamento para limpar estados
  },

  // 3. VERIFICAÇÃO (O usuário está logado?)
  isAuthenticated() {
    return !!localStorage.getItem(AUTH_KEY);
  },
};
