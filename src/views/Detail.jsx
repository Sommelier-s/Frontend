import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllDrinks, addToCart } from '../redux/actions';
import Cart from '../components/Cart';

//Importación de estilos
import styles from '../assets/styles/components/views/Detail.module.css';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Detail = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const previousPath = location?.state?.from || '/home';

	const [drink, setDrink] = useState({});

	const desarrolloApp = 'http://localhost:3001';

	const { id } = useParams();

	//Manejador para agregar al carro
	const addToCartHandler = () => {
		dispatch(addToCart(drink));
	}

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

	// const mostrarMensajeFailed = (event) => {
	// 	event.preventDefault();
	// 	displayFailedMessage('Carro no encontrado');
	// };
	
	const mostrarMensajeSuccess = (event) => {
		event.preventDefault();
		displaySuccessMessage('Vamos a comprar');
	};

	const handleBack = () => {
		const from = new URLSearchParams(location.search).get('from');

		if (from === 'home') {
			navigate('/home');
		} else if (from === 'buy') {
			navigate('/buy');
		} else {
			navigate('/');
		}
	};

	return (
		<div>
			{drink ? (
				<>
					<div className={styles.containerDetail}>
						<div className={styles.nameId}>
							<div>
								<h1>Name: {drink.name}</h1>
							</div>
							{/* <div>
								<h1>ID: {drink.id}</h1>
							</div> */}
						</div>
						<hr></hr>
						<div className={styles.img}>
							<img src={drink.picture} alt={drink.name} />
						</div>
						<hr></hr>
						<div>
							<div>
								{drink.wine_category?.name ? (
									<h1>Categoria: {drink.wine_category?.name}</h1>
								) : (
									<h1>Categoria: {drink.liquor_category?.name}</h1>
								)}

								<h1>Price: {drink.price}</h1>
							</div>
						</div>
						<hr></hr>
						<div className={styles.description}>
							<h1>Description: {drink.description}</h1>
						</div>
						<hr></hr>
						<div>
							<div className={styles.stock}>
								<h1>Stock: {drink.stock}</h1>
								{drink.graduation ? (
									<h1>Graduacion: {drink.graduation}</h1>
								) : (
									console.log('')
								)}
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
					{' '}
					Agregar{' '}
				</button>

				<button className={styles.button} onClick={mostrarMensajeSuccess}>
					{' '}
					Comprar{' '}
				</button>
				<button className={styles.button} onClick={handleBack}>
					{' '}
					Volver{' '}
				</button>
			</div>

			<div className={styles.cart}>
				<Cart />
			</div>
			<ToastContainer />
		</div>
	);
};

export default Detail;
