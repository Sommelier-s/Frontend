import React from 'react';
import { useState } from 'react';


import styles from '../assets/styles/components/CardCompletedShipments.module.css';

import CartDetailsShipmentsPending from './CartDetailsShipmentsPending';

const CardCompletedShipments = ({
	id,
	user_id,
	amount,
	address,
	apartment,
	cart,
	city,
	instructions,
	name,
	number,
	phone,
	postal_code,
	province,
}) => {
	
	const [details, setDetails] = useState(false);
	const handleChangeDetails = (event) => {
		event.preventDefault();
		setDetails(!details);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Detalles del envio</h2>
				<div className={styles.detallesDelEnvio}>
					<div className={styles.detallerRapidos}>
						<h3>
							Nombre: <span className={styles.dato}>{name}</span>
						</h3>
						<h3>
							Direccion: <span className={styles.dato}>{address}</span>
						</h3>
						<h3>
							Número: <span className={styles.dato}>{number}</span>
						</h3>
						{apartment != 0 && (
							<h3>
								Piso: <span className={styles.dato}>{apartment}</span>
							</h3>
						)}
						<h3>
							Monto: <span className={styles.dato}>${amount}</span>
						</h3>
						<h3>
							Cantidad de productos:{' '}
							<span className={styles.dato}>{cart.length}</span>{' '}
						</h3>
					</div>
					<div className={styles.detallesEnvio}>
						<h3>
							Provincia: <span className={styles.dato}>{province}</span>
						</h3>
						<h3>
							Ciudad: <span className={styles.dato}>{city}</span>
						</h3>
						<h3>
							Codigo postal: <span className={styles.dato}>{postal_code}</span>
						</h3>
						<h3>
							Telefono: <span className={styles.dato}>{phone}</span>
						</h3>
						<h3>
							Intrucciones: <span className={styles.dato}>{instructions}</span>
						</h3>
					</div>
				</div>
				<button onClick={handleChangeDetails} className={styles.button}>
					{' '}
					{details ? 'ocultar detalles' : 'ver detalles'}{' '}
				</button>
			</div>
			{details && (
				<div className={styles.contentCartDetails}>
					{cart.map(({ id, name, description, picture, price, quantity }) => {
						return (
							<CartDetailsShipmentsPending
								key={id}
								id={id}
								name={name}
								description={description}
								picture={picture}
								price={price}
								quantity={quantity}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default CardCompletedShipments;
