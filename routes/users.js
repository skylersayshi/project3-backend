import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

import {updateprofile, signin, signup, getprofiles} from '../controllers/users.js'

router.get('/profile', getprofiles)
router.patch('/profile/:id', updateprofile)
router.post('/signin', signin);
router.post('/signup', signup);

export default router;