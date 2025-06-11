import react from 'react';

const ClienteCard =({cliente}) => {
    return(
        <div className="cliente-card">
            <h4>{cliente.name}</h4>
            <p>{cliente.email}</p>
            <p>{cliente.telefono}</p>
        </div>
    );
};

export default ClienteCard;