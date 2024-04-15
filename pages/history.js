import { useAtom } from 'jotai';
import { searchHistoryAtom } from "../store"; // Ensure the path is correct
import Link from "next/link";
import { useRouter } from 'next/router'; // Import useRouter
import { ListGroup, Button, Card } from "react-bootstrap"; // Import Button and Card
import styles from '../styles/History.module.css'; // Ensure the path is correct

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if(!searchHistory) return null;

  // Parsing should occur inside the component function but outside the return statement.
  let parsedHistory = searchHistory.map((h, index) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    return { index, queryParams: Object.fromEntries(entries) }; // Adjusted to include index here
  });

  const historyClicked = (index) => {
    const searchQuery = searchHistory[index];
    router.push(`/artwork?${searchQuery}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // Prevent triggering the historyClicked event
    try {
      // Call removeFromHistory with the query string you want to remove
      const updatedHistory = await removeFromHistory(searchHistory[index]);
      // Update the state with the updated history list
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to remove history item', error);
      // Handle error, maybe set some state to show an error message to the user
    }
  };

  return (
    <div>
      <h1>Search History</h1>
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory.map(({ index, queryParams }) => (
            <ListGroup.Item key={index} className={styles.historyListItem} onClick={() => historyClicked(index)}>
              {Object.keys(queryParams).map(key => (
                <span key={key}>{key}: <strong>{queryParams[key]}</strong>&nbsp;</span>
              ))}
              <Button className="float-end" variant="danger" size="sm" onClick={(e) => removeHistoryClicked(e, index)}>&times;</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card>
          <Card.Body>Nothing Here. Try searching for some artwork.</Card.Body>
        </Card>
      )}
    </div>
  );
}
