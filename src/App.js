
import './App.css';
//Import hooks
import { Routes, Route, useLocation } from "react-router-dom";

//I import the components
import Home from "./views/Home";
import About from "./views/About";
import Leanding from "./views/Leanding";
import Detail from "./views/Detail";
import Create from './views/Create';
import Shipment from './views/Shipment';
import NotFound from "./views/NotFound";
import Buy from "./views/Buy";
import Payment from './components/Payment';
import Completion from './components/Completion';
import Nav from "./components/Nav";
import axios from "axios";

// //Axios configuration
// const desarrolloApp = "http://localhost:3001";
// const produccionApp = "";

// axios.defaults.baseURL = desarrolloApp;

function App() {

  const { pathname } = useLocation();

  //This function checks which route you are on to display the Nav
  const verificarRutas = () => {
    switch (pathname) {
      case "/": return false
      case "/home": return true
      case "/about": return true
      case "/buy": return true
      case "/create": return true
<<<<<<< Updated upstream
      case "/payment": return true
      case "/completion": return true
=======
      case "/shipment": return true
>>>>>>> Stashed changes
      case "/detail/:id": return false
      default: return false
    }
  }




  return (

    <div className="App">

      {verificarRutas() && <Nav />}

      <Routes>

        <Route path="/" element={< Leanding />} />
        <Route path="/home" element={< Home />} />
        <Route path="/about" element={< About />} />
        <Route path="/buy" element={< Buy />} />
        <Route path="/create" element={< Create />} />
<<<<<<< Updated upstream
        <Route path="/payment" element={< Payment />} />
        <Route path="/completion" element={< Completion />} />
=======
        <Route path="/shipment" element={< Shipment />} />
>>>>>>> Stashed changes
        <Route path="/detail/:id" element={< Detail />} />
        <Route path='*' element={<NotFound />} />

      </Routes>

    </div>

  );
}

export default App;
