import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { AppContext } from './context/AppContext';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminNavbar from './components/AdminNavbar'; // New Admin Navbar
import Sidebar from './components/Sidebar';         // Shared Sidebar for Admin/Doctor

// Patient Pages
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import ResetPassword from './pages/ResetPassword';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import AllApointments from './pages/Admin/AllApointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

// Doctor Pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // Helper to determine if we are in a "Panel" mode (Admin or Doctor) to change layout
  const isPanelMode = aToken || dToken;

  return (
    <div className={`min-h-screen ${isPanelMode ? 'bg-[#F8F9FD]' : 'bg-gray-50'}`}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      {/* If in Panel Mode, show AdminNavbar and Sidebar layout. Else show Standard Navbar */}
      {isPanelMode ? (
        <>
          <AdminNavbar />
          <div className='flex items-start'>
            <Sidebar />
            <div className='w-full min-h-screen p-4 md:p-6 overflow-y-auto'>
              <Routes>
                {/* Admin Routes */}
                <Route path='/admin-dashboard' element={<Dashboard />} />
                <Route path='/all-appointments' element={<AllApointments />} />
                <Route path='/add-doctor' element={<AddDoctor />} />
                <Route path='/doctor-list' element={<DoctorsList />} />

                {/* Doctor Routes */}
                <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                <Route path='/doctor-appointments' element={<DoctorAppointments />} />
                <Route path='/doctor-profile' element={<DoctorProfile />} />

                {/* Fallback to dashboard */}
                <Route path='/' element={aToken ? <Navigate to="/admin-dashboard" /> : <Navigate to="/doctor-dashboard" />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        /* Standard Patient Layout */
        <>
          {/* Navbar is inside the wrapper in previous design, but check if we need to pull it out.
                     The previous App.jsx had Navbar inside the container. 
                     We will keep the structure similar to previous but handle full width.
                 */}
          <Navbar />
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/doctors' element={<Doctors />} />
              <Route path='/doctors/:speciality' element={<Doctors />} />
              <Route path='/login' element={<Login />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/my-profile' element={<MyProfile />} />
              <Route path='/my-appointments' element={<MyAppointments />} />
              <Route path='/appointment/:docId' element={<Appointment />} />
              <Route path='/reset-password' element={<ResetPassword />} />
            </Routes>
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App