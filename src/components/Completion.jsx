import { useEffect, useState } from 'react';
//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import { updateCartEmptyStatus, removeFromCart } from '../redux/actions';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import styles from '../assets/styles/components/Completion.module.css';
import axios from 'axios';
function Completion(props) {
	const cart = useSelector((state) => state.cart);
	const [backupCart, setBackupCart] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [remove, setRemove] = useState(false);
	const user = useSelector((state) => state.user);

	/*Obtenemos la fecha actual de la compra */
	// Obtener la fecha actual
	const fechaActual = new Date();
	// Obtener el día, mes y año de la fecha actual
	const dia = fechaActual.getDate();
	const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
	const año = fechaActual.getFullYear();
	const fechaFormateada = año + '-' + mes + '-' + dia;

	useEffect(() => {
		const cart = window.localStorage.getItem('cart');
		if (cart) {
			const cartParseado = JSON.parse(cart);
			if (cartParseado.length != 0) {
				setBackupCart(cartParseado);
			}
		}
	}, []);

	// useEffect(() => {

	// }, [backupCart]);

	const updateStockProducts = () => {
		backupCart.map(async ({ id, quantity, graduation }) => {
			console.log(graduation);
			if (!graduation) {
				try {
					const { data } = await axios.put(`/wine/stock/${id}`, { quantity });
				} catch (error) {
					console.log('No se puede actualizar el stock');
				}
			} else {
				try {
					const { data } = await axios.put(`/liquor/stock/${id}`, { quantity });
				} catch (error) {
					console.log('No se puede actualizar el stock');
				}
			}
		});
	};

	const loadSale = () => {
		backupCart.map(async ({ id, quantity, price }) => {
			const saleCompleted = {
				clientId: user.id,
				date: fechaFormateada,
				productId: id,
				quantity: quantity,
				amount: price * quantity,
			};

			try {
				const { data } = await axios.post(`/sale`, saleCompleted);
			} catch (error) {
				console.log('No se puedo cargar la venta');
			}
		});
	};

	const loadPurchasedProducts = () => {
		backupCart.map(async ({ id }) => {
			const purchasedProduct = {
				clientId: user.id,
				productId: id,
			};
			try {
				const { data } = await axios.post(`/purchased`, purchasedProduct);
			} catch (error) {
				console.log('No se puede cargar el producto comprado');
			}
		});
	};

	const handleCancelBuy = (event) => {
		event.preventDefault();
		updateStockProducts();
		loadSale();
		loadPurchasedProducts();
		dispatch(updateCartEmptyStatus(true));
		cart.forEach((product) => {
			dispatch(removeFromCart(product.id));
		});
		navigate('/');
	};

	//
	return (
		<main className={styles.container}>
			<div className={styles.contentInfo}>
				<h2 className={styles.title}>Tu compra fue realizada</h2>
				<p className={styles.text}>
					Ahora revisa tu correo, te llego la factura
				</p>
				<span className={styles.note}>
					¡La necesitaras para retirar del local!
				</span>
				<button className={styles.button} onClick={handleCancelBuy}>
					Aceptar
				</button>
			</div>
		</main>
	);
}

export default Completion;
