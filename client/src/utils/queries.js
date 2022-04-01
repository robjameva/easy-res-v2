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