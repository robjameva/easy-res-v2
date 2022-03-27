const { Schema, model } = require('mongoose');

const reservationSchema = new Schema(
    {
        party_size: {
            type: Number,
            required: true
        },
        time_slot: {
            type: Number,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        restaurant: {
            type: Schema.Types.ObjectId,
            ref: 'Restaurant'
        },
    }
)

const restaurantSchema = new Schema(
    {
        occupancy: {
            type: Number,
            required: true
        },
        business_name: {
            type: String,
            required: true,
            unique: true
        },
        business_address: {
            type: String,
            required: true,
            unique: true,
        },
        business_phone: {
            type: String,
            required: true,
            unique: true,
        },
        business_hours_open: {
            type: String,
            required: true,
        },
        business_hours_close: {
            type: String,
            required: true,
        },
        business_website: {
            type: String,
            required: true,
        },
        business_image: {
            type: String,
            required: true,
        },
        reservations: [reservationSchema]
    }
);


const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
