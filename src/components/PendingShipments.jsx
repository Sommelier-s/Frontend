import React from 'react';
import styles from '../assets/styles/components/PendingShipments.module.css';
import axios from 'axios';
import CardPendingShipments from './CardPendingShipments';
import { useState, useEffect } from 'react';
const PendingShipments = () => {
	const [deliveryPending, setDeliveryPending] = useState();
	const getAllDeliveryPending = async () => {
		try {
			const { data } = await axios.get(`/shipment/pending`);
			setDeliveryPending(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAllDeliveryPending();
	}, []);
	console.log(deliveryPending);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Envios Pendientes</h2>
			{deliveryPending && deliveryPending.length !== 0 ? (
				<div className={styles.cardsShipments}>
					{deliveryPending.map(
						({
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
							return (
								<CardPendingShipments
									key={id}
									id={id}
									user_id={user_id}
									amount={amount}
									address={address}
									apartment={apartment}
									cart={cart}
									city={city}
									instructions={instructions}
									name={name}
									number={number}
									phone={phone}
									postal_code={postal_code}
									province={province}
								/>
							);
						},
					)}
				</div>
			) : (
				<div className={styles.shipmentNotFound}>
					<span className={styles.loader}></span>
				</div>
			)}
		</div>
	);
};

export default PendingShipments;
