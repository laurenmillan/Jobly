import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import CompanyList from './companies/CompanyList';
import CompanyDetail from './companies/CompanyDetail';
import JobList from './jobs/JobList';
import Login from './Components/LoginForm';
import Signup from './Components/SignupForm';
import Profile from './Components/ProfileForm';
import NotFound from './404/404';

/** Routing Logic. */

const AppRoutes = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/companies" element={<CompanyList />} />
			<Route exact path="/companies/:handle" element={<CompanyDetail />} />
			<Route exact path="/jobs" element={<JobList />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/signup" element={<Signup />} />
			<Route exact path="/profile" element={<Profile />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
