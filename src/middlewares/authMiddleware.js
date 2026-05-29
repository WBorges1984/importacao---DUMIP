const verificarCredenciaisReact = (req, res, next) => {
    // O Express converte tudo para minúsculas automaticamente
    const clientId = req.headers['client-id'];
    const clientSecret = req.headers['client-secret'];
    const roleType = req.headers['role-type'];

    if (!clientId || !clientSecret || !roleType) {
        console.log(clientId, clientSecret, roleType);
        return res.status(400).json({
            success: false,
            error: 'Credenciais incompletas. Client-Id, Client-Secret e Role-Type são obrigatórios nos Headers.'
        });
    }

    req.credenciaisSiscomex = { clientId, clientSecret, roleType };
    next();
};

export default { verificarCredenciaisReact };