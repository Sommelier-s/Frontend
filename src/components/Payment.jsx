import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';

import axios from 'axios';

function Payment(props) {
	const desarrolloApp = 'http://localhost:3001';

	const [stripePromise, setStripePromise] = useState(null);
	const [clientSecret, setClientSecret] = useState('');

	const amount = 1;

	const getPublishKey = async () => {
		try {
			const { data } = await axios.get(`${desarrolloApp}/payment/config`);
			setStripePromise(loadStripe(data.data));
		} catch (error) {
			console.log(
				`status: ${error.response.status} message: ${error.response.error}`,
			);
		}
	};

	const createPurchase = async () => {
		try {
			const { data } = await axios.post(`${desarrolloApp}/payment`, { amount });
			setClientSecret(data.data);
		} catch (error) {
			console.log(
				`status: ${error.response.status} message: ${error.response.error}`,
			);
		}
	};

	useEffect(() => {
		getPublishKey();
	}, []);

	useEffect(() => {
		createPurchase();
	}, [stripePromise]);

	return (
		<>
			{stripePromise && clientSecret && (
				<Elements stripe={stripePromise} options={{ clientSecret }}>
					<h1>Completa los campos</h1>

					<CheckoutForm />
				</Elements>
			)}
		</>
	);
}

export default Payment;
