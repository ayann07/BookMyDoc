import UserSchema from "../models/UserSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import BookingSchema from "../models/BookingSchema.js";
import Stripe from 'stripe';
import mongoose from "mongoose";

export const getCheckoutSession = async (req, res) => {
    try {
        const doctor = await DoctorSchema.findById(req.params.doctorId);
        const user = await UserSchema.findById(req.userId);
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor._id}`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            line_items: [{
                price_data: {
                    currency: 'inr',
                    unit_amount: doctor.fees * 100,
                    product_data: {
                        name: doctor.name,
                        description: doctor.bio,
                        images: [doctor.photo]
                    }
                },
                quantity: 1
            }]
        });
        const btsession=await mongoose.startSession()
        btsession.startTransaction()

        const booking = new BookingSchema({
            doctor: doctor._id,
            user: user._id,
            fees: doctor.fees,
            session: session.id,
            status: 'pending',
            isPaid: false
        });
        const dc=await DoctorSchema.findById(doctor._id)
        dc.bookings.push(booking._id)

        await dc.save({btsession})
        await booking.save({btsession});

        btsession.commitTransaction()
        btsession.endSession()
        return res.status(200).json({
            message: 'Successfully paid',
            session
        });
    } catch (err) {
        console.error('Error creating checkout session:', err); 
        return res.status(500).json({
            message: err.message,
        });
    }
};
