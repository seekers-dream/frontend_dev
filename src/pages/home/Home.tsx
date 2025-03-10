import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      Welcome Home
      <p>
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
