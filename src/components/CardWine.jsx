import React from 'react';
import styles from "../assets/styles/components/Card.module.css";

const CardWine = (props) => {
  return (
    <div className={styles.card}>
      <img src={props.picture} alt={props.name} className={styles.cardImage} />
      <h3 className={styles.cardTitle}>{props.name}</h3>
      <p className={styles.cardVariety}>{props.variety}</p>
    </div>
  );
}

export default CardWine;