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
            const restaurant = await Restaurant.findOne({ _id: restaurantId })
                .select('-__v')
            // .populate('reservations.user')

            const openHour = parseInt(restaurant.business_hours_open)
            const closeHour = parseInt(restaurant.business_hours_close)
            let operatingHours = []

            for (let i = openHour; i < closeHour + 1; i++) {
                operatingHours.push(i)
            }

            return { restaurant, hours: operatingHours }
        },
        getAllRestaurants: async () => {
            return Restaurant.find({})
                .select('-__v')
                .populate('reservations.user')
        },
        getReservationsByUser: async (parent, { userID }) => {
            return Reservation.find({ user: { _id: userID } })
                .select('-__v')
        },

    },
    Mutation: {
        createUser: async (parent, { input }) => {
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
            const reservation = await Reservation.create(input);

            return reservation;
        },
        updateReservation: async (parent, { input }) => {
            const updatedReservation = await Reservation.findOneAndUpdate(
                { _id: input.reservationID },
                input,
                { new: true, runValidators: true }
            );

            return updatedReservation
        },
        updateRestaurant: async (parent, { input }) => {
            const updatedRestaurant = await Restaurant.findOneAndUpdate(
                { _id: input._id },
                input,
                { new: true, runValidators: true }
            );

            return updatedRestaurant
        },
        updateUser: async (parent, { input }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: input._id },
                input,
                { new: true, runValidators: true }
            );

            return updatedUser;
        },
        deleteUser: async (parent, { _id }) => {
            const user = await User.findOneAndDelete({ _id })

            return user;
        },
        deleteReservation: async (parent, { _id }) => {
            const reservation = await Reservation.findOneAndDelete({ _id })

            return reservation;
        },
        deleteRestaurant: async (parent, { _id }) => {
            const restaurant = await Restaurant.findOneAndDelete({ _id })

            return restaurant;
        },
    }
};

module.exports = resolvers;