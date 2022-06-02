import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

import { createProfile, getProfile, updateProfile } from '../controllers/profile'

router.get('/', auth, getProfile)
router.post('/', auth, createProfile)
router.put('/',  updateProfile)



export default router;