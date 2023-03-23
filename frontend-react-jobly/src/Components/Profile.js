import React, { useEffect, useState } from 'react';
import {Alert, Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row, Card} from 'react-bootstrap';

import JoblyApi from '../api/api';

/** Renders a Profile page.
 * 
 * -Renders a form that will allow user to update First Name, Last Name, Email.
 * -Props: 
 *    - user: the current user object, containing username and token.
 *    - setCurrentUser: a function to update the current user information in App state.
 * 
 */

function Profile({ user, setCurrentUser }) {
	console.debug('ProfileForm', 'currentUser=', user, 'formData=', user);

	const [formData, setFormData] = useState({
  username: user?.username || "",
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  email: user?.email || "",
});

// disable the Save button when no changes have been made to form
const [hasChanged, setHasChanged] = useState(false)

useEffect(() => {
  setHasChanged(false)
}, [user])

  // Alert messages
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((data) => ({
			...data,
			[name]: value
		}));
    setHasChanged(true)
	}

	const handleSubmit = async (evt) => {
		console.debug('handleSubmit FormData');

		evt.preventDefault();
		try {
			await JoblyApi.saveProfile(user.username, {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email
			}, user);
      setSuccessMsg('Profile updated.');
      setErrorMsg('');

			setCurrentUser((data) => ({
				...data,
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email
			}));
		} catch (error) {
			console.error('Failed to save profile:', error);
      setErrorMsg('Failed to update profile. Please try again.');
      setSuccessMsg('');
		}
	};

return (
  <div className="Profile">
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card>
            <Card.Body>
              <h2>Profile</h2>
              {successMsg && <Alert variant="success">{successMsg}</Alert>}
              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel htmlFor="username">Username: </FormLabel>
                  <FormControl
                    type="text"
                    name="username"
                    value={formData.username}
                    disabled
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="firstName">First Name: </FormLabel>
                  <FormControl
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="lastName">Last Name: </FormLabel>
                  <FormControl
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="email">Email: </FormLabel>
                  <FormControl
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <Button style={{marginTop: '1rem'}} type="submit" variant="primary" disabled={!hasChanged}>
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);


}

export default Profile;
