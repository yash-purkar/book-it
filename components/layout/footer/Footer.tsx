import React from "react";
import styles from "./footer.module.css";
export const Footer = () => {
  return (
    <footer className={`${styles.footer} py-1`}>
      <p className="text-center mt-1">
        Book IT - 2023-24,| © No copyright feel free to
        replicate |  <span>(Created by <a href="https://www.linkedin.com/in/yash-purkar-32a67925a/" target="_blank">Yash</a> )</span> 
      </p>
    </footer>
  );
};
