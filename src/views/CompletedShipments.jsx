import React from 'react';
import styles from '../assets/styles/components/CompletedShipments.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
const CompletedShipments = () => {
	const [deliveryRealized, setDeliveryRealized] = useState();
	const getAllDeliveryRealized = async () => {
		try {
			const { data } = await axios.get(`/delivery/realized`);
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
			<h2>Envios realizados</h2>
			<h1>{deliveryRealized[0]?.name}</h1>
		</div>
	);
};

export default CompletedShipments;
