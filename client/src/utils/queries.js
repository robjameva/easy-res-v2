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
