import React from "react";
import styles from './footer.module.css'
export const Footer = () => {
  return (
    <footer className={`${styles.footer} py-1 pt-5`}>
      <p className="text-center mt-1">
        Book IT - 2019-2021, All Rights Reserved
      </p>
    </footer>
  );
};
