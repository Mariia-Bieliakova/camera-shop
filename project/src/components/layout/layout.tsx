import { ReactNode } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';

type LayoutProps = {
  children: ReactNode;
}

function Layout ({children}: LayoutProps):JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
