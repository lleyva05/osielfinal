function Tickets() {
    try {
        const [tickets, setTickets] = React.useState([]);
        const [showForm, setShowForm] = React.useState(false);
        const [formData, setFormData] = React.useState({
            titulo: '',
            descripcion: '',
            prioridad: 'media',
            estado: 'abierto',
            asignado: ''
        });

        React.useEffect(() => {
            setTickets(StorageService.getTickets());
        }, []);

        const handleSubmit = (e) => {
            e.preventDefault();
            const nuevoTicket = StorageService.saveTicket(formData);
            setTickets([...tickets, nuevoTicket]);
            setFormData({
                titulo: '',
                descripcion: '',
                prioridad: 'media',
                estado: 'abierto',
                asignado: ''
            });
            setShowForm(false);
        };

        const getPrioridadBadge = (prioridad) => {
            const badges = {
                baja: 'success',
                media: 'warning',
                alta: 'danger',
                critica: 'dark'
            };
            return badges[prioridad] || 'secondary';
        };

        const getEstadoBadge = (estado) => {
            const badges = {
                abierto: 'primary',
                'en-progreso': 'warning',
                resuelto: 'success',
                cerrado: 'secondary'
            };
            return badges[estado] || 'secondary';
        };

        return (
            <div data-name="tickets" data-file="pages/Tickets.js">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Tickets de Soporte</h2>
                    <button 
                        className="btn btn-primary"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Nuevo Ticket
                    </button>
                </div>

                {showForm && (
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5>Crear Nuevo Ticket</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Título</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.titulo}
                                        onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={formData.descripcion}
                                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                                        required
                                    ></textarea>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Prioridad</label>
                                        <select
                                            className="form-select"
                                            value={formData.prioridad}
                                            onChange={(e) => setFormData({...formData, prioridad: e.target.value})}
                                        >
                                            <option value="baja">Baja</option>
                                            <option value="media">Media</option>
                                            <option value="alta">Alta</option>
                                            <option value="critica">Crítica</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Estado</label>
                                        <select
                                            className="form-select"
                                            value={formData.estado}
                                            onChange={(e) => setFormData({...formData, estado: e.target.value})}
                                        >
                                            <option value="abierto">Abierto</option>
                                            <option value="en-progreso">En Progreso</option>
                                            <option value="resuelto">Resuelto</option>
                                            <option value="cerrado">Cerrado</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Asignado a</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.asignado}
                                            onChange={(e) => setFormData({...formData, asignado: e.target.value})}
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
                        {tickets.length === 0 ? (
                            <div className="text-center py-4">
                                <i className="fas fa-ticket-alt fa-3x text-muted mb-3"></i>
                                <p className="text-muted">No hay tickets registrados</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Título</th>
                                            <th>Prioridad</th>
                                            <th>Estado</th>
                                            <th>Asignado</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tickets.map(ticket => (
                                            <tr key={ticket.id}>
                                                <td>{ticket.titulo}</td>
                                                <td>
                                                    <span className={`badge bg-${getPrioridadBadge(ticket.prioridad)}`}>
                                                        {ticket.prioridad}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge bg-${getEstadoBadge(ticket.estado)}`}>
                                                        {ticket.estado}
                                                    </span>
                                                </td>
                                                <td>{ticket.asignado || '-'}</td>
                                                <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
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
        console.error('Tickets component error:', error);
        reportError(error);
    }
}
