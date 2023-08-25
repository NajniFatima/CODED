import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditorScreen from './screens/EditorScreen';
import UserScreen from './screens/UserScreen';
import UserEntryScreen from './screens/UserEntryScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotpasswordScreen from './screens/ForgotpasswordScreen';
import ResetpasswordScreen from './screens/ResetpasswordScreen';
import VerificationScreen from './screens/VerificationScreen';
// import HomeScreen from './screens/HomeScreen';
import TermsScreen from './screens/TermsScreen';
import WorkingScreen from './screens/WorkingScreen';
import Navbar from './components/Navbar';
// import PrivateWrapper from './util/PrivateRoute';
// import pattern from './asset/pattern.svg';

function App() {
	const settings = useSelector((state) => state.settings);
	const { theme } = settings;
	return (
		<Router>
			<main className={'' + theme}>
				<div className='bg-gray-200 dark:bg-gray-900 min-h-screen'>
					<Navbar />
					<Switch>
						<Route path='/editor' component={EditorScreen} exact />
						<Route path='/login' component={LoginScreen} exact />
						<Route path='/register' component={RegisterScreen} exact />
						<Route
							path='/user/password/forgot'
							component={ForgotpasswordScreen}
							exact
						/>
						<Route
							path='/user/verify/:token'
							component={VerificationScreen}
							exact
						/>
						<Route
							path='/user/password/reset/:token'
							component={ResetpasswordScreen}
							exact
						/>
						<Route path='/user/:id' component={UserScreen} exact />
						<Route path='/entry/:id' component={UserEntryScreen} exact />
						<Route path='/admin' component={UserScreen} exact />
						<Route path='/terms' component={TermsScreen} exact />
						<Route path='/working' component={WorkingScreen} exact />
						{/* <Route path='/' component={HomeScreen} exact /> */}
						<Redirect to='/editor' />
					</Switch>
				</div>
			</main>
		</Router>
	);
}

export default App;
