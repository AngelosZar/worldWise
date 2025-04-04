import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import PageNav from './PageNav';

function Layout({ children }) {
  return (
    <>
      <PageNav />
      <main> {children}</main>
      <Footer />
    </>
  );
}
Layout.propTypes = {
  children: PropTypes.node,
};
// export default Layout;
