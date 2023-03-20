import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/** Renders a Login Form. 
 * 
 * -When the user successfully logs in, page welcomes user back.
 * 
*/

const LoginForm = ({ login }) => {
	console.debug('LoginForm');

	const [ isSuccess, setIsSuccess ] = useState(false);
	const [ validated, setValidated ] = useState(false);
	const navigate = useNavigate();
	const [ formData, setFormData ] = useState({ username: '', password: '' });

	useEffect(
		() => {
			if (isSuccess) {
				navigate('/', { replace: true });
			}
		},
		[ isSuccess, navigate ]
	);

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const form = evt.currentTarget;
		setValidated(true);

		if (form.checkValidity() === false) {
			evt.stopPropagation();
			return;
		}

		try {
			const loginRes = await login(formData);
			setIsSuccess(loginRes.success);
		} catch (error) {
			console.error('Failed to login:', error);
			if (error.response && (error.response.status === 409 || error.response.status === 401)) {
				alert('Incorrect username or password');
			} else {
				alert('An error occurred while logging in');
			}
		}
	};

	return (
		<div className="SignupForm">
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} sm={10} md={8} lg={6}>
						<Card>
							<Card.Body>
								<h2 className="mb-3">Log In</h2>
								<Form noValidate validated={validated} onSubmit={handleSubmit}>
									<Form.Group className="mb-3">
										<Form.Label htmlFor="username">Username</Form.Label>
										<Form.Control
											type="text"
											name="username"
											value={formData.username}
											onChange={handleChange}
											autoComplete="username"
											required
											className="form-control-sm"
										/>
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label htmlFor="password">Password</Form.Label>
										<Form.Control
											type="password"
											name="password"
											value={formData.password}
											onChange={handleChange}
											autoComplete="current-password"
											required
											className="form-control-sm"
										/>
									</Form.Group>

									<Button variant="primary" type="submit">
										Login
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default LoginForm;
