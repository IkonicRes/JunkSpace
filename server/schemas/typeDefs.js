

const typeDefs = `#graphql
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
        name: String!
        purpose: String
        launchDate: String!
        owner: [User]!
        currentLocation: [Location]!
}

    type User {
        id: ID!
        username: String!
        email: String!
        fullName: String
        password: String
        dateOfBirth: String
        createdSpaceDebris: [SpaceDebris]!
        createdSatellites: [Satellite]!
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
        name: String!
        purpose: String
        launchDate: String!
        ownerId: ID!
        currentLocation: LocationInput!
}
    input UserInput {
        username: String!
        email: String!
        password: String!
        fullName: String
        dateOfBirth: String
}

    type Query {
        spaceDebris(id: ID!): SpaceDebris
        allSpaceDebris: [SpaceDebris]!
        satellite(id: ID!): Satellite
        allSatellites: [Satellite]!
        user(id: ID!): User
        currentUser: User
}

    type Mutation {
        createSpaceDebris(input: SpaceDebrisInput!): SpaceDebris
        updateSpaceDebris(id: ID!, input: SpaceDebrisInput!): SpaceDebris
        deleteSpaceDebris(id: ID!): ID
        createSatellite(input: SatelliteInput!): Satellite
        updateSatellite(id: ID!, input: SatelliteInput!): Satellite
        deleteSatellite(id: ID!): ID
        registerUser(input: UserInput!): User
        loginUser(email: String!, password: String!): User
        logoutUser: Boolean

}
`;

module.exports = typeDefs;
