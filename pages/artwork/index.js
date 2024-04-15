import { useRouter } from "next/router";
import { Container, Row } from "react-bootstrap";
import useSWR from "swr";
import React, { useState, useEffect } from 'react';
import { Card, Col, Pagination } from "react-bootstrap";
import ArtworkCard from '../../components/ArtworkCard';
import Error from 'next/error';
import validObjectIDList from '../../public/data/validObjectIDList.json'



const fetcher = (url) => fetch(url).then((res) => res.json());

const PER_PAGE = 12;
export default function Artwork() {
  const router = useRouter();
  let { query } = router;

  //This line of code transforms an object into a query string format
  let finalQuery = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  );
  //Ensure the following values are in the state
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  //useEffect
  useEffect(() => {
    if (data?.objectIDs) {

      //Filter search which filters all objectID values in the ValidObjectIDList
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x)); 

      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
       }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);
  if (error) return <Error statusCode={404} />;
  if (!data) return <Container>Loading...</Container>;

  //Declare two functions for pagination
  const nextPage = () => {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <Container>
      <Row className="gy-4">
        {artworkList.length > 0 ? (

          artworkList[page - 1].map((objectID) => (
            <Col lg={3} key={objectID}>

              
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body><h4>Nothing Here</h4>Try searching for something else.</Card.Body>
          </Card>
        )}
      </Row>
      {artworkList.length > 0 && (
        <Row>
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev onClick={prevPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
}
