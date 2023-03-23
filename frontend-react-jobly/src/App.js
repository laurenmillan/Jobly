import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import JoblyApi from './api/api';

import './App.css';
import Home from './Components/Home';
import CompanyList from './companies/CompanyList';
import CompanyDetail from './companies/CompanyDetail';
import JobList from './jobs/JobList';
import Login from './Components/LoginForm';
import Signup from './Components/SignupForm';
import Profile from './Components/Profile';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import NotFound from './404/404';
import jwt_decode from 'jwt-decode';

/** Jobly App logic.
 *  
 * -signup and logout functions use the JoblyApi to make requests to the backend API. If successful, they update 
 *    the token and store it in the browser's local storage.
 * -This maintains the user's session and avoids the need for the user to login when they revisit the website.
 * -useEffect will run whenever the token value changes to ensure that the user information is fetched and
 *    updated based on the changes to the token.
 * 
*/

function App() {
	const [ currentUser, setCurrentUser ] = useState(null);
	// here we retrieve the value of the token key from local storage.
	const [ token, setToken ] = useState(localStorage.getItem('token'));
	JoblyApi.token = token;
	const [ infoLoaded, setInfoLoaded ] = useState(false);

	console.debug('App', 'currentUser=', currentUser, 'token=', token);

	useEffect(
		() => {
			async function fetchUser() {
				setInfoLoaded(false);
				if (JoblyApi.token) {
					try {
						const data = jwt_decode(JoblyApi.token);
						const userData = await JoblyApi.getCurrentUser(data.username);
						setCurrentUser(userData);
					} catch (error) {
						console.error('Error occurred while fetching user data:', error);
					}
				} else {
					setCurrentUser(null);
				}
				setInfoLoaded(true);
			}
			fetchUser();
		},
		[ token ]
	); // Add token as a dependency

	async function signup(signupData) {
		try {
			const token = await JoblyApi.signup(signupData);
			localStorage.setItem('token', token);
			setToken(token);
			JoblyApi.token = token;
			return { success: true };
		} catch (error) {
			console.error('Failed to signup:', error);
			return { success: false, error };
		}
	}

	async function login(loginData) {
		try {
			const token = await JoblyApi.login(loginData);
			localStorage.setItem('token', token);
			setToken(token);
			JoblyApi.token = token;
			return { success: true };
		} catch (error) {
			console.error('Failed to login:', error);
			return { success: false, error };
		}
	}

	/** Logout by clearing app's state, remove user's auth token from browser's local storage. */
	function logout() {
		setCurrentUser(null);
		setToken(null);
		localStorage.removeItem('token');
	}

	async function applyToJob(jobId) {
		if (currentUser) {
			try {
				await JoblyApi.applyToJob(currentUser.username, jobId);
			} catch (error) {
				console.error('Failed to apply for job:', error);
				alert('You already applied to this job.');
			}
		} else {
			console.error('User must be logged in to apply for a job.');
		}
	}

	// determine if a user is logged in or not.
	return (
		<div className="App">
			<NavBar user={token} logout={logout} />
			<div className="page-container">
				<div className="page-content">
					{infoLoaded ? (
						<Routes>
							<Route exact path="/" element={<Home user={currentUser} />} />
							<Route exact path="/companies" element={<CompanyList />} />
							<Route
								exact
								path="/companies/:handle"
								element={<CompanyDetail applyToJob={applyToJob} />}
							/>
							<Route exact path="/jobs" element={<JobList applyToJob={applyToJob} />} />
							<Route exact path="/login" element={<Login login={login} />} />
							<Route exact path="/signup" element={<Signup signup={signup} />} />
							<Route
								exact
								path="/profile"
								element={<Profile user={currentUser} setCurrentUser={setCurrentUser} />}
							/>
							<Route path="/*" element={<NotFound />} />
						</Routes>
					) : (
						<p>Loading...</p>
					)}
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default App;
