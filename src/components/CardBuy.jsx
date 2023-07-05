import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/components/CardBuy.module.css';
import { addToCart, updateAmount } from '../redux/actions';
//Importación de Tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import swal from 'sweetalert';
import { Rating } from '@mui/material';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardBuy = ({
	id,
	name,
	description,
	price,
	picture,
	graduation,
	stock,
	isActive,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//const [drink, setDrink] = useState({});

	const [rating, setRating] = useState(3);

	const handleRatingChange = (value) => {
		setRating(value);
	};

	// Toastify module for success message
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

	//Estado para la visibilidad del carrrito de compras
	const [isCartVisible, setIsCartVisible] = useState(false);
	//Estado para carrito vacio
	const isCartEmpty = useSelector((state) => state.cart.isCartEmpty);
	const user = useSelector((state) => state && state.user);
	const amount = useSelector((state) => state.amount);
	const cart = useSelector((state) => state.cart);

	const isStockAvailable = (id) => {
		let stockAvailable = true;
		for (let i = 0; i < cart.length; i++) {
			if (cart[i].id == id) {
				if (cart[i].quantity + 1 > cart[i].stock) {
					stockAvailable = false;
				}
				i = cart.length;
			}
		}
		return stockAvailable;
	};
	//Manejador para agregar al carro
	const addToCartHandler = (event) => {
		event.preventDefault();
		const drink = { id, name, description, price, picture, graduation, stock };
		if (isStockAvailable(drink.id)) {
			dispatch(addToCart(drink));
			displaySuccessMessage('Producto agregado');
			return;
		}
		displayFailedMessage('No puede agregar mas del stock disponible');
	};

	//Manejador para agregar al carro
	const addToCartHandlerBuy = (event) => {
		event.preventDefault();
		const drink = { id, name, description, price, picture, graduation, stock };
		if (isStockAvailable(drink.id)) {
			dispatch(addToCart(drink));
			dispatch(updateAmount(amount + price));
			navigate(`/payment/${user.id}`);
			return;
		}
		displayFailedMessage(
			'No puede comprar mas del stock disponible, revisa el carrito',
		);
	};

	const toggleCartVisibility = () => {
		setIsCartVisible(!isCartVisible);
	};
	const displayButtonBuy = () => {
		if (!user.id) {
			return (
				<button className={styles.button} onClick={notAllowed}>
					Comprar
				</button>
			);
		}
		if (user.id && !user.isAdmin) {
			return (
				<div className={styles.buyViewQuantity}>
					<Tippy
						placement={'top'}
						offset={[0, 20]}
						delay={200}
						interactive={true}
						content={<span>Con esta opcion solo podrá comprar una unidad</span>}
					>
						<button className={styles.button} onClick={addToCartHandlerBuy}>
							Comprar
						</button>
					</Tippy>
				</div>
			);
		}
		if (user.id && user.isAdmin) {
			return <div></div>;
		}
	};
	const notAllowed = (event) => {
		event.preventDefault();
		swal({
			title: 'Usuario No registrado',
			icon: 'error',
			text: 'No podés realizar la compra hasta tener una cuenta',
			buttons: 'aceptar',
		});
		navigate('/login');
	};
	return (
		<div className={styles.content}>
			<div className={styles.contentImage}>
				<img
					className={styles.imageCard}
					src={picture}
					alt={name}
					title={name}
				/>
			</div>
			<div className={styles.contentText}>
				<div className={styles.textsBox}>
					<h2 className={styles.link}>{name}</h2>

					<p className={styles.price}>
						<span className={styles.spanList}>$</span>
						{price}
					</p>
					<Rating
						name="product-rating"
						value={rating}
						className={styles.rating}
						// onChange={(event, value) => handleRatingChange(value)}
						size="large"
					/>
				</div>
				<div className={styles.contentButton}>
					{stock !== 0 && user.id && (
						<button className={styles.button} onClick={addToCartHandler}>
							Agregar
						</button>
					)}

					{stock !== 0 && displayButtonBuy()}
					<button
						className={styles.button}
						onClick={() => {
							navigate(`/detail/${id}/?from=buy`);
						}}
					>
						Detalles
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default CardBuy;
