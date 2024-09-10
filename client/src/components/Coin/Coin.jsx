import { motion } from 'framer-motion';
import './Coin.css';

function App() {
  return (
    <motion.div
      className="coin"
      animate={{
        rotate: 360,
        right: ["-32px", "20px"], // Animate from off-screen to the visible position
        opacity: [1, 0] // Animate opacity from 1 to 0
      }}
      transition={{
        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
        right: { duration: 2, ease: "ease-in" },
        opacity: { duration: 2, ease: "ease-in" }
      }}
    />
  );
}

export default App;
