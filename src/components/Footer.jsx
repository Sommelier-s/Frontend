import React from 'react';

//Importación de imagenes
import facebook from "../assets/img/Facebook_BN.png";
import facebookColor from "../assets/img/Facebook_Color.png";
import instagram from "../assets/img/Instagram_BN.png";
import instagramColor from "../assets/img/Instagram_Color.png";
import twitter from "../assets/img/Twitter_BN.png";
import twitterColor from "../assets/img/Twitter_Color.png";
import whatsapp from "../assets/img/Whatsapp_BN.png";
import whatsappColor from "../assets/img/Whatsapp_Color.png";

//Importación de estilos
import styles from "../assets/styles/components/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
         <div className={styles.social}>
        <a href="https://facebook.com">
          <img src={facebook} alt="Facebook" className={styles.socialIcon} />
          <img src={facebookColor} alt="Facebook_Color" className={styles.socialIconHover} />
        </a>
        <a href="https://instagram.com">
          <img src={instagram} alt="Instagram" className={styles.socialIcon} />
          <img src={instagramColor} alt="Instagram_Color" className={styles.socialIconHover} />
        </a>
        <a href="https://twitter.com">
          <img src={twitter} alt="Twitter" className={styles.socialIcon} />
          <img src={twitterColor} alt="Twitter_Color" className={styles.socialIconHover} />
        </a>
        
      </div>
        <div className={styles.contact}>
          <h2>Contáctanos</h2>
          <p>Email: sommeliersproject@gmail.com</p>
          <p>Dirección: Cr. 48 #21-16</p>
        </div>
    </footer>
  )
}

export default Footer;
