import React from 'react';
import styles from '../assets/styles/components/CartDetailsShipmentsPending.module.css';

const CartDetailsShipmentsPending = ({
	id,
	name,
	description,
	picture,
	price,
	quantity,
}) => {
	return (
		<div className={styles.content}>
			<div className={styles.contentImage}>
				<img src={picture} alt="" />
			</div>
			<div className={styles.contentText}>
				<p>{name}</p>
				<p>{price}</p>
				<p>{quantity}</p>
			</div>
		</div>
	);
};

export default CartDetailsShipmentsPending;
