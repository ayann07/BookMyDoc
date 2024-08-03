import DoctorModel from '../models/DoctorSchema.js'
import bcrypt from 'bcryptjs'


export const updateDoctor = async (req, res) => {
    const id = req.userId
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        const updatedDoctor = await DoctorModel.findByIdAndUpdate(id, req.body, {
            new: true
        })
        if (!updatedDoctor) {
            return res.status(400).json({
                message: 'no user found with given id'
            })
        }
        const {
            password,
            ...rest
        } = updatedDoctor._doc;
        return res.status(200).json({
            message: 'User details updated successfully.',
            updatedDoctor: rest
        })
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

export const deleteDoctor = async (req, res) => {
    const id = req.userId
    try {
        const deletedDoctor = await DoctorModel.findByIdAndDelete(id)
        if (!deletedDoctor) {
            return res.status(400).json({
                message: 'no user found with given id'
            })
        }
        return res.status(200).json({
            message: 'Account deleted successfully.'
        })
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

export const getDoctorDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const doctor = await DoctorModel.findById(id)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select:'name photo' 
                }
            })
            .populate({
                path:'bookings',
                populate:{
                    path:'user',
                    select:'name email photo '
                }
            })
            .select('-password'); 
        
        if (!doctor) {
            return res.status(400).json({
                message: 'No user found with the given id'
            });
        }

        return res.status(200).json({
            message: 'User details fetched successfully.',
            doctor
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const getAllDoctors = async (req, res) => {
    try {
        const query = req.query.q;

        let doctors;
        if (query) {
            doctors = await DoctorModel.find({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } }
                ]
            }).populate("reviews").select('-password');
        } else {
            doctors = await DoctorModel.find().populate("reviews").select('-password');
        }

        if (!doctors || doctors.length === 0) {
            return res.status(404).json({
                message: 'No doctors found'
            });
        }

        return res.status(200).json({
            doctors
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error: ' + err.message
        });
    }
};
