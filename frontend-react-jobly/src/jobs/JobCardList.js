import React from 'react';
import JobCard from './JobCard';

/** Renders a list of all jobs for the specified Company.
 * 
 * -This component is used on JobList and the CompanyDetail page.
 * -prop: `apply` which is called by JobCard on apply.
 * -Routed from CompanyList -> CompanyDetail -> JobCardList -> JobCard.
 */

function JobCardList({ jobs, applyToJob }) {
	console.debug('JobCardList');

	return (
		<div className="JobCardList">
			{jobs.map((job) => (
				<JobCard
					key={job.id}
					id={job.id}
					title={job.title}
					salary={job.salary}
					equity={job.equity}
					companyName={job.companyName}
					applyToJob={applyToJob}
				/>
			))}
		</div>
	);
}

export default JobCardList;
