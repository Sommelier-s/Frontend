import React from 'react';
import CardsContainerWine from '../components/CardsContainerWine';
import CardsContainerLiquor from '../components/CardContainesLiquor';
import styles from '../assets/styles/components/views/Home.module.css';
import calidad from "../assets/img/Calidad.png";
import atencion from "../assets/img/24_7.png";
import pago from "../assets/img/Pago.png";
import domicilio from "../assets/img/Domicilio.png";

const Home = () => {
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
        <div className={styles.iconItem}>
          <img src={calidad} alt="calidad" />
          <h3>Legalidad y Calidad</h3>
          <p>Productos confiables</p>
        </div>
        <div className={styles.iconItem}>
          <img src={pago} alt="pago" />
          <h3>Pago online</h3>
          <p>Pagos protegidos y seguros</p>
        </div>
        <div className={styles.iconItem}>
          <img src={atencion} alt="atencion" />
          <h3>Atención 24/7</h3>
          <p>Compra tus productos a cualquier hora</p>
        </div>
        <div className={styles.iconItem}>
        <img src={domicilio} alt="domicilio" />
          <h3>Entrega a domicilio</h3>
          <p>Llevamos tu pedido a tu casa</p>
        </div>
      </div>

    </div>
  )
}

export default Home;
