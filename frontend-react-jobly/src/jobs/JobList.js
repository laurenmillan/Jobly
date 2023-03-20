import React, { useState, useEffect } from 'react';
import Search from '../companies/SearchForm';
import JoblyApi from '../api/api';
import JobCardList from './JobCardList';
import Spinner from 'react-bootstrap/Spinner';

/** Renders a list of all jobs.
 *
 * -state: useState to create a state variable `jobs`
 * -useEffect fetches the list of jobs from the API and updates `jobs`
 * -props: applyToJob
 * -Displays a SearchForm component that allows user to search for a job.
 * -SearchForm renders a search bar, which is passed the searchFor props to perform the search.
 * -Allows user to apply to jobs.
 * -Routed at /jobs
 */

function JobList({ applyToJob }) {
	console.debug('JobList');

	const [ jobs, setJobs ] = useState([]);

	useEffect(function getAllJobsOnMount() {
		console.debug('JobList useEffect getAllJobsOnMount');
		search();
	}, []);

	/** Triggered by search form submit; reloads companies. 
	 * resets back to original state if user deletes query.*/
	async function search(title) {
		try {
			let jobs = [];
			if (title) {
				jobs = await JoblyApi.getJobs(title);
			} else {
				jobs = await JoblyApi.getJobs();
			}
			setJobs(jobs);
		} catch (err) {
			console.error('JobList search error:', err);
		}
	}

	if (!jobs)
		return (
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		);

	return (
		<div className="JobList col-md-8 offset-md-2">
			<Search searchFor={search} />
			{jobs.length ? (
				<JobCardList jobs={jobs} applyToJob={applyToJob} />
			) : (
				<p className="lead" style={{ color: 'white', textShadow: '1px 1px black' }}>
					Sorry, no results were found!
				</p>
			)}
		</div>
	);
}

export default JobList;
