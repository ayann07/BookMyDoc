import express from 'express'
import { deleteDoctor, getAllDoctors, getDoctorDetails, updateDoctor } from '../controllers/doctorController.js'
import { authenticate, restrict } from '../middleware/authMiddleware.js'
import reviewRoute from './reviewRoute.js'

const router=express.Router()

router.use('/:id/reviews/',reviewRoute)

router.put('/',authenticate,restrict(['doctor']),updateDoctor)
router.delete('/',authenticate,restrict(['doctor']),deleteDoctor)
router.get('/:id',getDoctorDetails)
router.get('/',getAllDoctors)


export default router