import "./app.css";
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Contact from './pages/Contact';
import DoctorDetails from './pages/DoctorDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import { useSelector } from "react-redux";
import Error404 from "./pages/Error404";

function App() {
  const { authUser, role } = useSelector(store => store.user);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        {authUser && role === 'patient' && <Route path="/users/profile/me" element={<PatientDashboard />} />}
        {authUser && role === 'doctor' && <Route path="/doctors/profile/me" element={<DoctorDashboard />} />}
        {role==='patient' && <Route path="/checkout-success" element={<CheckoutSuccess />} />}
        <Route path="*" element={<Error404 />} /> 
      </Routes>
    </>
  );
}

export default App;
