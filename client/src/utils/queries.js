import { gql } from '@apollo/client';

export const QUERY_ME = gql`
	{
		me {
			username
			phone_number
			last_name
			first_name
			email
			_id
		}
	}
`;

export const QUERY_RESERVATION_BY_USER = gql`
	query GetReservationsByUser($userId: ID!) {
		getReservationsByUser(userID: $userId) {
			_id
			party_size
			time_slot
			user {
				_id
			}
			restaurant {
				_id
				business_name
				business_address
				business_phone
				business_website
				business_image
			}
		}
	}
`;

export const GET_ALL_RESTAURANTS = gql`
	query Query {
		getAllRestaurants {
			_id
			occupancy
			business_name
			business_address
			business_phone
			business_hours_open
			business_hours_close
			business_website
			business_image
		}
	}
`;

export const GET_RESTAURANT_BY_ID = gql`
	query Query($restaurantId: ID!) {
		getRestaurant(restaurantId: $restaurantId) {
			restaurant {
				_id
				occupancy
				business_name
				business_address
				business_phone
				business_hours_open
				business_hours_close
				business_website
				business_image
			}
			hours
		}
	}
  }
`;

export const GET_RESERVATION_BY_RESTAURANT = gql`
query GetReservationsByRestaurant($restaurantId: ID!) {
	getReservationsByRestaurant(restaurantID: $restaurantId) {
	  _id
	  party_size
	  time_slot
	  user {
		first_name
		last_name
	  }
	}
  }
`;

