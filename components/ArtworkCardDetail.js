import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';
import { atom, useAtom } from 'jotai';
import { favouritesAtom } from '@/store';

import { addToFavourites, removeFromFavourites } from '../lib/userData';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher);

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  const toggleFavourite = async () => {
    if (showAdded) {
      await removeFromFavourites(objectID);
      setFavouritesList(favouritesList.filter((id) => id !== objectID));
      setShowAdded(false);
    } else {
      await addToFavourites(objectID);
      setFavouritesList([...favouritesList, objectID]);
      setShowAdded(true);
    }
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card style={{ width: '18rem' }}>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          Date: {data.objectDate || "N/A"}
          <br />
          Classification: {data.classification || "N/A"}
          <br />
          Medium: {data.medium || "N/A"}
          <br /> <br />
          Artist: {data.artistDisplayName || "N/A"}
          <br />
          Credit: {data.creditLine || "N/A"}
          <br />
          Dimensions: {data.dimensions || "N/A"} 
          {data.artistWikidata_URL && (
            <Link href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</Link>
          )}
        </Card.Text>
        <Button variant={showAdded ? "primary" : "secondary"} onClick={toggleFavourite}>
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
