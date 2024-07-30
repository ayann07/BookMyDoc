import ReviewSchema from "../models/ReviewSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import mongoose from "mongoose";

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewSchema.find().populate({
            path:"user",
            select:"name photo"
        })
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({
                message: 'no review found'
            })
        }
        return res.status(200).json({
            reviews
        })
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

export const createReview = async (req, res) => 
    {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const doctorID = req.params.doctorId;
        const userId = req.userId;

        const newReview = new ReviewSchema({
            doctor: doctorID,
            user: userId,
            reviewText: req.body.reviewText,
            rating: req.body.rating
        });

        const doctor = await DoctorSchema.findById(doctorID);
        if (!doctor) {
            throw new Error('Doctor not found');
        }

        doctor.reviews.push(newReview._id);

        doctor.totalRating = (doctor.totalRating || 0) + 1;
        doctor.averageRating = ((doctor.averageRating * (doctor.totalRating - 1)) + newReview.rating) / doctor.totalRating;


        await doctor.save({ session });
        await newReview.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({ message: 'Review created successfully', newReview });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: err.message });
    }
};