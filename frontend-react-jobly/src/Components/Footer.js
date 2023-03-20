import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

/** Renders a Footer. */

const Footer = () => {
	return (
		<footer className="footer" style={{ padding: '1rem 0' }}>
			<Container>
				<Row>
					<Col className="text-center">
						<p className="text-white mb-0 fs-6">
							Copyright © {new Date().getFullYear()} Jobly. All rights reserved.
						</p>
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col xs="auto">
						<a href="tel:5555555555" className="text-white">
							<FaPhone size={20} color="#f8f9fa" />
						</a>
					</Col>
					<Col xs="auto">
						<a href="mailto:jobly@fakeemail.com" className="text-white">
							<FaEnvelope size={20} color="#f8f9fa" />
						</a>
					</Col>
					<Col xs="auto">
						<a
							href="https://www.instagram.com/thisisbillgates/?hl=en"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaInstagram size={20} color="#f8f9fa" />
						</a>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
