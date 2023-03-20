import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyCard.css';

/** Renders a card that displays information about a company.
 *
 * -CompanyCard is rendered by CompanyList to show a card for each company.
 * -props: name, description, handle
 * -When the card is clicked, the `Link` navigates the user to a detailed view of that company.
 * -CompanyList -> CompanyCard
 * 
 */

function CompanyCard({ name, description, handle }) {
	console.debug('CompanyCard');

	return (
		<Link className="CompanyCard card" to={`/companies/${handle}`}>
			<div className="card-body">
				<h6 className="card-title">{name}</h6>
				<p>
					<small>{description}</small>
				</p>
			</div>
		</Link>
	);
}

export default CompanyCard;
