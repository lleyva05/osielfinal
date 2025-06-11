function App() {
    try {
        const [user, setUser] = React.useState(null);
        const [activeSection, setActiveSection] = React.useState('dashboard');
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            const currentUser = AuthService.getCurrentUser();
            if (currentUser && AuthService.isAuthenticated()) {
                setUser(currentUser);
            }
            setLoading(false);
        }, []);

        const handleLogin = (userData) => {
            setUser(userData);
        };

        const handleLogout = () => {
            AuthService.logout();
            setUser(null);
            setActiveSection('dashboard');
        };

        const handleSectionChange = (section) => {
            setActiveSection(section);
        };

        if (loading) {
            return (
                <div className="d-flex justify-content-center align-items-center vh-100" data-name="loading" data-file="app.js">
                    <div className="text-center">
                        <i className="fas fa-spinner fa-spin fa-3x text-primary mb-3"></i>
                        <p>Cargando...</p>
                    </div>
                </div>
            );
        }

        if (!user) {
            return <LoginForm onLogin={handleLogin} />;
        }

        return (
            <Navigation
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                user={user}
                onLogout={handleLogout}
            />
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
