import React from 'react';
import styles from '../assets/styles/components/CardBuyPayment.module.css';
const CardBuyPayment = ({ name, picture, quantity, price }) => {
	return (
		<div className={styles.content}>
			<div className={styles.contentImage}>
				<img src={picture} alt="" />
			</div>
			<div className={styles.contentText}>
				<h4 className={styles.name}>{name}</h4>
				<h4 className={styles.quantity}>Cantidad: {quantity}</h4>
				<p className={styles.price}>Precio U: {price}</p>
				<p className={styles.monto}>Monto: {price * quantity}</p>
			</div>
		</div>
	);
};

export default CardBuyPayment;
