import { useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateCartEmptyStatus, removeFromCart } from '../redux/actions';

import swal from 'sweetalert';
import styles from '../assets/styles/components/CheckoutForm.module.css';

export default function CheckoutForm() {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const displaySweetAlert = (mensaje, tipo) => {
		swal({
			text: `${mensaje}`,
			icon: `${tipo}`,
			buttons: 'aceptar',
		});
	};

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

	const handleCancelBuy = () => {
		dispatch(updateCartEmptyStatus(true));
		cart.forEach((product) => {
			dispatch(removeFromCart(product.id));
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsProcessing(true);

		handleCancelBuy();

		try {
			if (homeDelivery === 'true') {
				displaySweetAlert('Revisa tu correo, te llego la boleta', 'success');
				const { error } = await stripe.confirmPayment({
					elements,
					confirmParams: {
						return_url: `${window.location.origin}/`,
					},
					//redirect: 'if_required',
				});
			} else {
				const { error } = await stripe.confirmPayment({
					elements,
					confirmParams: {
						return_url: `${window.location.origin}/shipment`,
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
			<div className={styles.contentOption}>
				<h2 className={styles.title}>Retira en Local?</h2>
				<select className={styles.select} onChange={handleDelivery}>
					<option value="true">Si</option>
					<option value="false">No</option>
				</select>
			</div>

			<button className={styles.button} disabled={isProcessing} id="submit">
				<span id="button-text">
					{isProcessing ? 'Processing ... ' : 'Pay now'}
				</span>
			</button>
		</form>
	);
}
