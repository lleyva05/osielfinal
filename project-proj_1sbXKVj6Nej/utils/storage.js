const StorageService = {
    // Contactos
    getContactos: () => {
        const contactos = localStorage.getItem('crm_contactos');
        return contactos ? JSON.parse(contactos) : [];
    },

    saveContacto: (contacto) => {
        const contactos = StorageService.getContactos();
        contacto.id = Date.now().toString();
        contacto.createdAt = new Date().toISOString();
        contactos.push(contacto);
        localStorage.setItem('crm_contactos', JSON.stringify(contactos));
        return contacto;
    },

    // Compras
    getCompras: () => {
        const compras = localStorage.getItem('crm_compras');
        return compras ? JSON.parse(compras) : [];
    },

    saveCompra: (compra) => {
        const compras = StorageService.getCompras();
        compra.id = Date.now().toString();
        compra.createdAt = new Date().toISOString();
        compras.push(compra);
        localStorage.setItem('crm_compras', JSON.stringify(compras));
        return compra;
    },

    // Negocios
    getNegocios: () => {
        const negocios = localStorage.getItem('crm_negocios');
        return negocios ? JSON.parse(negocios) : [];
    },

    saveNegocio: (negocio) => {
        const negocios = StorageService.getNegocios();
        negocio.id = Date.now().toString();
        negocio.createdAt = new Date().toISOString();
        negocios.push(negocio);
        localStorage.setItem('crm_negocios', JSON.stringify(negocios));
        return negocio;
    },

    // Tickets
    getTickets: () => {
        const tickets = localStorage.getItem('crm_tickets');
        return tickets ? JSON.parse(tickets) : [];
    },

    saveTicket: (ticket) => {
        const tickets = StorageService.getTickets();
        ticket.id = Date.now().toString();
        ticket.createdAt = new Date().toISOString();
        tickets.push(ticket);
        localStorage.setItem('crm_tickets', JSON.stringify(tickets));
        return ticket;
    }
};
