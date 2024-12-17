import Link from 'next/link';
import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import Language from './language/Language';
import { User } from '@types';

const Header: React.FC = () => {
  const { t } = useTranslation('common');
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
        {t('app.title')}
      </a>
      <nav className="nav justify-content-center align-items-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          {t('header.home')}
        </Link>
        <Link href="/movies" className="nav-link px-4 fs-5 text-white">
          {t('header.movies')}
        </Link>
        <Link href="/shows" className="nav-link px-4 fs-5 text-white">
          {t('header.shows')}
        </Link>
        {!loggedInUser && (
          <Link
            href="/login" className="nav-link px-4 fs-5 text-white"
          >
            {t('header.login')}
          </Link>
        )}
        {loggedInUser && (
          <>
            <span className="nav-link px-4 fs-5 text-white">
              {t('header.welcome')}{loggedInUser.firstName}
            </span>
            <a
              href="/login"
              onClick={handleClick} className="nav-link px-4 fs-5 text-white"
            >
              {t('header.logout')}
            </a>
          </>
        )}
        <Language />
      </nav>
    </header>
  );
};



export default Header;