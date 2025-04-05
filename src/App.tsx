import { Route, Routes, useLocation } from 'react-router-dom';
import { Home, Overview, ResetPassword } from './pages';
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
      {!isAuthPages && <Navbar background="bg-white" />}

      <Routes>
        <Route path="/reset" element={<ResetPassword />} />
        {/* <Route path="/term-of-use" element={<TermOfUse />} /> */}
        <Route path="/" element={<Home />} />
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
