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

  const tempLoggedIn = true;

  return (
    <div>
      {tempLoggedIn ? (
        <>
          <header className='retro-header pt-5 pb-4 px-5'>
            <div className='flex-row justify-space-between-lg justify-center align-center'>
              <nav className="nav-links d-flex align-items-center flex-grow-1">
                <Link className="nav-item text-white" to="/profile" style={{ fontSize: "medium" }}>
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
                    <NavDropdown.Item as={Link} to="/search" className="text-white">Browse by Title</NavDropdown.Item>
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


              {/* Centered GameKrak Title */}
              <div className="title-container text-center flex-grow-1">
                <Link className='glitch-text' to='/'>

                  GameKrak
                </Link>
              </div>

              <div className="d-flex justify-content-end flex-grow-1">
                <span className="nav-item text-white logout pe-1" onClick={logout}>
                  Logout
                </span>
              </div>
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
