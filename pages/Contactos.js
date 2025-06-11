function Contactos() {
    try {
        const [contactos, setContactos] = React.useState([]);
        const [showForm, setShowForm] = React.useState(false);
        const [formData, setFormData] = React.useState({
            nombre: '',
            email: '',
            telefono: '',
            empresa: '',
            cargo: ''
        });

        React.useEffect(() => {
            setContactos(StorageService.getContactos());
        }, []);

        const handleSubmit = (e) => {
            e.preventDefault();
            const nuevoContacto = StorageService.saveContacto(formData);
            setContactos([...contactos, nuevoContacto]);
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                empresa: '',
                cargo: ''
            });
            setShowForm(false);
        };

        return (
            <div data-name="contactos" data-file="pages/Contactos.js">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Contactos</h2>
                    <button 
                        className="btn btn-primary"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Nuevo Contacto
                    </button>
                </div>

                {showForm && (
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5>Agregar Nuevo Contacto</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Teléfono</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            value={formData.telefono}
                                            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Empresa</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.empresa}
                                            onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Cargo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.cargo}
                                            onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-success">
                                        <i className="fas fa-save me-2"></i>Guardar
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="card">
                    <div className="card-body">
                        {contactos.length === 0 ? (
                            <div className="text-center py-4">
                                <i className="fas fa-users fa-3x text-muted mb-3"></i>
                                <p className="text-muted">No hay contactos registrados</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Teléfono</th>
                                            <th>Empresa</th>
                                            <th>Cargo</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contactos.map(contacto => (
                                            <tr key={contacto.id}>
                                                <td>{contacto.nombre}</td>
                                                <td>{contacto.email}</td>
                                                <td>{contacto.telefono}</td>
                                                <td>{contacto.empresa}</td>
                                                <td>{contacto.cargo}</td>
                                                <td>{new Date(contacto.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Contactos component error:', error);
        reportError(error);
    }
}
