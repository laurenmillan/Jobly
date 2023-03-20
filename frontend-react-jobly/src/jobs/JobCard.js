import React, { useState, useEffect } from 'react';
import './JobCard.css';
import { FormatMoney } from 'format-money-js';
import jwt_decode from 'jwt-decode';

/** Renders a card that displays information about a job.
 *
 * -JobList renders Jobcard which displays a card for each job.
 * -props: id, title, salary, equity, companyName, applyToJob
 * -Receives the apply function prop from the parent which is called on apply.
 * -If a user applies to a job, the `Applied` button will persist across page refreshes, store state in local storage.
 * -jwt-decode decodes the JWT token stored in local storage and extracts the user identifer.
 *    This ensures that the applied stated is only stored per user, per job.
 * -Routed from JobCardList -> JobCard
 */

function JobCard({ id, title, salary, equity, companyName, applyToJob }) {
	console.debug('JobCard');

	const [ hasApplied, setHasApplied ] = useState(false);
	// decode token and extract user identifier
	const decodedToken = jwt_decode(localStorage.getItem('token'));
	const userIdentifier = decodedToken.username;

	// Retrieve the applied state from local storage using user identifier
	useEffect(
		() => {
			const storedAppliedState = localStorage.getItem(`job-${id}-${userIdentifier}-applied`);
			if (storedAppliedState) {
				setHasApplied(JSON.parse(storedAppliedState));
			}
		},
		[ id, userIdentifier ]
	);

	async function handleApply() {
		console.debug('Successfully Applied');
		if (hasApplied) return;

		// store in local storage using user identifier
		await applyToJob(id);
		setHasApplied(true);
		localStorage.setItem(`job-${id}-${userIdentifier}-applied`, JSON.stringify(true));
	}

	const fm = new FormatMoney({
		decimals: 2
	});
	let dollarAmt = fm.from(salary, { symbol: '$' });

	return (
		<div className="JobCard card">
			<div className="card-body">
				<div className="job-details mb-2">
					<h5 className="card-title">{title}</h5>
					<p>{companyName}</p>
					<small>Salary: {salary !== null ? dollarAmt : 'Unavailable'}</small>
					{equity && equity >= 0.01 ? (
						<small>
							<span>Equity: {`${(equity * 100).toFixed(0)}%`}</span>
						</small>
					) : (
						<small>Equity: Less than 1%</small>
					)}
				</div>
				<div>
					<button
						className={`btn btn-md ${hasApplied ? 'btn-secondary' : 'btn-success'}`}
						type="submit"
						onClick={handleApply}
						disabled={hasApplied}
					>
						{hasApplied ? 'Applied' : 'Apply'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default JobCard;
