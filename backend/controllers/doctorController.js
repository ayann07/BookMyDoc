import DoctorModel from '../models/DoctorSchema.js'
import bcrypt from 'bcryptjs'


export const updateDoctor = async (req, res) => {
    const id = req.id
    try {
        if(req.body.password)
        {
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
        const { password, ...rest } = updatedDoctor._doc;
        return res.status(200).json({
            message: 'User details updated successfully.',
            updatedDoctor:rest
        })
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

export const deleteDoctor = async (req, res) => {
    const id = req.id
    try {
        const deletedDoctor = await DoctorModel.findByIdAndDelete(id)
        if (!deletedDoctor) {
            return res.status(400).json({
                message: 'no user found with given id'
            })
        }
        return res.status(200).json({
            message: 'User deleted successfully.'
        })
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

export const getDoctorDetails = async (req, res) => {
    const id = req.params.id
    try {
        const doctor = await DoctorModel.findById(id).populate("reviews").select('-password')
        if (!doctor) {
            return res.status(400).json({
                message: 'no user found with given id'
            })
        }
        return res.status(200).json({
            message: 'User details fetched successfully.',
            doctor
        })
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

export const getAllDoctors = async (req, res) => {
    const { specialization, name } = req.query; 

    try {
        let filter = {};
        if (specialization) {
            filter.specialization = specialization;
        }
        if (name) {
            filter.name = new RegExp(name, 'i'); // 'i' for case-insensitive matching
        }
        const doctors = await DoctorModel.find(filter).populate("reviews").select('-password');

        if (!doctors || doctors.length===0) {
            return res.status(400).json({ message: 'No doctors found' });
        }

        return res.status(200).json({ doctors });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};