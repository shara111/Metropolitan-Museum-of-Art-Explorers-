import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store'; // Adjust path as needed

import { addToHistory } from '../lib/userData';


export default function AdvancedSearch(){
    const { register, handleSubmit } = useForm();
    //Step 6
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    const onSubmit = async (data) => {
      const queryString = Object.entries(data)
          .filter(([_, value]) => value) // Corrected filter check
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');

          //Wait for history update before navigating and state update
          const updatedHistory = await addToHistory(queryString);
          router.push(`/artwork?${queryString}`);
    };
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Search Query</Form.Label>
                <Form.Control type="text" placeholder="" {...register('q')} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Search By</Form.Label>
                <Form.Select {...register('searchBy')} className="mb-3">
                  <option value="title">Title</option>
                  <option value="tags">Tags</option>
                  <option value="artistOrCulture">Artist or Culture</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Geo Location</Form.Label>
                <Form.Control type="text" placeholder="" {...register('geoLocation')} />
                <Form.Text className="text-muted">
                  Case Sensitive String (ie "Europe", "France", "Paris", "China", "New York", etc.), with multiple values separated by the | operator
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Medium</Form.Label>
                <Form.Control type="text" placeholder="" {...register('medium')} />
                <Form.Text className="text-muted">
                  Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), with multiple values separated by the | operator
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                label="Highlighted"
                {...register('isHighlight')}
              />
              <Form.Check
                type="checkbox"
                label="Currently on View"
                {...register('isOnView')}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      );
}