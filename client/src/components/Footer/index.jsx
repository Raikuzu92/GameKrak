import './Footer.css'; // Custom styling for the footer

const Footer = () => {
  return (
    <footer className="retro-footer">
      <div className="d-flex justify-content-center py-3 align-items-center">
        <div className=''>
          <img src="../../assets/images/GitHub-white.png" alt="" />
        </div>
        <span className="text-white text-center p-override">
          © 2024 GameKrak. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
