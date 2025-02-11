import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import TermOfUse from './components/TermOfUse';
import { Route, Routes } from 'react-router-dom';
import Protected from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/term-of-use" element={<TermOfUse />} />
      <Route path="*" element={<Login />} />
      <Route element={<Protected />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
export default App;
