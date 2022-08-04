import React from 'react';
import Head from 'next/head';
import { Header } from '../Header';
import Footer from '../Footer';
import styles from '../../../styles/Home.module.css';

const Layout = ({ children, ...props }: { children: React.ReactNode }) => {
  const title = '';
  const description = '';
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  //useEffect(() => {}, [props]);
  console.log(props);

  return (
    <div className={styles.containerFluid} data-testid="heading">
      <Head>
        <title>{title ? title : 'MAGENTO PWA'}</title>
        <meta name="description" content={description ? description : 'Generated by create next app'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
