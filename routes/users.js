import express from 'express';
const router = express.Router();

import {getProfile, signin, signup} from '../controllers/users.js'

router.get('/profile', getProfile )
router.post('/signin', signin);
router.post('/signup', signup);

export default router;