import { Router } from 'express';
import duimpController from '../controllers/duimpController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// A rota agora está protegida pelo middleware de autenticação
router.post('/importar', authMiddleware.verificarCredenciaisReact, duimpController.registrarDuimp);

export default router;