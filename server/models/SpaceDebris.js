const { Schema, model } = require('mongoose');

const spaceDebrisSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
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
    trajectory: {
        type: String,
        required: false
    },
    owner: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const SpaceDebris = model('SpaceDebris', spaceDebrisSchema);

module.exports = SpaceDebris;