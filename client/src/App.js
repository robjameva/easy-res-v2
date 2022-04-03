import React from 'react';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Login from "./components/Login"
import Home from "../src/components/Home";
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';
import SearchAppBar from './components/AppBar';
import SingleView from './components/SingleView';
import OwnerSign from "./components/OwnerSignUp"
import OwnerDash from './components/OwnerDash';
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<SearchAppBar />
				<div className="container">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/sign-up" component={SignUp} />
						<Route exact path="/restaurant/:restaurantId" component={SingleView} />
						<Route exact path="/owner-dashboard" component={OwnerDash} />
						<Route exact path="/owner" component={OwnerSign} />

						{/* <Route exact path="" component={SingleView} /> */}
					</Switch>
				</div>
				<Footer />
			</Router>
		</ApolloProvider>
	);
}
