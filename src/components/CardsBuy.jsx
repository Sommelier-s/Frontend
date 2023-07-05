import React from 'react';
import CardBuy from './CardBuy';
import styles from '../assets/styles/components/CardsBuy.module.css';

const CardsBuy = ({ allDrinks }) => {
	return (
		<div>
			<div className={styles.content}>
				{allDrinks.length !== 0 ? (
					allDrinks.map(
						({
							id,
							name,
							description,
							price,
							picture,
							graduation,
							stock,
							isActive,
						}) => {
							if (isActive) {
								return (
									<CardBuy
										key={id}
										id={id}
										name={name}
										picture={picture}
										price={price}
										description={description}
										graduation={graduation}
										stock={stock}
									/>
								);
							}
						},
					)
				) : (
					<h1 className={styles.notContent}>No hay bebidas...</h1>
				)}
			</div>
		</div>
	);
};

export default CardsBuy;
