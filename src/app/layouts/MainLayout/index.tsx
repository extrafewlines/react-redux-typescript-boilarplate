import { Fragment, ReactNode } from 'react';
import { Header } from 'app/components/Header';
import { Footer } from 'app/components/Footer';

interface MainLayoutProps {
  children: ReactNode | JSX.Element;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};
