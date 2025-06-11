function Dashboard() {
    try {
        const [stats, setStats] = React.useState({
            contactos: 0,
            compras: 0,
            negocios: 0,
            tickets: 0
        });

        React.useEffect(() => {
            setStats({
                contactos: StorageService.getContactos().length,
                compras: StorageService.getCompras().length,
                negocios: StorageService.getNegocios().length,
                tickets: StorageService.getTickets().length
            });
        }, []);

        const statsCards = [
            { title: 'Contactos', value: stats.contactos, icon: 'fas fa-users', color: 'primary' },
            { title: 'Compras', value: stats.compras, icon: 'fas fa-shopping-cart', color: 'success' },
            { title: 'Negocios', value: stats.negocios, icon: 'fas fa-handshake', color: 'warning' },
            { title: 'Tickets', value: stats.tickets, icon: 'fas fa-ticket-alt', color: 'info' }
        ];

        return (
            <div data-name="dashboard" data-file="components/Dashboard.js">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Dashboard</h2>
                    <small className="text-muted">
                        {new Date().toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </small>
                </div>

                <div className="row">
                    {statsCards.map((card, index) => (
                        <div key={index} className="col-md-3 mb-4">
                            <div className={`card stats-card border-${card.color}`}>
                                <div className="card-body text-center">
                                    <div className={`text-${card.color} mb-3`}>
                                        <i className={`${card.icon} fa-2x`}></i>
                                    </div>
                                    <h3 className="card-title">{card.value}</h3>
                                    <p className="card-text text-muted">{card.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Bienvenido al CRM System</h5>
                            </div>
                            <div className="card-body">
                                <p>Gestiona eficientemente tus contactos, compras, negocios y tickets desde un solo lugar.</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Funcionalidades principales:</h6>
                                        <ul>
                                            <li>Gestión de contactos</li>
                                            <li>Control de compras</li>
                                            <li>Seguimiento de negocios</li>
                                            <li>Sistema de tickets</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Dashboard component error:', error);
        reportError(error);
    }
}
