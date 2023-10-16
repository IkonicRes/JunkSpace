const { Schema, model } = require('mongoose');

const PaymentIntentSchema = new Schema({
    clientSecret: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0.99
    },

    currency: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    paymentMethod: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PaymentMethod',
        },
    ],
    created: {
        type: Date,
        required: true
    },
});

const PaymentIntent = model('PaymentIntent', PaymentIntentSchema);

module.exports = PaymentIntent;