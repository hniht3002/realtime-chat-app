import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.middleware.js';
import { getUserForSidebar } from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/', protectedRoute, getUserForSidebar);

export default router;