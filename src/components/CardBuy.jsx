import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/components/CardBuy.module.css';

const CardBuy = ({ id, name, description, price, picture, variety, stock }) => {
	return (
		<div className={styles.content}>
			<div className={styles.contentImage}>
				<img
					className={styles.imageCard}
					src={picture}
					alt={name}
					title={name}
				/>
			</div>
			<div className={styles.contentText}>
				<Link to={`/detail/${id}`} className={styles.link}>
					<h3 className={styles.item}>
						<span className={styles.spanList}>Name: </span>
						<br />
						{name}
					</h3>
				</Link>
				<p className={styles.temperamentList}>
					<span className={styles.spanList}>Descripcion: </span>
					{description}
				</p>

				<p className={styles.pesoList}>
					{' '}
					<span className={styles.spanList}>Precio: </span>
					{price}
				</p>
			</div>
		</div>
	);
};

export default CardBuy;
