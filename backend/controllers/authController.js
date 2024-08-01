import patientModel from '../models/UserSchema.js'
import doctorModel from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    })
}

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            gender,
            photo
        } = req.body
        let user;

        if (role === 'patient')
            user = await patientModel.findOne({
                email
            })
        else if (role === 'doctor')
            user = await doctorModel.findOne({
                email
            })

        if (user) {
            return res.status(400).json({
                message: `Account already exists`
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        if (role === 'patient')
            user = await patientModel.create({
                name,
                email,
                password: hashPass,
                photo,
                gender,
                role
            })

        else if (role === 'doctor')
            user = await doctorModel.create({
                name,
                email,
                password: hashPass,
                photo,
                gender,
                role
            })

        if (!user) {
            return res.status(500).json({
                message: 'internal server error'
            })
        }

        return res.status(201).json({
            message: 'Account created successfully'
        })

    } catch (err) {
        return res.status(500).json(err.message)
    }
}

export const login = async (req, res) => {
    const {
        email
    } = req.body
    try {
        let user;
        const patient = await patientModel.findOne({
            email
        })
        const doctor = await doctorModel.findOne({
            email
        })

        if (patient)
            user = patient
        else if (doctor)
            user = doctor

        if (!user) {
            return res.status(404).json({
                message: 'invalid credentials'
            })
        }
        const isPasswordMatch =await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordMatch) {
            return res.status(404).json({
                message: 'invalid credentials'
            })
        }
        const token = generateToken(user);
        return res.status(200).json({
            message: 'successfully login',
            token,
            data: {
                name:user.name,
                email:user.email,
                photo:user.photo, 
            },
            role:user.role
        })

    } catch (err) {
        return res.status(500).json(err.message)
    }
}