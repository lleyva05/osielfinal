function Navigation({ activeSection, onSectionChange, user, onLogout }) {
    try {
        const menuItems = [
            { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
            { id: 'contactos', label: 'Contactos', icon: 'fas fa-users' },
            { id: 'compras', label: 'Compras', icon: 'fas fa-shopping-cart' },
            { id: 'negocios', label: 'Negocios', icon: 'fas fa-handshake' },
            { id: 'tickets', label: 'Tickets', icon: 'fas fa-ticket-alt' }
        ];

        return (
            <div className="d-flex flex-column" data-name="navigation" data-file="components/Navigation.js">
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">
                            <i className="fas fa-chart-line me-2"></i>
                            CRM System
                        </span>
                        <div className="d-flex align-items-center">
                            <span className="text-white me-3">
                                <i className="fas fa-user me-1"></i>
                                {user.name}
                            </span>
                            <button 
                                className="btn btn-outline-light btn-sm"
                                onClick={onLogout}
                            >
                                <i className="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="d-flex flex-grow-1">
                    <div className="sidebar bg-dark text-white p-3" style={{width: '250px'}}>
                        <ul className="nav nav-pills flex-column">
                            {menuItems.map(item => (
                                <li key={item.id} className="nav-item mb-2">
                                    <button
                                        className={`nav-link text-start w-100 ${activeSection === item.id ? 'active' : 'text-white'}`}
                                        onClick={() => onSectionChange(item.id)}
                                    >
                                        <i className={`${item.icon} me-2`}></i>
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="main-content flex-grow-1 p-4">
                        {activeSection === 'dashboard' && <Dashboard />}
                        {activeSection === 'contactos' && <Contactos />}
                        {activeSection === 'compras' && <Compras />}
                        {activeSection === 'negocios' && <Negocios />}
                        {activeSection === 'tickets' && <Tickets />}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Navigation component error:', error);
        reportError(error);
    }
}
