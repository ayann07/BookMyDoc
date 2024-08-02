import express from 'express';
import Stripe from 'stripe';
import BookingSchema from '../models/BookingSchema.js';
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
                const booking = await BookingSchema.findOne({
                    session: session.id
                });

                if (booking) {
                    booking.status = 'done';
                    booking.isPaid = true;
                    await booking.save();
                }
            } catch (err) {
                console.error('Error updating booking:', err);
            }
            break;

        case 'payment_intent.payment_failed':
            try {
                const booking = await BookingSchema.findOne({
                    session: session.id
                });

                if (booking) {
                    booking.status = 'cancelled';
                    booking.isPaid = false;
                    await booking.save();
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