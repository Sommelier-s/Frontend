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
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm() {
	
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
						return_url: `${window.location.origin}/shipment`,
					},
					//redirect: 'if_required',
				});
			}

			setIsProcessing(false);
		} catch (error) {
			displaySweetAlert('Hubo un error', 'error');
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
			{homeDelivery == 'false' && (
				<div className={styles.notaImportante}>
					<h3>Aviso importante</h3>
					<p>
						El envio a domicilio tiene un monto que no se considera en la
						compra, ese monto lo deberá abonar una vez llegado el producto a su
						domicilio
					</p>
				</div>
			)}

			<button
				className={styles.button}
				disabled={isProcessing}
				
				id="submit"
			>
				<span id="button-text">
					{isProcessing ? 'Procesando pago ... ' : 'Pagar ahora'}
				</span>
			</button>
		</form>
	);
}
