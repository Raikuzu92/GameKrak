import { Link } from "react-router-dom";
import './Header.css'; // Custom styling for the header
import { Navbar, Nav, NavDropdown, Container, Button, Dropdown, ButtonGroup } from 'react-bootstrap';

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    console.log("Logged out");
  };

  const tempLoggedIn = true

  return (

    <div>
      {/* Uncomment once loggedIn logic is set */}
      {/* {Auth.loggedIn() ? ( */}
      {tempLoggedIn ? (
        <>
          <header className='retro-header pt-5 pb-2 px-5 align-center'>
            <div className='flex-row justify-space-between-lg justify-center align-center'>
              <nav className="ps-2 nav-links d-flex align-items-center">
                <Link className="nav-item text-white" to="/profile">
                  Profile
                </Link>

                {/* Games Dropdown */}
                <ButtonGroup className="nav-item">
                  <Link className="text-white pe-2" to="/games">Games</Link>
                  <NavDropdown
                    as={ButtonGroup}
                    title=""
                    id="games-dropdown"
                    className="custom-dropdown" // Customize dropdown arrow in css
                    menuVariant="dark"  // Dark background for the dropdown
                  >
                    <NavDropdown.Item as={Link} to="/games/all" className="text-white">View All Games</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/games/title" className="text-white">Browse by Title</NavDropdown.Item>
                  </NavDropdown>
                </ButtonGroup>

                {/* Marketplace Split Button */}
                <ButtonGroup className="nav-item">
                  <Link to="/market/buy" className="text-white pe-2">Market</Link>
                  <NavDropdown
                    as={ButtonGroup}
                    title=""
                    id="marketplace-dropdown"
                    className="custom-dropdown"
                    menuVariant="dark"  // Dark background for the dropdown
                  >
                    <NavDropdown.Item as={Link} to="/market/buy" className="text-white">Buy</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/market/sell" className="text-white">Sell</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/market/trade" className="text-white">Trade</NavDropdown.Item>
                  </NavDropdown>
                </ButtonGroup>
              </nav>

              <div>
                <Link className='pe-5 glitch-text' to='/'>
                  GameKrak
                </Link>
              </div>

              <span className="nav-item text-white logout pe-1" onClick={logout}>
                Logout
              </span>
            </div>
          </header>
        </>
      ) : (
        <>
        </>
      )}
    </div>
  );
};

export default Header;