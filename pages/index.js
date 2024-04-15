/*********************************************************************************
* BTI425 – Assignment 6
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Sukhman Hara Student ID: 109790220 Date: April 14, 2024
*
* Vercel App (Deployed) Link: _____________________________________________________
*
********************************************************************************/ 
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <Row className="my-4">
        <Col md={6}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" alt="The Metropolitan Museum of Art" fluid rounded
         className="custom-img"
         style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd', padding: '5px', verticalAlign: 'middle' }}
        />
        </Col>

        <Col md={6}>
          <h2 style={{ textAlign: 'justify', marginTop: '30px', marginBottom: '30px', color: 'beige' }}>
            Welcome to the Metropolitan Museum of Art Explorer 
          </h2>
          <p style={{ textAlign: 'justify', marginTop: '30px', marginBottom: '30px', color: 'beige' }}>
          The Metropolitan Museum of Art of New York City, colloquially "the Met", is the largest art museum in the Americas. Its permanent collection contains over two million works, divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan's Upper East Side, is by area one of the world's largest art museums. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.

The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum's permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.

The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, the museum attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.
          </p>

          <p>
          <Link href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Learn more about The Met...</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

