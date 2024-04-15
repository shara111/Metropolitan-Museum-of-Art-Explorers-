import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown, Container } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store'; // Update the path if necessary
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate'; // Make sure the path to these functions is correct

const MainNav = () => {
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  const token = readToken();

  const handleSearch = async (e) => {
    e.preventDefault();
    const queryString = `title=true&q=${encodeURIComponent(searchField)}`;
    router.push(`/artwork?${queryString}`);
    setSearchField('');
    setIsExpanded(false);
    setSearchHistory(await addToHistory(queryString));
  };

  const toggleNavbar = () => setIsExpanded(!isExpanded);

  const handleCollapse = () => setIsExpanded(false);

  const logout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <Navbar expand="lg" bg="primary" variant="dark" fixed="top" expanded={isExpanded}>
      <Container fluid>
        <Navbar.Brand href="/">Sukhman Hara</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/"} onClick={handleCollapse}>Home</Nav.Link>
            </Link>
            {token && (
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/search"} onClick={handleCollapse}>Advanced Search</Nav.Link>
              </Link>
            )}
          </Nav>
          {token ? (
            <>
              <Form className="d-flex" onSubmit={handleSearch}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <Button variant="outline-light" type="submit">Search</Button>
              </Form>
              <NavDropdown title={token.userName} id="nav-dropdown" alignRight>

                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/favourites"} onClick={handleCollapse}>Favourites</NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/history"} onClick={handleCollapse}>Search History</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Nav>
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/register"} onClick={handleCollapse}>Register</Nav.Link>
              </Link>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/login"} onClick={handleCollapse}>Login</Nav.Link>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
