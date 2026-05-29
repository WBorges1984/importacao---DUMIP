import express from 'express';
import router from './routes/duimpRoutes.js';

const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.use('/api/duimp', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});