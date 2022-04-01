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
		}
		}
	}
`;

export const GET_ALL_RESTAURANTS = gql`
query GetAllRestaurants {
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