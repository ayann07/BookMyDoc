import express from 'express'
import { addIssue } from '../controllers/contactController.js';

const router=express.Router()

router.post('/',addIssue)

export default router;