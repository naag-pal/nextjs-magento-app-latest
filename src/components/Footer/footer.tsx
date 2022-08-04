import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="footer-Content">
        <div className="ContentWrapper footer-columns grid grid-cols-2 lg:grid-cols-4">
          <div className={styles.footerColumn}>
            <h3 className={styles.footerColumnTitle}>About</h3>
            <div className={styles.footerColumnContent}>
              <Link className=" footer-columnItem " href="/about-us">
                About Us
              </Link>
              <Link className=" footer-columnItem " href="/contact-us">
                Contact Us
              </Link>
            </div>
          </div>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerColumnTitle}>Additional info</h3>
            <div className={styles.footerColumnContent}>
              <Link className=" footer-columnItem " href="/privacy-policy">
                Privacy Policy
              </Link>
              <Link className=" footer-columnItem " href="/terms-and-conditions">
                Terms of use
              </Link>
              <Link className=" footer-columnItem " href="/privacy-policy">
                Use of Cookies
              </Link>
            </div>
          </div>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerColumnTitle}>Popular categories</h3>
            <div className={styles.footerColumnContent}>
              <Link className="footer-columnItem " href="/foods">
                Foods
              </Link>
              <Link className=" footer-columnItem " href="/personal-care">
                Personal Care
              </Link>
              <Link className=" footer-columnItem " href="/clean-hygiene">
                Clean &amp; Hygiene
              </Link>
              <Link className=" footer-columnItem " href="/stationery">
                Stationery
              </Link>
            </div>
          </div>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerColumnTitle}>Content</h3>
            <div className={styles.footerColumnContent}>
              <Link className="footer-columnItem " href="/blog">
                Blog
              </Link>
              <Link className=" footer-columnItem " href="/brands">
                Brands
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.footerCopy}> Magento Next PWA @ 2022</div>
      </div>
    </footer>
  );
};

export default Footer;
