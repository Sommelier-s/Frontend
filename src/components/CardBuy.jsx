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

	//Estado para la visibilidad del carrrito de compras
	const [isCartVisible, setIsCartVisible] = useState(false);
	//Estado para carrito vacio
	const isCartEmpty = useSelector((state) => state.cart.isCartEmpty);
	const user = useSelector((state) => state && state.user);
	const amount = useSelector((state) => state.amount);

	//Manejador para agregar al carro
	const addToCartHandler = (event) => {
		event.preventDefault();
		const drink = { id, name, description, price, picture, stock };
		dispatch(addToCart(drink));
		displaySuccessMessage('Producto agregado');
	};

	//Manejador para agregar al carro
	const addToCartHandlerBuy = (event) => {
		event.preventDefault();
		const drink = { id, name, description, price, picture, stock };
		dispatch(addToCart(drink));
		dispatch(updateAmount(amount + price));
		navigate(`/payment/${user.id}`);
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
						placement={'right'}
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
					{displayButtonBuy()}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default CardBuy;
