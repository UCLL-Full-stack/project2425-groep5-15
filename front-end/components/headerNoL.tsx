import Link from 'next/link';
import { useEffect, useState } from "react";
import { User } from '@types';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const parsedUser: User = JSON.parse(user);
      setLoggedInUser(parsedUser);
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        Cinematic
      </a>
      <nav className="nav justify-content-center align-items-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>
        <Link href="/movies" className="nav-link px-4 fs-5 text-white">
          Movies
        </Link>
        <Link href="/shows" className="nav-link px-4 fs-5 text-white">
          Shows
        </Link>
        {!loggedInUser && (
          <Link
            href="/login" className="nav-link px-4 fs-5 text-white"
          >
            Login
          </Link>
        )}
        {loggedInUser && (
          <>
            <span className="nav-link px-4 fs-5 text-white">
              Welcome, {loggedInUser?.fullname?.split(' ')[0]}
            </span>
            <a
              href="/login"
              onClick={handleClick} className="nav-link px-4 fs-5 text-white"
            >
              Logout
            </a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;