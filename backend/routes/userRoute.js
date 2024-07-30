import express from 'express'
import { deleteUser, getAllUsers, getUserDetails, updateUser } from '../controllers/userController.js'
import { authenticate, restrict } from '../middleware/authMiddleware.js'

const router=express.Router()

router.put('/:id',authenticate,restrict(['patient']),updateUser)
router.delete('/:id',authenticate,restrict(['patient']),deleteUser)
router.get('/:id',authenticate,restrict(['patient']),getUserDetails)
router.get('/',restrict(['doctor']),getAllUsers)


export default router