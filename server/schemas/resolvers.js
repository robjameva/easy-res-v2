const { AuthenticationError } = require('apollo-server-express');
const { User, Restaurant, Reservation } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getUser: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
                .select('-__v')
        },
        getRestaurant: async (parent, { restaurantId }) => {
            return Restaurant.findOne({ _id: restaurantId })
                .select('-__v')
                .populate('reservations.user')
        },
        getAllRestaurants: async () => {
            return Restaurant.find({})
                .select('-__v')
                .populate('reservations.user')
        },
        getReservation: async (parent, { reservationID }) => {
            return Reservation.findOne({ _id: reservationID })
                .select('-__v')
        },

    },
    Mutation: {
        createUser: async (parent, { input }) => {
            console.log(input)
            const user = await User.create(input);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        createRestaurant: async (parent, { input }) => {
            const restaurant = await Restaurant.create(input);

            return restaurant;
        },
        createReservation: async (parent, { input }) => {
            console.log(input)
            const reservation = await Reservation.create(input);

            return reservation;
        },
        updateReservation: async (parent, { input }) => {
            const updatedReservation = await Reservation.findOneAndUpdate(
                { _id: input.reservationID },
                input,
                { new: true, runValidators: true }
            );

            console.log(input)
            return updatedReservation
        },
    }
};

module.exports = resolvers;