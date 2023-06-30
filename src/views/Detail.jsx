import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllDrinks, addToCart, updateAmount } from '../redux/actions';
import swal from 'sweetalert';
import { Rating } from '@mui/material';

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

const Detail = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const [rating, setRating] = useState(3);

	const [info, setInfo] = useState()




	const previousPath = location?.state?.from || '/home';

	const [drink, setDrink] = useState();

	const desarrolloApp = 'http://localhost:3001';

	const { id } = useParams();
	
	
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
	const addToCartHandler = () => {
		if (isStockAvailable(drink.id)) {
			dispatch(addToCart(drink));
			return displaySuccessMessage('Producto agregado');
		}
		displayFailedMessage('No puede agregar mas del stock disponible');
	};
	
	//Manejador para agregar al carro e ir a payment
	const addToCartHandlerBuy = () => {
		if (isStockAvailable(drink.id)) {
			dispatch(addToCart(drink));
			dispatch(updateAmount(amount + drink.price));
			navigate(`/payment/${user.id}`);
		}
		displayFailedMessage(
			'No puede comprar mas del stock disponible, revisa el carrito',
		);
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
		const getRatingsByProduct = async () => {
			try {
				const {data} = await axios.get(`/rating/product/${id}`)
				console.log(data.data)
				setInfo(data.data)
				
			} catch (error) {
				console.log(error.error);
				
			}
		}
		
		
		useEffect(() => {
			searchDrink();
			getRatingsByProduct()
			
		}, []);
		
		console.log(info);
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
		<div className={styles.container}>
			<main className={styles.content}>
				<div className={styles.contentTitle}>
					<div className={styles.contentIconReturn} onClick={handleBack}>
						<img
							src="https://icongr.am/clarity/undo.svg?size=147&color=ffffff"
							alt=""
							title="Volver atras"
						/>
					</div>

					<h3 className={styles.title}>Detalles del Producto</h3>
				</div>

				{drink ? (
					<>
						<div className={styles.containerDetail}>
							<div className={styles.contentImage}>
								<img src={drink.picture} alt={drink.name} />
							</div>

							<div className={styles.contentText}>
								<div className={styles.boxText}>
									<h1 className={styles.name}>{drink.name}</h1>
									<div className={styles.boxDescriptionProduct}>
										{drink.wine_category?.name ? (
											<h2 className={styles.category}>
												Categoria:{' '}
												<span className={styles.span}>
													{' '}
													{drink.wine_category?.name}{' '}
												</span>
											</h2>
										) : (
											<h2 className={styles.category}>
												Categoria:{' '}
												<span className={styles.span}>
													{' '}
													{drink.liquor_category?.name}
												</span>
											</h2>
										)}
										<div className={styles.boxDescription}>
											<h2 className={styles.description}>
												Descripción:{' '}
												<span className={styles.span}>
													{' '}
													{drink.description}
												</span>{' '}
											</h2>
										</div>

										<h2 className={styles.stock}>
											Cantidad:{' '}
											<span className={styles.span}>{drink.stock}</span>{' '}
										</h2>
										{drink.graduation && (
											<h2 className={styles.graduation}>
												Graduación:{' '}
												<span className={styles.span}> {drink.graduation}</span>
											</h2>
										)}

										<h1 className={styles.price}>
											Precio:{' '}
											<span className={styles.span}> ${drink.price}</span>{' '}
										</h1>
									</div>
								</div>
								<div className={styles.boxButton}>
									{drink.stock !== 0 && user.id && (
										<button
											className={styles.button}
											onClick={addToCartHandler}
										>
											Agregar
										</button>
									)}

									{drink.stock !== 0 && displayButtonBuy()}
									{drink.stock == 0 && (
										<h3 className={styles.stockEmpty}>
											Este producto no tiene Stock
										</h3>
									)}
								</div>
							</div>
						</div>
					</>
				) : (
					<div className={styles.productNotFound}>
						<span className={styles.loader}></span>
					</div>
				)}
				{drink && (
					<div className={styles.contentRating}>
						<h1 className={styles.titleComent}>Comentarios y puntuaciones</h1>

						{info ? info.map((data) => {

						return( <div className={styles.boxRating}>
							<Rating
								name="product-rating"
								value={data.puntuation}
								className={styles.rating}
								// onChange={(event, value) => handleRatingChange(value)}
								size="large"
							/>

							<p className={styles.comment}>
								{data.comment}
							</p>
						</div>)
						}): (
							<p className={styles.comment}>'No Tiene Comentario este Producto'</p>)} 
						
					</div>
				)}
			</main>

			<ToastContainer />
		</div>
	);
};

export default Detail;
