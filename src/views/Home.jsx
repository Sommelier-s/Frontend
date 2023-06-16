import React from 'react';

import styles from '../assets/styles/components/views/Home.module.css';
const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>LICOR DEL MES</h1>
      <div className={styles.featuredCard}>
        <img src="https://img.freepik.com/iconos-gratis/botella-vino_318-61391.jpg" alt="Licor del Mes" />
        <div className={styles.featuredCardContent}>
          <h3 className={styles.featuredCardTitle}>Licor de junio</h3>
          <p className={styles.featuredCardDescription}>Descripción del licor del mes</p>
        </div>
      </div>

      <h1 className={styles.title}>LOS MÁS VENDIDOS</h1>
      <div className={styles.carrusel}>
        <div className={styles.carruselItem}>
          <img src="https://img.freepik.com/iconos-gratis/botella-vino_318-61391.jpg" alt="Vino 1" />
          <h3>Vino 1</h3>
          <p>Este es un vino viejo</p>
        </div>
        <div className={styles.carruselItem}>
          <img src="https://img.freepik.com/iconos-gratis/botella-vino_318-61391.jpg" alt="Vino 2" />
          <h3>Vino 2</h3>
          <p>Este es un vino viejo</p>
        </div>
        <div className={styles.carruselItem}>
          <img src="https://img.freepik.com/iconos-gratis/botella-vino_318-61391.jpg" alt="Vino 3" />
          <h3>Vino 3</h3>
          <p>Este es un vino viejo</p>
        </div>
        <div className={styles.carruselItem}>
          <img src="https://img.freepik.com/iconos-gratis/botella-vino_318-61391.jpg" alt="Vino 3" />
          <h3>Vino 4</h3>
          <p>Este es un vino viejo</p>
        </div>
        <div className={styles.carruselItem}>
          <img src="https://img.freepik.com/iconos-gratis/botella-vino_318-61391.jpg" alt="Vino 3" />
          <h3>Vino 5</h3>
          <p>Este es un vino viejo</p>
        </div>
      </div>
    </div>
  )
}

export default Home;
