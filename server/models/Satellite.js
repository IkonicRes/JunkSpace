const { Schema, model } = require('mongoose');

const satelliteSchema = new Schema({
    COMMENT: String,
    ORIGINATOR: String,
    NORAD_CAT_ID: String,
    OBJECT_NAME: String,
    OBJECT_TYPE: String,
    CLASSIFICATION_TYPE: String,
    INTLDES: String,
    EPOCH: String,
    EPOCH_MICROSECONDS: String,
    MEAN_MOTION: String,
    ECCENTRICITY: String,
    INCLINATION: String,
    RA_OF_ASC_NODE: String,
    ARG_OF_PERICENTER: String,
    MEAN_ANOMALY: String,
    EPHEMERIS_TYPE: String,
    ELEMENT_SET_NO: String,
    REV_AT_EPOCH: String,
    BSTAR: String,
    MEAN_MOTION_DOT: String,
    MEAN_MOTION_DDOT: String,
    FILE: String,
    TLE_LINE0: String,
    TLE_LINE1: String,
    TLE_LINE2: String,
    OBJECT_ID: String,
    OBJECT_NUMBER: String,
    SEMIMAJOR_AXIS: String,
    PERIOD: String,
    APOGEE: String,
    PERIGEE: String,
    DECAYED: String,
    name: String,
    purpose: String,
    launchDate: Date,
    owner: 
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    currentLocation: 
      {
        latitude: Number,
        longitude: Number,
        altitude: Number,
      },  
  });

const Satellite = model('Satellite', satelliteSchema);

module.exports = Satellite;