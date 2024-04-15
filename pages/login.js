import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { authenticateUser } from '../lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '../store';
import { getFavourites, getHistory } from '../lib/userData';
//To capture form data using controlled components, we include this: 
const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    //Jotai state atoms
    const [, setFavouriteList] = useAtom(favouritesAtom);
    const [, setSearchHistory] = useAtom(searchHistoryAtom);

    const updateAtoms = async () => {
        try {
          const favourites = await getFavourites();
          setFavouriteList(favourites);
    
          const history = await getHistory();
          setSearchHistory(history);
        } catch (err) {
          // Handle errors, e.g. show a notification
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            await authenticateUser(userName, password);
            await updateAtoms(); //Update favourites and history after successful login
            router.push('/favourites');
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <>
          <Card bg="light">
            <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
          </Card>
          <br />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>User:</Form.Label><Form.Control 
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)} 
            />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <br />
            <Button variant="primary" className="pull-right" type="submit">Login</Button>
          </Form>
        </>
      );
    }
    export default Login;