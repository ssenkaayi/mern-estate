import express from 'express';
import { test } from '../contoller/user.js';

const router = express.Router();

router.get('/',test);

export default router;