
// routes/administrativeRoutes.js

import express from 'express';
import {
  getAdministrative,
  createAdministrative,
  updateAdministrative,

} from '../controllars/AdminControllar.js';

const router = express.Router();

router.get('/', getAdministrative);
router.post('/', createAdministrative);
router.patch('/', updateAdministrative);


export default router;
