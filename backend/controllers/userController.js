import PatientModel from '../models/UserSchema.js'
import bcrypt from 'bcryptjs'

export const updateUser = async (req, res) => {
    const id = req.userId
    try {
        if(req.body.password)
        {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        const updatedUser = await PatientModel.findByIdAndUpdate(id, req.body, {
            new: true
        })
        if (!updatedUser) {
            return res.status(400).json({
                message: 'no user found with given id'
            })
        }
        const { password, ...rest } = updatedUser._doc;
        return res.status(200).json({
            message: 'User details updated successfully.',
            updatedUser:rest
        })
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

export const deleteUser = async (req, res) => {
    const id = req.userId
    try {
        const deletedUser = await PatientModel.findByIdAndDelete(id)
        if (!deletedUser) {
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

export const getUserDetails = async (req, res) => {
    const id = req.userId
    try {
        const user = await PatientModel.findById(id).select('-password')
        if (!user) {
            return res.status(400).json({
                message: 'no user found with given id'
            })
        }
        return res.status(200).json({
            message: 'User details fetched successfully.',
            user
        })
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const user = await PatientModel.find().select('-password')
        if (!user) {
            return res.status(400).json({
                message: 'no user found'
            })
        }
        return res.status(200).json({
            user
        })
    } catch (err) {
        return res.status(500).json(err.message)
    }
}