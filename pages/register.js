import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { registerUser } from '../lib/authenticate';

export default function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warning, setWarning] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== password2) {
      setWarning('Passwords do not match.');
      return;
    }
    try {
      await registerUser(user, password, password2);
      router.push('/login');
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          Register for an account:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={e => setUser(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        {warning && <Alert variant="danger">{warning}</Alert>}
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </>
  );
}
