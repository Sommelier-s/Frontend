import React from 'react';
import { Link } from 'react-router-dom';

//Importación de estilos
import styles from "../assets/styles/components/Card.module.css";

const CardWine = (props) => {
  return (
    <div className={styles.card}>
      <Link to={`/detail/${props.id}/?from=home`} className={styles.cardLink}>
      <img src={props.picture} alt={props.name} className={styles.cardImage} />
      <h3 className={styles.cardTitle}>{props.name}</h3>
      <p className={styles.cardPrice}>${props.price}</p>
      </Link>
    </div>
  );
}

export default CardWine;