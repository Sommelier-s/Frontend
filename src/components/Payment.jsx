import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import CardBuyPayment from './CardBuyPayment';
import axios from 'axios';
import styles from '../assets/styles/components/Payment.module.css';
import { updateCartEmptyStatus, removeFromCart } from '../redux/actions';
import { useNavigate } from 'react-router-dom';


function Payment(props) {
	const desarrolloApp = 'http://localhost:3001';

	const [stripePromise, setStripePromise] = useState(null);
	const [clientSecret, setClientSecret] = useState('');

	const cart = useSelector((state) => state.cart);
	const amount = useSelector((state) => state.amount);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getPublishKey = async () => {
		try {
			const { data } = await axios.get(`/payment/config`);
			setStripePromise(loadStripe(data.data));
		} catch (error) {
			console.log(
				`status: ${error.response.status} message: ${error.response.error}`,
			);
		}
	};

	const createPurchase = async () => {
		try {
			const { data } = await axios.post(`/payment`, { amount });
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

	const handleCancelBuy = (event) => {
		event.preventDefault();
		dispatch(updateCartEmptyStatus(true));
		cart.forEach((product) => {
			dispatch(removeFromCart(product.id));
		});
		navigate('/');
	};
	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<div className={styles.contentCancel}>
					<h2 className={styles.titleCancel}>
						Para cancelar la compra presione{' '}
					</h2>
					<button onClick={handleCancelBuy} className={styles.button}>
						Aquí
					</button>
				</div>
				<div className={styles.contentPayment}>
					{stripePromise && clientSecret && (
						<Elements stripe={stripePromise} options={{ clientSecret }}>
							<CheckoutForm />
						</Elements>
					)}
				</div>
				<div className={styles.contentCart}>
					{cart.length != 0 ? (
						cart.map((product) => {
							return (
								<CardBuyPayment
									id={product.id}
									key={product.id}
									name={product.name}
									picture={product.picture}
									quantity={product.quantity}
									price={product.price}
								/>
							);
						})
					) : (
						<p>No hay productos en el carrito</p>
					)}

					<div className={styles.contentAmount}>
						<p className={styles.subTotal}>
							Subtotal= $ <span>{amount}</span>{' '}
						</p>

						<h3 className={styles.total}>
							Total= $ <span>{amount}</span>{' '}
						</h3>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Payment;
