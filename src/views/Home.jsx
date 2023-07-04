import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getAllWine,
	getAllLiquor,
	getAllDrinks,
	generatedCopyAllDrinks,
	getAllCategoryWine,
	getAllCategoryLiquor,
	generatedUserId,
	updateAmount,
	updateCartFromLocalStorage,
	saveProductMonth,
} from '../redux/actions';

// Importación de componentes
import CardsContainerWine from '../components/CardsContainerWine';
import CardsContainerLiquor from '../components/CardsContainerLiquor';
import CardsContainerOffers from '../components/CardsContainerOffers';
import Footer from '../components/Footer';
import axios from 'axios';

//Importación de estilos
import styles from '../assets/styles/components/views/Home.module.css';

//Importación de imagenes
import calidad from '../assets/img/Calidad.png';
import atencion from '../assets/img/24_7.png';
import pago from '../assets/img/Pago.png';
import domicilio from '../assets/img/Domicilio.png';

const Home = () => {
	const [selectedIcon, setSelectedIcon] = useState(null);

	const handleIconClick = (icon) => {
		setSelectedIcon(icon === selectedIcon ? null : icon);
	};

	const stateGlobal = useSelector((state) => state.AllDrinks);
	const [cartBack, setCartBack] = useState();
	const user = useSelector((state) => state.user);
	const selectedProductMonth = useSelector((state) => state.selectedProductMonth);

	const thereIsACart = async () => {
		if (user.id) {
			try {
				const { data } = await axios.get(`/cart/?id=${user.id}`);
				setCartBack(data.data);
			} catch (error) {}
		}
		return;
	};

	const cartElementsUpdate = (backup, newCart) => {
		let arrayUpdate = [];

		const sortBackup = backup.sort((a, b) => {
			const idA = a.id.replace(/-/g, ''); // Elimina los guiones del UUID
			const idB = b.id.replace(/-/g, '');

			if (idA < idB) {
				return -1;
			}
			if (idA > idB) {
				return 1;
			}
			return 0;
		});

		const sortNewCart = newCart.sort((a, b) => {
			const idA = a.id.replace(/-/g, ''); // Elimina los guiones del UUID
			const idB = b.id.replace(/-/g, '');

			if (idA < idB) {
				return -1;
			}
			if (idA > idB) {
				return 1;
			}
			return 0;
		});

		for (let i = 0; i < sortBackup.length; i++) {
			for (let j = 0; j < sortNewCart.length; j++) {
				if (sortBackup[i].id === sortNewCart[j].id) {
					sortBackup[i].quantity += sortNewCart[j].quantity;
					if (sortBackup[i].quantity > sortBackup[i].stock) {
						const excedente = sortBackup[i].quantity - sortBackup[i].stock;
						sortBackup[i].quantity = sortBackup[i].quantity - excedente;
					}
					arrayUpdate.push(sortBackup[i]);
					j = sortNewCart.length;
				} else {
					arrayUpdate.push(sortNewCart[j]);

					// console.log('Entro por el else');
					// const searchElement = arrayUpdate.filter(
					// 	(element) => element.id === sortNewCart[j].id,
					// );

					// // console.log('Elemento buscado en arrayUpdate', searchElement);
					// // const searchElementInBackup = sortBackup.filter(
					// // 	(element) => element.id === sortNewCart[j].id,
					// // );

					// console.log('Elemento buscado en sortBackup', sortBackup);

					// if (searchElement.length === 0) {
					// 	console.log('Entro para agregar');
					// 	arrayUpdate.push(sortNewCart[j]);
					// }
				}
			}
		}

		return arrayUpdate;
	};

	// const cartElementsUpdate = (backup, newCart) => {
	// 	let arrayUpdate = [];
	// 	const sortBackup = [...new Set(backup)];

	// 	for (let i = 0; i < sortBackup.length; i++) {
	// 		for (let j = 0; j < newCart.length; j++) {
	// 			if (sortBackup[i].id === newCart[j].id) {
	// 				sortBackup[i].quantity += newCart[j].quantity;
	// 				arrayUpdate.push(sortBackup[i]);
	// 				j = newCart.length;
	// 			} else {
	// 				arrayUpdate.push(sortBackup[j]);
	// 				j = newCart.length;
	// 			}
	// 		}
	// 	}

	// 	return arrayUpdate;
	// };

	const dispatch = useDispatch();

	useEffect(() => {
		thereIsACart();
		dispatch(generatedUserId());
		dispatch(getAllWine());
		dispatch(getAllLiquor());
		dispatch(getAllDrinks());
	}, []);

	useEffect(() => {
		dispatch(generatedCopyAllDrinks());
		dispatch(getAllCategoryWine());
		dispatch(getAllCategoryLiquor());
		
	}, [stateGlobal]);

	useEffect(() => {
		dispatch(saveProductMonth());
		const amount = window.localStorage.getItem('amount');
		if (typeof amount === 'string') {
			dispatch(updateAmount(parseInt(amount)));
		}

		const cart = window.localStorage.getItem('cart');

		if (cart) {
			const cartParseado = JSON.parse(cart);
			if (cartParseado.length != 0) {
				if (cartBack) {
					const cartBackApp = cartElementsUpdate(cartBack.cart, cartParseado);
					const amountBackApp = cartBack.amount + amount;
					dispatch(updateAmount(parseInt(amountBackApp)));
					dispatch(updateCartFromLocalStorage(cartBackApp));
					return;
				}

				dispatch(updateCartFromLocalStorage(cartParseado));
				dispatch(updateAmount(parseInt(amount)));
				return;
			}
		}

		if (cartBack) {
			dispatch(updateCartFromLocalStorage(cartBack.cart));
			dispatch(updateAmount(parseInt(cartBack.amount)));
		}
	}, [!cartBack && cartBack]);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>PRODUCTO DEL MES</h1>
			<br />
			{selectedProductMonth.length !== 0 ? (
				<div className={styles.featuredCard}>
					<img
						src={selectedProductMonth[0].picture}  alt={selectedProductMonth[0].name}
					/>
					<div className={styles.featuredCardContent}>
						<h3 className={styles.featuredCardTitle}>{selectedProductMonth[0].name}</h3>
						<p className={styles.featuredCardDescription}>
							{selectedProductMonth[0].description}
						</p>
						<p className={styles.featuredCardDescription}>
							Cantidad: {selectedProductMonth[0].stock}
						</p>
						<p className={styles.featuredCardDescription}>
							Precio: {selectedProductMonth[0].price}</p>
					</div>
				</div>
			) : (
				<h1>No hay producto del mes</h1>
			)}

			<br />
			<h1 className={styles.title}>VINOS MÁS RECOMENDADOS</h1>

			<div className={styles.contentMoreSales}>
				<CardsContainerWine />
			</div>

			<h1 className={styles.title}>LICORES MÁS RECOMENDADOS</h1>

			<div className={styles.contentMoreSales}>
				<CardsContainerLiquor />
			</div>

			<h1 className={styles.title}>PRODUCTOS EN OFERTA</h1>

			<div>
				<CardsContainerOffers />
			</div>

			<div className={styles.iconContainer}>
				<div
					className={`${styles.iconItem} ${
						selectedIcon === 'calidad' ? styles.iconItemSelected : ''
					}`}
					onClick={() => handleIconClick('calidad')}
				>
					<img src={calidad} alt="calidad" />
					<h3>Legalidad y Calidad</h3>
					{selectedIcon === 'calidad' && (
						<p>
							Nuestra página web garantiza la legalidad y calidad de nuestros
							productos. Trabajamos con proveedores confiables y seleccionamos
							cuidadosamente cada licor para ofrecerte una experiencia segura y
							satisfactoria
						</p>
					)}
				</div>
				<div
					className={`${styles.iconItem} ${
						selectedIcon === 'pago' ? styles.iconItemSelected : ''
					}`}
					onClick={() => handleIconClick('pago')}
				>
					<img src={pago} alt="pago" />
					<h3>Pago online</h3>
					{selectedIcon === 'pago' && (
						<p>
							Puedes disfrutar de la comodidad de realizar tus pagos de
							productos de manera segura y conveniente a través de nuestra web.
							Te ofrecemos un sistema de pago en línea confiable, que garantiza
							la protección de tus datos personales y la seguridad de tus
							transacciones.
						</p>
					)}
				</div>
				<div
					className={`${styles.iconItem} ${
						selectedIcon === 'atencion' ? styles.iconItemSelected : ''
					}`}
					onClick={() => handleIconClick('atencion')}
				>
					<img src={atencion} alt="atencion" />
					<h3>Atención 24/7</h3>
					{selectedIcon === 'atencion' && (
						<p>
							Nuestra web de licores está disponible las 24 horas del día, los 7
							días de la semana, para ofrecerte la máxima comodidad en tus
							compras. Ya sea que desees adquirir tus licores favoritos en la
							madrugada o durante el fin de semana, siempre estaremos
							disponibles para ti.
						</p>
					)}
				</div>
				<div
					className={`${styles.iconItem} ${
						selectedIcon === 'domicilio' ? styles.iconItemSelected : ''
					}`}
					onClick={() => handleIconClick('domicilio')}
				>
					<img src={domicilio} alt="domicilio" />
					<h3>Entrega a domicilio</h3>
					{selectedIcon === 'domicilio' && (
						<p>
							Disfruta de la flexibilidad de realizar tus pedidos en cualquier
							momento y recibirlos en tu puerta sin restricciones horarias. Nos
							adaptamos a tu estilo de vida, brindándote un servicio sin
							interrupciones.
						</p>
					)}
				</div>
			</div>

			<div className={styles.foot}>
				<Footer />
			</div>
		</div>
	);
};

export default Home;
