import express from 'express';
import auth from '../middleware/auth.js';

import { createProfile, getProfile, updateProfile } from '../controllers/profile.js'

const router = express.Router();

router.get('/', getProfile)
router.post('/', createProfile)
router.patch('/',  updateProfile)



export default router;