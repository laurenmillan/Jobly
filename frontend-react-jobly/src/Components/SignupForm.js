import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/** Renders a Signup Form. 
 * 
 * -When the user successfully signs up, navigate to /companies page.
 * 
*/

const SignupForm = ({ signup }) => {
	console.debug('SignupForm');

	const [ isSuccess, setIsSuccess ] = useState(false);
	const [ validated, setValidated ] = useState(false);
	const [ formData, setFormData ] = useState({
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		email: ''
	});
	const navigate = useNavigate();

	useEffect(
		() => {
			if (isSuccess) {
				navigate('/companies', { replace: true });
			}
		},
		[ isSuccess, navigate ]
	);

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const form = evt.currentTarget;
		if (form.checkValidity() === false) {
			evt.stopPropagation();
		} else {
			try {
				const res = await signup(formData);
				setIsSuccess(res.success);
			} catch (error) {
				console.error(error);
				const errorMessage =
					error.response && error.response.status === 409
						? 'Username or email already exists'
						: 'An error occurred while signing up';
				alert(errorMessage);
			}
		}
		setValidated(true);
	};

	return (
		<div className="SignupForm">
			<div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
				<Card>
					<Card.Body>
						<h2 className="mb-3">Sign Up</h2>
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
									aria-describedby="username-description"
									className="w-100"
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
									aria-describedby="password-description"
									minLength={5}
									className="w-100"
								/>
								<Form.Control.Feedback type="invalid">
									Password must be at least 5 characters.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label htmlFor="first-name">First Name</Form.Label>
								<Form.Control
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									required
									aria-describedby="first-name"
									className="w-100"
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label htmlFor="last-name">Last Name</Form.Label>
								<Form.Control
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									required
									aria-describedby="last-name"
									className="w-100"
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label htmlFor="email">Email</Form.Label>
								<Form.Control
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									aria-describedby="email"
									className="w-100"
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								Sign Up
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default SignupForm;
