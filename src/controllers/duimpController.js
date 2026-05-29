import duimpService from '../services/duimpService.js';

const importarDuimp = async (req, res) => {
    try {
        const { numeroDuimp } = req.body;
        const credenciais = req.credenciaisSiscomex; // Pego do middleware

        if (!numeroDuimp) {
            return res.status(400).json({ error: 'O número da Duimp é obrigatório no body.' });
        }

        const resultado = await duimpService.processarImportacao(numeroDuimp, credenciais);

        return res.status(200).json({
            success: true,
            message: 'Dados da Duimp importados e salvos com sucesso!',
            data: resultado
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default { registrarDuimp: importarDuimp };