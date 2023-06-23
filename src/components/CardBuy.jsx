import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/components/CardBuy.module.css';
import { addToCart } from '../redux/actions';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardBuy = ({ id, name, description, price, picture, variety, stock }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//const [drink, setDrink] = useState({});

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

	const mostrarMensajeFailed = (event) => {
		event.preventDefault();
		displayFailedMessage('Carrito no encontrado');
	};
	const mostrarMensajeSuccess = (event) => {
		event.preventDefault();
		displaySuccessMessage('Vamos a comprar');
	};

	//Estado para la visibilidad del carrrito de compras
	const [isCartVisible, setIsCartVisible] = useState(false);
	//Estado para carrito vacio
	const isCartEmpty = useSelector((state) => state.cart.isCartEmpty)

	//Manejador para agregar al carro
	const addToCartHandler = (event) => {
		event.preventDefault();
		const drink = { id, name, description, price, picture, stock };
		dispatch(addToCart(drink));
	}

	const toggleCartVisibility = () => {
		setIsCartVisible(!isCartVisible);
	}

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
				<Link to={`/detail/${id}/?from=buy`} className={styles.link}>
					{name}
				</Link>
				<p className={styles.variety}>{variety}</p>

				<p className={styles.price}>
					<span className={styles.spanList}>$</span>
					{price}
				</p>
				<div>
					<button className={styles.button} onClick={addToCartHandler}>
						Agregar
					</button>
					<button
						className={styles.button}
						onClick={() => {
							navigate('/payment');
						}}
					>
						Comprar
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default CardBuy;
