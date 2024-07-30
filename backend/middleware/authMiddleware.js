import jwt from 'jsonwebtoken'
import UserSchema from '../models/UserSchema.js';
import DoctorSchema from '../models/DoctorSchema.js';


export const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(404).json({
                message: "Unauthorized request"
            });
        }
        const jwtToken = token.replace("Bearer", "").trim();
        const decodedData = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        req.role = decodedData.role;
        req.userId = decodedData.id;
    } catch (err) {
        return res.status(401).json(err.message);
    }
    next();

}

export const restrict = (roles) => async (req, res, next) => {
    try {
        let user;
        const patient = await UserSchema.findById(req.userId)
        const doctor = await DoctorSchema.findById(req.userId)

        if (patient)
            user = patient
        else if (doctor)
            user = doctor

        if (!roles.includes(user.role)) {
            return res.status(401).json({
                message: 'You are not authorized'
            })
        }
        next();
    } catch (err) {
        return res.status(401).json(err.message);
    }
}