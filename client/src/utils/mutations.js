import { gql } from '@apollo/client';

export const CREATE_USER = gql`
	mutation CreateUser($input: UserInput) {
		createUser(input: $input) {
			token
			user {
				username
				phone_number
				last_name
				first_name
				email
				_id
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation Mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				username
				phone_number
				last_name
				first_name
				email
				_id
			}
		}
	}
`;

export const CREATE_RESTAURANT = gql`
	mutation Mutation($input: RestaurantInput) {
		createRestaurant(input: $input) {
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
		}
	}
`;

export const DELETE_RESERVATION = gql`
	mutation Mutation($id: ID!) {
		deleteReservation(_id: $id) {
			_id
			party_size
			time_slot
			user {
				_id
			}
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
		}
	}
`;
