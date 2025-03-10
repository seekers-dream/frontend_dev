import { Route, Routes } from 'react-router-dom';
import { Home, Login, Overview, Register } from './pages';
import ProtectedRoute from './layout/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
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
  );
}
export default App;
