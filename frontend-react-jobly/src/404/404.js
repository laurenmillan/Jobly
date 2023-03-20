import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import './404.css';

/** Renders a 404 page. */

const NotFound = () => {
	return (
		<section className="NotFound">
			<Container>
				<Row>
					<Col xs="12" className="text-center">
						<h1 className="font-weight-bold">404</h1>
						<h2 className="font-weight-bold">Page not found</h2>
						<h5>Sorry, the page you are looking for does not exist.</h5>
						<div className="Links">
							<Link to="/">
								<Button color="primary">Go to Home</Button>
							</Link>
							<Link to="/companies">
								<Button color="primary">View Companies</Button>
							</Link>
							<Link to="/jobs">
								<Button color="primary">View Jobs</Button>
							</Link>
							<Link to="/profile">
								<Button color="primary">View Profile</Button>
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default NotFound;
