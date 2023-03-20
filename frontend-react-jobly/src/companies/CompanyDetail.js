import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api/api';
import JobCardList from '../jobs/JobCardList';
import NotFound from '../404/404';

/** Company detail page.
 * 
 * -Renders cards that display job details for the specific company, with an Apply button.
 * -props: 
 * 		-`handle` is used to fetch the specific company details from the API.
 * 		-`company` is set to null, then is later updated with the specific company details from the API.
 * 		-`applyToJob` allows user to apply to jobs.
 * -Routed at /companies/:handle
 *
 */

function CompanyDetail({ applyToJob }) {
	console.debug('CompanyDetail');

	const { handle } = useParams();
	const [ company, setCompany ] = useState(null);

	useEffect(
		function getCompanyAndJobs() {
			async function getCompany() {
				try {
					setCompany(await JoblyApi.getCompany(handle));
				} catch (err) {
					console.error('CompanyDetail getCompany error:', err);
				}
			}
			getCompany();
		},
		[ handle ]
	);

	return (
		<div className="CompanyDetail col-md-8 offset-md-2">
			{company ? (
				<div>
					<Card style={{ marginBottom: '1rem' }}>
						<Card.Body>
							<h3>{company.name}</h3>
							<p>{company.description}</p>
						</Card.Body>
					</Card>
					<JobCardList jobs={company.jobs} applyToJob={applyToJob} />
				</div>
			) : (
				<NotFound />
			)}
		</div>
	);
}

export default CompanyDetail;
