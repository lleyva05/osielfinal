function LoginForm({ onLogin }) {
    try {
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            const result = await AuthService.login(email, password);
            
            if (result.success) {
                onLogin(result.user);
            } else {
                setError(result.error);
            }
            
            setLoading(false);
        };

        return (
            <div className="login-container d-flex align-items-center justify-content-center" data-name="login-form" data-file="components/LoginForm.js">
                <div className="card card-shadow" style={{width: '400px'}}>
                    <div className="card-body p-4">
                        <div className="text-center mb-4">
                            <i className="fas fa-user-circle fa-3x text-primary mb-3"></i>
                            <h3 className="card-title">Iniciar Sesión</h3>
                            <p className="text-muted">Accede a tu CRM</p>
                        </div>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@crm.com"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="admin123"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span>
                                        <i className="fas fa-spinner fa-spin me-2"></i>
                                        Iniciando...
                                    </span>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </button>
                        </form>

                        <div className="text-center mt-3">
                            <small className="text-muted">
                                Demo: admin@crm.com / admin123
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LoginForm component error:', error);
        reportError(error);
    }
}
