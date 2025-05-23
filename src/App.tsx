import { Route, Routes, useLocation } from 'react-router-dom';
import {
  About,
  Contact,
  Help,
  Home,
  Listings,
  Logistics,
  Messages,
  Overview,
  Partnership,
  Performance,
  Profile,
  Properties,
  PropertyDetails,
  ResetPassword,
  Subscriptions,
} from './pages';
import ProtectedRoute from './layout/ProtectedRoute';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { DashboardLayout } from './layout';
import { useScrollToTop } from './hooks/useScroll';

function App() {
  const location = useLocation();
  useScrollToTop();

  const isAuthPages =
    location.pathname === '/reset' ||
    location.pathname === '/' ||
    location.pathname === '/logistics' ||
    location.pathname === '/partnership' ||
    location.pathname.includes('/dashboard');

  const isFooter =
    location.pathname === '/reset' || location.pathname.includes('/dashboard');

  return (
    <div>
      {!isAuthPages && <Navbar background="bg-white" />}

      <Routes>
        <Route path="/reset" element={<ResetPassword />} />
        {/* <Route path="/term-of-use" element={<TermOfUse />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:propertyId" element={<PropertyDetails />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="overview" element={<Overview />} />
          <Route path="listings" element={<Listings />} />
          <Route path="messages" element={<Messages />} />
          <Route path="performance" element={<Performance />} />
          <Route path="profile" element={<Profile />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
      {!isFooter && <Footer />}
    </div>
  );
}
export default App;
