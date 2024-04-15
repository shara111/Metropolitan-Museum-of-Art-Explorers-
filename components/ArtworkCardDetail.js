// Accepts a single "objectID" prop
import useSWR from 'swr';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';  // Make sure to import the Error component
import { atom, useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState } from 'react';

import { addToFavourites, removeFromFavourites } from '../lib/userData';



const fetcher =  (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher);

    // This favouritesAtom will hold an array of objectIDs representing the favourite artworks.
    //setFavouriteList will update the favouritesAtom
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    //showadded
    const [showAdded, setShowAdded] = useState(false);

    //Useeffect to update showAdded based on the current favouriteList
    useEffect(()=>{
      setShowAdded(favouritesList?.includes(objectID))
     }, [favouritesList])

    const toggleFavourite = async () => {
      //If the item is currently marked as favourite
        if (showAdded) {
          await removeFromFavourites(objectID);
          //Update the local state based on the updated favourites list
            setShowAdded(false);
            setFavouritesList(favouritesList.filter((id) => id !== objectID));
        } else {
          await addToFavourites(objectID);
         //Update the local state based on the updated favourites list
            setShowAdded(true);
            setFavouritesList([...favouritesList, objectID]);
        }
    };
    if (error) return <Error statusCode={404} />

    //If the request returns data, render a Bootstrap Card component with the data
    if (!data) return null;

    return(
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
          Dimensions: {data.dimensions || "N/A"}  // Corrected typo
          {data.artistWikidata_URL && (
          <Link href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</Link>
        )}
          </Card.Text>
          <Button variant={showAdded ? "primary" : "secondary"} onClick={toggleFavourite}>
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
          </Card.Body>
      </Card>
    );
}