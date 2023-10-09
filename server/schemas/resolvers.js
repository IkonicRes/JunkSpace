// Import Mongoose model for SpaceDebris
const SpaceDebris = require('./models/SpaceDebris');
const Satellite = require('./models/Satellite');
const User = require('./models/User');
// Import bcrypt for password hashing
const bcrypt = require('bcrypt');
// Import jsonwebtoken for generating tokens
const jwt = require('jsonwebtoken');
const { signToken, AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        spaceDebris: async (_, { id }) => {
            try {
                return await SpaceDebris.findById(id);
            } catch (error) {
                throw new Error(`Error fetching space debris: ${error.message}`);
            }
        },
        allSpaceDebris: async () => {
            try {
                return await SpaceDebris.find();
            } catch (error) {
                throw new Error(`Error fetching space debris: ${error.message}`);
            }
        },
        satellite: async (_, { id }) => {
            try {
                return await Satellite.findById(id);
            } catch (error) {
                throw new Error(`Error fetching satellite: ${error.message}`);
            }
        },
        allSatellites: async () => {
            try {
                return await Satellite.find();
            } catch (error) {
                throw new Error(`Error fetching satellite: ${error.message}`);
            }
        },
        user: async (_, { id }) => {
            try {
                return await User.findById(id);
            } catch (error) {
                throw new Error(`Error fetching user: ${error.message}`);
            }
        },
        currentUser: async (_, __, { currentUser }) => {
            // Implement authentication logic here to check if a user is logged in
            if (!currentUser) {
                throw new Error('User not authenticated');
            }
            try {
                return await User.findById(currentUser.id);
            } catch (error) {
                throw new Error(`Error fetching current user: ${error.message}`);
            }
        },
    },

    Mutation: {
        createSpaceDebris: async (_, { input }) => {
            try {
                const newSpaceDebris = new SpaceDebris(input);
                await newSpaceDebris.save();
                return newSpaceDebris;
            } catch (error) {
                throw new Error(`Error creating space debris: ${error.message}`);
            }
        },
        updateSpaceDebris: async (_, { id, input }) => {
            try {
                return await SpaceDebris.findByIdAndUpdate(id, input, { new: true });
            } catch (error) {
                throw new Error(`Error updating space debris: ${error.message}`);
            }
        },
        deleteSpaceDebris: async (_, { id }) => {
            try {
                await SpaceDebris.findByIdAndDelete(id);
                return id;
            } catch (error) {
                throw new Error(`Error deleting space debris: ${error.message}`);
            }
        },
        createSatellite: async (_, { input }) => {
            try {
                const newSatellite = new Satellite(input);
                await newSatellite.save();
                return newSatellite;
            } catch (error) {
                throw new Error(`Error creating satellite: ${error.message}`);
            }
        },
        updateSatellite: async (_, { id, input }) => {
            try {
                return await Satellite.findByIdAndUpdate(id, input, { new: true });
            } catch (error) {
                throw new Error(`Error updating satellite: ${error.message}`);
            }
        },
        deleteSatellite: async (_, { id }) => {
            try {
                await Satellite.findByIdAndDelete(id);
                return id;
            } catch (error) {
                throw new Error(`Error deleting satellite: ${error.message}`);
            }
        },
        registerUser: async (_, { input }) => {
            try {
                const newUser = new User(input);
                await newUser.save();
                return newUser;
            } catch (error) {
                throw new Error(`Error registering user: ${error.message}`);
            }
        },
        loginUser: async (_, { email, password }) => {
            try {
                // Implement authentication logic here (e.g., check email and password)
                const user = await User.findOne({ email });

                // Check if the user exists
                if (!user) {
                    throw new AuthenticationError('User not found');
                }

                // Compare the provided password with the hashed password in the database
                const passwordMatch = await bcrypt.compare(password, User.password);

                // If the passwords don't match, throw an AuthenticationError
                if (!passwordMatch) {
                    throw new AuthenticationError('Incorrect password');
                }
                // Generate a JWT token for the authenticated user
                const token = signToken(
                    { userId: User.id, email: User.email },
                    'your-secret-key', // Replace with a secure secret key
                    { expiresIn: '1h' } // Token expiration time
                );
                // Return the authenticated user or throw an error if authentication fails
                return {
                    token,
                    User,
                }
            } catch (error) {
                throw new Error(`Error logging in: ${error.message}`);
            }
        },
        logoutUser: async (_, __, context) => {
            try {
                // Implement logout logic here (e.g., clear authentication token)
                // Check if there's a user authenticated in the context
                if (!context.currentUser) {
                    throw new AuthenticationError('User not authenticated');
                }
                const token = signToken(
                    { userId: context.currentUser.id, email: context.currentUser.email },
                    { expiresIn: '1m' } // Token expiration time (e.g., 1 minute)
                );

                // Return true if successful, or throw an error if logout fails
                return true;
            } catch (error) {
                throw new Error(`Error logging out: ${error.message}`);
            }
        },
    },
};
module.exports = resolvers;

