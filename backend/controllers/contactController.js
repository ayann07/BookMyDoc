import ContactSchema from "../models/ContactSchema.js";
import nodemailer from 'nodemailer'
import { IssueReceived } from "../utils/emailTemplates.js";
export const addIssue = async (req, res) => {
     try {
        const {
            name,
            email,
            subject,
            message
        } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: 'enter all the fields'
            })
        }
        const issue = await new ContactSchema({
            name,
            email,
            subject,
            message
        })
        if (!issue) {
            return res.status(500).json({
                message: 'internal server error'
            })
        }
        await issue.save()

        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            }
        })

        await transporter.sendMail({
            from: 'Doctor Appointment Website',
            to: 'raza.ayan2002@gmail.com',
            subject: 'Issue received from a user',
            html: IssueReceived(name,email,subject,message,issue.ref_no)
        })
        
        return res.status(200).json({
            message: 'Issue submitted successfully',
            ref_no: issue.ref_no
        })
    } catch (err) {
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}