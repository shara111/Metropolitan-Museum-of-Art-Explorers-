import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "../../components/ArtworkCardDetail"; // Adjust the path if needed

export default function ArtworkById() {
    const router = useRouter();
    const { objectID } = router.query;

    return (
        <Container>
            <Row>
                <Col>
                    {objectID && <ArtworkCardDetail objectID={objectID} />}
                </Col>
            </Row>
        </Container>
    );
}
