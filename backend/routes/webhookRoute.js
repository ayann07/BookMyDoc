import express from 'express';
import Stripe from 'stripe';
import BookingSchema from '../models/BookingSchema.js';
import nodemailer from 'nodemailer';
import { DoctorFailedMail, DoctorSuccessMail, UserFailedMail, UserSuccessMail } from '../utils/emailTemplates.js';
import UserSchema from '../models/UserSchema.js';
import DoctorSchema from '../models/DoctorSchema.js';


const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/webhook', express.raw({
    type: 'application/json'
}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            try {
                const booking = await BookingSchema.findOne({ session: session.id });

                if (booking) {
                    booking.status = 'done';
                    booking.isPaid = true;
                    await booking.save();

                    let transporter = nodemailer.createTransport({
                        service: "gmail",
                        host: "smtp.gmail.com",
                        port: 465,
                        auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASSWORD,
                        }
                    });

                    const user = await UserSchema.findById(booking.user);
                    const doctor = await DoctorSchema.findById(booking.doctor);

                    await transporter.sendMail({
                        from: 'Doctor Appointment Website',
                        to: user.email,
                        subject: 'Doctor Appointment Confirmed',
                        html: UserSuccessMail(user.name, doctor.name, doctor.email, booking.ref_id,booking.selected_date)
                    });

                    await transporter.sendMail({
                        from: 'Doctor Appointment Website',
                        to: doctor.email,
                        subject: 'New Appointment Confirmed',
                        html: DoctorSuccessMail(doctor.name, user.name, user.email, booking.ref_id,booking.selected_date)
                    });
                }
            } catch (err) {
                console.error('Error updating booking:', err);
            }
            break;

        case 'payment_intent.payment_failed':
            const failedSession = event.data.object;

            try {
                const booking = await BookingSchema.findOne({ session: failedSession.id });

                if (booking) {
                    booking.status = 'cancelled';
                    booking.isPaid = false;
                    await booking.save();

                    let transporter = nodemailer.createTransport({
                        service: "gmail",
                        host: "smtp.gmail.com",
                        port: 465,
                        auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASSWORD,
                        }
                    });

                    const user = await UserSchema.findById(booking.user);
                    const doctor = await DoctorSchema.findById(booking.doctor);

                    await transporter.sendMail({
                        from: 'Doctor Appointment Website',
                        to: user.email,
                        subject: 'Doctor Appointment Failed',
                        html: UserFailedMail(user.name, doctor.name, doctor.email, booking.ref_id,booking.selected_date)
                    });

                    await transporter.sendMail({
                        from: 'Doctor Appointment Website',
                        to: doctor.email,
                        subject: 'Appointment Failed',
                        html: DoctorFailedMail(doctor.name, user.name, user.email, booking.ref_id,booking.selected_date)
                    });
                }
            } catch (err) {
                console.error('Error updating booking:', err);
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('Received');
});

export default router;
