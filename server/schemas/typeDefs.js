

const typeDefs = `#graphql
        type PaymentIntent {
            clientSecret: String!
            # You can add more fields as needed
        }

        type SpaceDebris {
            id: ID!
            name: String!
            description: String
            currentLocation: [Location]!
            trajectory: String
            owner: [User]!
    }
        type Location {
            latitude: Float!
            longitude: Float!
            altitude: Float!
    }

        type Satellite {
            id: ID!
            OWNER: ID!
            PRICE: Float!
            COMMENT: String
            ORIGINATOR: String
            NORAD_CAT_ID: String
            OBJECT_NAME: String
            OBJECT_TYPE: String
            CLASSIFICATION_TYPE: String
            INTLDES: String
            EPOCH: String
            EPOCH_MICROSECONDS: String
            MEAN_MOTION: String
            ECCENTRICITY: String
            INCLINATION: String
            RA_OF_ASC_NODE: String
            ARG_OF_PERICENTER: String
            MEAN_ANOMALY: String
            EPHEMERIS_TYPE: String
            ELEMENT_SET_NO: String
            REV_AT_EPOCH: String
            BSTAR: String
            MEAN_MOTION_DOT: String
            MEAN_MOTION_DDOT: String
            FILE: String
            TLE_LINE0: String
            TLE_LINE1: String
            TLE_LINE2: String
            OBJECT_ID: String
            OBJECT_NUMBER: String
            SEMIMAJOR_AXIS: String
            PERIOD: String
            APOGEE: String
            PERIGEE: String
            DECAYED: String
    }


        type User {
            id: ID!
            username: String!
            email: String!
            fullName: String
            password: String
            dateOfBirth: String
        }

        input LocationInput {
            latitude: Float!
            longitude: Float!
            altitude: Float!
    }
        input SpaceDebrisInput {
            name: String!
            description: String
            currentLocation: LocationInput!
            trajectory: String
            ownerId: ID!
    }

    input SatelliteInput {
        OWNER: ID!
        PRICE: Float!
        COMMENT: String
        ORIGINATOR: String
        NORAD_CAT_ID: String
        OBJECT_NAME: String
        OBJECT_TYPE: String
        CLASSIFICATION_TYPE: String
        INTLDES: String
        EPOCH: String
        EPOCH_MICROSECONDS: String
        MEAN_MOTION: String
        ECCENTRICITY: String
        INCLINATION: String
        RA_OF_ASC_NODE: String
        ARG_OF_PERICENTER: String
        MEAN_ANOMALY: String
        EPHEMERIS_TYPE: String
        ELEMENT_SET_NO: String
        REV_AT_EPOCH: String
        BSTAR: String
        MEAN_MOTION_DOT: String
        MEAN_MOTION_DDOT: String
        FILE: String
        TLE_LINE0: String
        TLE_LINE1: String
        TLE_LINE2: String
        OBJECT_ID: String
        OBJECT_NUMBER: String
        SEMIMAJOR_AXIS: String
        PERIOD: String
        APOGEE: String
        PERIGEE: String
        DECAYED: String
    }

        input UserInput {
            username: String!
            email: String!
            password: String!
            fullName: String
            dateOfBirth: String
    }

        type Query {
            getPaymentIntent(amount: Int!, currency: String!): PaymentIntent!
            spaceDebris(id: ID!): SpaceDebris
            allSpaceDebris: [SpaceDebris]!
            satellite(id: ID!): Satellite
            allSatellites: [Satellite]!
            user(id: ID!): User
            currentUser: User
    }

        type Mutation {
            # processPayment(paymentIntentId: String!, paymentMethod: String!): Boolean!
            createSpaceDebris(input: SpaceDebrisInput!): SpaceDebris
            updateSpaceDebris(id: ID!, input: SpaceDebrisInput!): SpaceDebris
            deleteSpaceDebris(id: ID!): ID
            createSatellite(input: SatelliteInput!): Satellite
            updateSatellite(id: ID!, ownerID: ID): Satellite
            deleteSatellite(id: ID!): ID
            registerUser(username: String!, email: String!, fullName: String, password: String, dateOfBirth: String): User
            loginUser(email: String!, password: String!): User
            logoutUser: Boolean

    }
`;

module.exports = typeDefs;
