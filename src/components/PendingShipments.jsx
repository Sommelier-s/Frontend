import React from 'react';
import styles from '../assets/styles/components/PendingShipments.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
const PendingShipments = () => {
	const [deliveryPending, setDeliveryPending] = useState();
	const getAllDeliveryPending = async () => {
		try {
			const { data } = await axios.get(`/delivery/pending`);
			setDeliveryPending(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAllDeliveryPending();
	}, []);

	return (
		<div className={styles.container}>
			<h2>Este es envios pendientes</h2>
			<h1>{deliveryPending[0]?.name}</h1>
		</div>
	);
};

export default PendingShipments;
