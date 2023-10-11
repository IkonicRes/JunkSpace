const { Schema, model } = require('mongoose');

const satelliteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: false
    },
    launchDate: {
        type: Date,
        required: true
    },
    owner: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    currentLocation: [
        {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            },
            altitude: {
                type: Number,
                required: true
            },
        },
    ],

});

const Satellite = model('Satellite', satelliteSchema);

module.exports = Satellite;