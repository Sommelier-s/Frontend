import React, { useState } from 'react';

// Importación de componentes
import CardsContainerWine from '../components/CardsContainerWine';
import CardsContainerLiquor from '../components/CardContainesLiquor';
import Footer from '../components/Footer';

//Importación de estilos
import styles from '../assets/styles/components/views/Home.module.css';

//Importación de imagenes
import calidad from "../assets/img/Calidad.png";
import atencion from "../assets/img/24_7.png";
import pago from "../assets/img/Pago.png";
import domicilio from "../assets/img/Domicilio.png";

const Home = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon === selectedIcon ? null : icon);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PRODUCTO DEL MES</h1>
      <br />
      <div className={styles.featuredCard}>
        <img src="https://img.freepik.com/iconos-gratis/botella-vino_318-61391.jpg" alt="Licor del Mes" />
        <div className={styles.featuredCardContent}>
          <h3 className={styles.featuredCardTitle}>Producto de junio</h3>
          <p className={styles.featuredCardDescription}>Descripción del producto del mes</p>
        </div>
      </div>

      <br />
      <h1 className={styles.title}>VINOS MÁS VENDIDOS</h1>
      
      <div>
        <CardsContainerWine />
      </div>

      <h1 className={styles.title}>LICORES MÁS VENDIDOS</h1>

      <div>
        <CardsContainerLiquor />
      </div>

      <div className={styles.iconContainer}>
        <div className={`${styles.iconItem} ${selectedIcon === 'calidad' ? styles.iconItemSelected : ''}`} onClick={() => handleIconClick('calidad')}>
          <img src={calidad} alt="calidad" />
          <h3>Legalidad y Calidad</h3>
          {selectedIcon === 'calidad' && <p>Nuestra página web garantiza la legalidad y calidad de nuestros productos. Trabajamos con proveedores confiables y seleccionamos cuidadosamente cada licor para ofrecerte una experiencia segura y satisfactoria</p>}
        </div>
        <div className={`${styles.iconItem} ${selectedIcon === 'pago' ? styles.iconItemSelected : ''}`} onClick={() => handleIconClick('pago')}>
          <img src={pago} alt="pago" />
          <h3>Pago online</h3>
          {selectedIcon === 'pago' && <p>Puedes disfrutar de la comodidad de realizar tus pagos de productos de manera segura y conveniente a través de nuestra web. Te ofrecemos un sistema de pago en línea confiable, que garantiza la protección de tus datos personales y la seguridad de tus transacciones.</p>}
        </div>
        <div className={`${styles.iconItem} ${selectedIcon === 'atencion' ? styles.iconItemSelected : ''}`} onClick={() => handleIconClick('atencion')}>
          <img src={atencion} alt="atencion" />
          <h3>Atención 24/7</h3>
          {selectedIcon === 'atencion' && <p>Nuestra web de licores está disponible las 24 horas del día, los 7 días de la semana, para ofrecerte la máxima comodidad en tus compras. Ya sea que desees adquirir tus licores favoritos en la madrugada o durante el fin de semana, siempre estaremos disponibles para ti.</p>}
        </div>
        <div className={`${styles.iconItem} ${selectedIcon === 'domicilio' ? styles.iconItemSelected : ''}`} onClick={() => handleIconClick('domicilio')}>
          <img src={domicilio} alt="domicilio" />
          <h3>Entrega a domicilio</h3>
          {selectedIcon === 'domicilio' && <p>Disfruta de la flexibilidad de realizar tus pedidos en cualquier momento y recibirlos en tu puerta sin restricciones horarias. Nos adaptamos a tu estilo de vida, brindándote un servicio sin interrupciones.</p>}
        </div>
      </div>

      <div className={styles.foot}>
        <Footer />
      </div>

    </div>
  )
}

export default Home;
