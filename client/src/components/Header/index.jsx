import { Link } from "react-router-dom";
import './Header.css'; // Custom styling for the header

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    console.log("Logged out");
    // Add Auth.logout() logic later
  };

  return (
    <header className="retro-header">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* App Name on the left */}
        <Link className="glitch-text" to="/">
          GameKrak
        </Link>

        {/* Navigation Links on the right */}
        <nav className="nav-links d-flex align-items-center">
          <Link className="nav-item text-white" to="/marketplace">
            Marketplace
          </Link>
          <Link className="nav-item text-white" to="/profile">
            Profile
          </Link>
          <span className="nav-item text-white logout" onClick={logout}>
            Logout
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
