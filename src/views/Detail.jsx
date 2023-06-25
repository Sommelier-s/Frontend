import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllDrinks, addToCart, updateAmount } from '../redux/actions';
import swal from 'sweetalert';

//Importación de Tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

//Importación del componente cart
import Cart from '../components/Cart';

//Importación logo carrito
import carro from '../assets/img/Carro.png';

//Importación de estilos
import styles from '../assets/styles/components/views/Detail.module.css';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { desarrolloApp } from '../redux/actions';

const Detail = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const previousPath = location?.state?.from || '/home';

	const [drink, setDrink] = useState({});

	//const desarrolloApp = 'http://localhost:3001';

	const { id } = useParams();

	//Estado para la visibilidad del carrrito de compras
	const [isCartVisible, setIsCartVisible] = useState(false);
	//Estado para carrito vacio
	const isCartEmpty = useSelector((state) => state.cart.isCartEmpty);
	const user = useSelector((state) => state && state.user);
	const amount = useSelector((state) => state.amount);

	//Manejador para agregar al carro
	const addToCartHandler = () => {
		dispatch(addToCart(drink));
		displaySuccessMessage('Producto agregado');
	};

	//Manejador para agregar al carro e ir a payment
	const addToCartHandlerBuy = () => {
		dispatch(addToCart(drink));
		dispatch(updateAmount(amount + drink.price));
		navigate(`/payment/${user.id}`);
	};

	const toggleCartVisibility = () => {
		setIsCartVisible(!isCartVisible);
	};

	const searchDrink = async () => {
		try {
			const { data } = await axios.get(
				`${desarrolloApp}/both_drinks/?id=${id}`,
			);
			setDrink(data.data);
		} catch (error) {
			displayFailedMessage('Bebida no encontrada');
			console.log(error.response.error);
		}
	};

	useEffect(() => {
		searchDrink();
	}, []);

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

	const handleBack = () => {
		const from = new URLSearchParams(location.search).get('from');

		if (from === 'buy') {
			navigate('/buy');
		} else {
			navigate('/');
		}
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
			icon:"error",
			text: 'No podés realizar la compra hasta tener una cuenta',
			buttons: 'aceptar',
		});
		navigate('/login');
	};

	return (
		<div>
			{drink ? (
				<>
					<div className={styles.containerDetail}>
						<div className={styles.img}>
							<img src={drink.picture} alt={drink.name} />
						</div>

						<div className={styles.detailsContainer}>
							<div className={styles.details}>
								<h1>{drink.name}</h1>
								{drink.wine_category?.name ? (
									<h2>Categoria: {drink.wine_category?.name}</h2>
								) : (
									<h2>Categoria: {drink.liquor_category?.name}</h2>
								)}
								<div className={styles.description}>
									<h2>Descripción: {drink.description}</h2>
								</div>
								<div>
									<h2>Stock: {drink.stock}</h2>
									{drink.graduation ? (
										<h2>Graduación: {drink.graduation}</h2>
									) : (
										console.log('')
									)}
								</div>
								<h1>Precio: ${drink.price}</h1>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className={styles.dots}>
					<h1>Loading </h1>
					<div className={styles.dot}></div>
					<div className={styles.dot}></div>
					<div className={styles.dot}></div>
				</div>
			)}

			<div className={styles.btn}>
				<button className={styles.button} onClick={addToCartHandler}>
					Agregar
				</button>
				{displayButtonBuy()}
				<button className={styles.button} onClick={handleBack}>
					Volver
				</button>
			</div>

			{/* <div className={styles.cart}>
				<Tippy
					placement={'bottom'}
					offset={[0, 20]}
					delay={200}
					interactive={true}
					content={<Cart />}>
					<img src={carro} alt="carro" />
				</Tippy>
			</div> */}
			<ToastContainer />
		</div>
	);
};

export default Detail;
