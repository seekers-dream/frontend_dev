import { Route, Routes, useLocation } from 'react-router-dom';
import {
  About,
  Contact,
  Home,
  Logistics,
  Overview,
  Properties,
  PropertyDetails,
  ResetPassword,
} from './pages';
import ProtectedRoute from './layout/ProtectedRoute';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  const location = useLocation();

  const isAuthPages =
    location.pathname === '/reset' || location.pathname === '/';

  const isFooter = location.pathname === '/reset';

  return (
    <div>
      {!isAuthPages && <Navbar background="bg-white" color="text-black" />}

      <Routes>
        <Route path="/reset" element={<ResetPassword />} />
        {/* <Route path="/term-of-use" element={<TermOfUse />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:propertyId" element={<PropertyDetails />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="overview" element={<Overview />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isFooter && <Footer />}
    </div>
  );
}
export default App;
