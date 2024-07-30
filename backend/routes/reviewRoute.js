import express from 'express'
import { createReview, getAllReviews } from '../controllers/reviewController.js'
import { authenticate, restrict } from '../middleware/authMiddleware.js'

const router=express.Router({mergeParams:true})

router.post('/',authenticate,restrict(['patient']),createReview)
router.get('/',getAllReviews)

export default router;