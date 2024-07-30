import express from 'express'
import { deleteDoctor, getAllDoctors, getDoctorDetails, updateDoctor } from '../controllers/doctorController.js'
import { authenticate, restrict } from '../middleware/authMiddleware.js'
import reviewRoute from './reviewRoute.js'

const router=express.Router()

router.use('/:doctorId/reviews/',reviewRoute)

router.put('/:id',authenticate,restrict(['doctor']),updateDoctor)
router.delete('/:id',authenticate,restrict(['doctor']),deleteDoctor)
router.get('/:id',authenticate,getDoctorDetails)
router.get('/',getAllDoctors)


export default router