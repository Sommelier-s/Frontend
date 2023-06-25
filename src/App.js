
import './App.css';
//Import hooks
import { Routes, Route, useLocation } from "react-router-dom";

//I import the components
import Home from "./views/Home";
import About from "./views/About";
import Leanding from "./views/Leanding";
import Detail from "./views/Detail";
import Create from './views/Create';
import NotFound from "./views/NotFound";
import Buy from "./views/Buy";
import Nav from "./components/Nav";
import Payment from "./components/Payment";
import Completion from "./components/Completion";
import Shipment from "./views/Shipment"
import Dashboard from './views/Dashboard';
import LoginForm from './views/LoginForm';
import DashboardUser from './views/DashboardUser';
import CreateCategory from './components/CreateCategory';
import ConfirmedUser from './components/ConfirmedUser';
import ResetPassword from './components/ResetPassword';
import axios from "axios";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCartFromLocalStorage,
  saveUser
} from "./redux/actions";

// //Axios configuration
// const desarrolloApp = "http://localhost:3001";
// const produccionApp = "";

// axios.defaults.baseURL = desarrolloApp;

function App() {

  const { pathname } = useLocation();

  //This function checks which route you are on to display the Nav
  const verificarRutas = () => {
    switch (pathname) {
      case "/": return true
      case "/about": return true
      case "/buy": return true
      case "/create/:id": return true
      case "/payment/:id": return false
      case "/completion": return true
      case "/shipment": return true
      case "/login": return true
      case "/dashboard/:id": return false
      case "/dashboard_user/:id": return false
      case "/detail/:id": return true
      case "/create_category/:id": return false
      case "/reset_password": return false
      default: return false
    }
  }



  const dispatch = useDispatch();

  useEffect(() => {

    const cart = window.localStorage.getItem("cart");
    if (cart) {
      const cartParseado = JSON.parse(cart);
      if (cartParseado.length != 0) {
        dispatch(updateCartFromLocalStorage(cartParseado));
      }
    }

    const user = window.localStorage.getItem("user");
    if (user) {
      const userParseado = JSON.parse(user);
      if (userParseado.length != 0) {
        dispatch(saveUser(userParseado));
      }
    }
  }, [])



  return (

    <div className="App">

      {verificarRutas() && <Nav />}

      <Routes>


        <Route path="/" element={< Home />} />
        <Route path="/about" element={< About />} />
        <Route path="/buy" element={< Buy />} />
        <Route path="/create/:id" element={< Create />} />
        <Route path="/payment/:id" element={< Payment />} />
        <Route path="/completion" element={< Completion />} />
        <Route path="/shipment" element={< Shipment />} />
        <Route path="/dashboard/:id" element={< Dashboard />} />
        <Route path="/dashboard_user/:id" element={< DashboardUser />} />
        <Route path="/create_category/:id" element={< CreateCategory />} />
        <Route path="/detail/:id" element={< Detail />} />
        <Route path="/login" element={< LoginForm />} />
        <Route path="/auth/confirmar/:id" element={< ConfirmedUser />} />
        <Route path="/reset_password" element={< ResetPassword />} />


        <Route path='*' element={<NotFound />} />
      </Routes>

    </div>

  );
}

export default App;