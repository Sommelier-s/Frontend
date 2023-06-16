import React from 'react';
import CardsContainerWine from '../components/CardsContainerWine';
import CardsContainerLiquor from '../components/CardContainesLiquor';

import styles from '../assets/styles/components/views/Home.module.css';
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

    </div>
  )
}

export default Home;
