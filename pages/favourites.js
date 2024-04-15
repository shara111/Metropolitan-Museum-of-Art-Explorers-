// pages/favourites.js
import React from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store'; // Adjust the path as needed
import { Container, Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard'; // Adjust the path as needed

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);
  if(!favouritesList) return null;


  return (
    <Container className="mt-3">
      <h1>Favourites</h1>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map(objectID => (
            <Col key={objectID} sm={12} md={6} lg={4}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="text-center mt-3">
          <Card.Body>No favourites added yet.</Card.Body>
        </Card>
      )}
    </Container>
  );
}
