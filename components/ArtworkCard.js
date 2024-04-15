import useSWR from 'swr';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);
    
    if (error) return <Error statusCode={error.status} title={error.statusText} />;
    if (!data) return <div>Loading...</div>; // You can implement a loader here

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data.primaryImageSmall || "https://via.placeholder.com/375x375.png?text=Not+Available"} />
            <Card.Body>
                <Card.Title>{data.title || "N/A"}</Card.Title>
                <Card.Text>
                    Date: {data.objectDate || "N/A"}
                    <br />
                    Classification: {data.classification || "N/A"}
                    <br />
                    Medium: {data.medium || "N/A"}
                </Card.Text>
                <Link className="btn btn-primary" href={`/artwork/${objectID}`}>
                    Views
                </Link>
            </Card.Body>
        </Card>
    );
}
