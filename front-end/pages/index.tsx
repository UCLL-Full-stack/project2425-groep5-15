import Head from 'next/head';
import Image from 'next/image';
import styles from '@styles/Home.module.css';
import Header from '@components/header';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <Image
            src="/images/logo.jpg"
            alt="Cinematic Logo"
            className={styles.vercelLogo}
            width={100}
            height={100}
          />
          <h1>Welcome!</h1>
        </span>

        <div className={styles.description}>
          <p>
            Welkom bij Cinematic!
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
