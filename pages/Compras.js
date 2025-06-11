function Compras() {
    try {
        const [compras, setCompras] = React.useState([]);
        const [showForm, setShowForm] = React.useState(false);
        const [formData, setFormData] = React.useState({
            producto: '',
            cantidad: '',
            precio: '',
            proveedor: '',
            estado: 'pendiente'
        });

        React.useEffect(() => {
            setCompras(StorageService.getCompras());
        }, []);

        const handleSubmit = (e) => {
            e.preventDefault();
            const nuevaCompra = StorageService.saveCompra({
                ...formData,
                total: parseFloat(formData.cantidad) * parseFloat(formData.precio)
            });
            setCompras([...compras, nuevaCompra]);
            setFormData({
                producto: '',
                cantidad: '',
                precio: '',
                proveedor: '',
                estado: 'pendiente'
            });
            setShowForm(false);
        };

        const getEstadoBadge = (estado) => {
            const badges = {
                pendiente: 'warning',
                completado: 'success',
                cancelado: 'danger'
            };
            return badges[estado] || 'secondary';
        };

        return (
            <div data-name="compras" data-file="pages/Compras.js">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Compras</h2>
                    <button 
                        className="btn btn-primary"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Nueva Compra
                    </button>
                </div>

                {showForm && (
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5>Registrar Nueva Compra</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Producto</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.producto}
                                            onChange={(e) => setFormData({...formData, producto: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Proveedor</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.proveedor}
                                            onChange={(e) => setFormData({...formData, proveedor: e.target.value})}
                                            required
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
                        {compras.length === 0 ? (
                            <div className="text-center py-4">
                                <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                                <p className="text-muted">No hay compras registradas</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Proveedor</th>
                                            <th>Estado</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {compras.map(compra => (
                                            <tr key={compra.id}>
                                                <td>{compra.producto}</td>
                                                <td>{compra.proveedor}</td>
                                                <td>
                                                    <span className={`badge bg-${getEstadoBadge(compra.estado)}`}>
                                                        {compra.estado}
                                                    </span>
                                                </td>
                                                <td>{new Date(compra.createdAt).toLocaleDateString()}</td>
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
        console.error('Compras component error:', error);
        reportError(error);
    }
}
