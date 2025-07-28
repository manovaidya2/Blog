import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer'; // ⬅️ import this
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer /> {/* ⬅️ Add this */}
    </>
  );
}

export default App;
