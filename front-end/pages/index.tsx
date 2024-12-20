import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@styles/home.module.css';
import Header from '@components/header';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
        <meta name="viewport" content={t('home.viewport')} />
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
          <h1>{t('home.header')}</h1>
        </span>

        <div className={styles.description}>
          <p>
            {t('home.subheader')}
          </p>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Home;