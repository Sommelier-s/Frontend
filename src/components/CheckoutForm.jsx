import { useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CheckoutForm() {
	//Toastify module for success message
	const displaySuccessMessage = (mensaje) => {
		toast.success(mensaje, {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	// Toastify module for error messages
	const displayFailedMessage = (mensaje) => {
		toast.error(mensaje, {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	const stripe = useStripe();
	const elements = useElements();

	const [homeDelivery, setHomeDelivery] = useState('true');

	const [message, setMessage] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const handleDelivery = (event) => {
		const option = event.target.value;
		setHomeDelivery(option);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsProcessing(true);

		try {
			
			if (homeDelivery === 'true') {
				const { error } = await stripe.confirmPayment({
					elements,
					confirmParams: {
						return_url: `${window.location.origin}/completion`,
					},
					//redirect: 'if_required',
				});
			} else {
				const { error } = await stripe.confirmPayment({
					elements,
					confirmParams: {
						return_url: `${window.location.origin}/home`,
					},
					//redirect: 'if_required',
				});
			}

			setIsProcessing(false);
		} catch (error) {
			displayFailedMessage('Hubo un error');
		}
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement />
			<h2 styles="color: white">Retira en Local?</h2>
			<select onChange={handleDelivery}>
				<option value="true">Si</option>
				<option value="false">No</option>
			</select>
			<button disabled={isProcessing} id="submit">
				<span id="button-text">
					{isProcessing ? 'Processing ... ' : 'Pay now'}
				</span>
			</button>
		</form>
	);
}
