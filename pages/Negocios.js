function Negocios() {
    try {
        const [negocios, setNegocios] = React.useState([]);
        const [showForm, setShowForm] = React.useState(false);
        const [formData, setFormData] = React.useState({
            titulo: '',
            cliente: '',
            valor: '',
            etapa: 'prospecto',
            fechaCierre: ''
        });

        React.useEffect(() => {
            setNegocios(StorageService.getNegocios());
        }, []);

        const handleSubmit = (e) => {
            e.preventDefault();
            const nuevoNegocio = StorageService.saveNegocio(formData);
            setNegocios([...negocios, nuevoNegocio]);
            setFormData({
                titulo: '',
                cliente: '',
                valor: '',
                etapa: 'prospecto',
                fechaCierre: ''
            });
            setShowForm(false);
        };

        const getEtapaBadge = (etapa) => {
            const badges = {
                prospecto: 'secondary',
                calificado: 'primary',
                propuesta: 'warning',
                negociacion: 'info',
                cerrado: 'success',
                perdido: 'danger'
            };
            return badges[etapa] || 'secondary';
        };

        return (
            <div data-name="negocios" data-file="pages/Negocios.js">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Negocios</h2>
                    <button 
                        className="btn btn-primary"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Nuevo Negocio
                    </button>
                </div>

                {showForm && (
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5>Crear Nuevo Negocio</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Título</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.titulo}
                                            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Cliente</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.cliente}
                                            onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Valor</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="form-control"
                                            value={formData.valor}
                                            onChange={(e) => setFormData({...formData, valor: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Etapa</label>
                                        <select
                                            className="form-select"
                                            value={formData.etapa}
                                            onChange={(e) => setFormData({...formData, etapa: e.target.value})}
                                        >
                                            <option value="prospecto">Prospecto</option>
                                            <option value="calificado">Calificado</option>
                                            <option value="propuesta">Propuesta</option>
                                            <option value="negociacion">Negociación</option>
                                            <option value="cerrado">Cerrado</option>
                                            <option value="perdido">Perdido</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Fecha Cierre</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={formData.fechaCierre}
                                            onChange={(e) => setFormData({...formData, fechaCierre: e.target.value})}
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
                        {negocios.length === 0 ? (
                            <div className="text-center py-4">
                                <i className="fas fa-handshake fa-3x text-muted mb-3"></i>
                                <p className="text-muted">No hay negocios registrados</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Título</th>
                                            <th>Cliente</th>
                                            <th>Valor</th>
                                            <th>Etapa</th>
                                            <th>Fecha Cierre</th>
                                            <th>Creado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {negocios.map(negocio => (
                                            <tr key={negocio.id}>
                                                <td>{negocio.titulo}</td>
                                                <td>{negocio.cliente}</td>
                                                <td>${parseFloat(negocio.valor).toFixed(2)}</td>
                                                <td>
                                                    <span className={`badge bg-${getEtapaBadge(negocio.etapa)}`}>
                                                        {negocio.etapa}
                                                    </span>
                                                </td>
                                                <td>{negocio.fechaCierre ? new Date(negocio.fechaCierre).toLocaleDateString() : '-'}</td>
                                                <td>{new Date(negocio.createdAt).toLocaleDateString()}</td>
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
        console.error('Negocios component error:', error);
        reportError(error);
    }
}
