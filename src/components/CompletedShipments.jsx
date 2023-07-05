import React from 'react';
import styles from '../assets/styles/components/CompletedShipments.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

import CardCompletedShipments from '../components/CardCompletedShipments';
const CompletedShipments = () => {
	const [deliveryRealized, setDeliveryRealized] = useState();
	const getAllDeliveryRealized = async () => {
		try {
			const { data } = await axios.get(`/shipment/realized`);
			setDeliveryRealized(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllDeliveryRealized();
	}, []);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Envios Realizados</h2>
			{deliveryRealized && deliveryRealized.length !== 0 ? (
				<div className={styles.cardsShipments}>
					{deliveryRealized.map(
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
								<CardCompletedShipments
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

export default CompletedShipments;
