import { gql } from '@apollo/client';

export const CREATE_USER = gql`
	mutation Mutation($input: UserInput) {
		createUser(input: $input) {
			token
			user {
				_id
				first_name
				last_name
				phone_number
				username
				email
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
