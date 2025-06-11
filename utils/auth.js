const AuthService = {
    login: async (email, password) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (email === 'admin@crm.com' && password === 'admin123') {
                const user = {
                    id: '1',
                    email: email,
                    name: 'Administrador',
                    role: 'admin'
                };
                localStorage.setItem('crmUser', JSON.stringify(user));
                localStorage.setItem('crmToken', 'fake-jwt-token');
                return { success: true, user };
            }
            
            throw new Error('Credenciales inválidas');
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    logout: () => {
        localStorage.removeItem('crmUser');
        localStorage.removeItem('crmToken');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('crmUser');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('crmToken');
    }
};
