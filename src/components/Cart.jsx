import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	removeFromCart,
	updateQuantity,
	updateCartEmptyStatus,
	updateAmount,
} from '../redux/actions';

import swal from 'sweetalert';
import { useState } from 'react';
//Importación de estilos
import styles from '../assets/styles/components/Cart.module.css';
import axios from 'axios';

const Cart = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const location = useLocation();

	const displaySweetAlert = (mensaje, tipo) => {
		swal({
			text: `${mensaje}`,
			icon: `${tipo}`,
			buttons: 'aceptar',
		});
	};

	const handleRemoveFromCart = (productId) => {
		// Obtener la URL completa
		const fullUrl = `${location.origin}${location.pathname}${location.search}${location.hash}`;
		if (fullUrl.toLocaleLowerCase().includes('payment')) {
			return displaySweetAlert('Use el boton cancelar compra', 'warning');
		}
		dispatch(removeFromCart(productId));
		if (cart.length === 1) {
			dispatch(updateCartEmptyStatus(true));
		}
	};

	const handleUpdateQuantity = (productId, quantity, stock) => {
		// Obtener la URL completa
		const fullUrl = `${location.origin}${location.pathname}${location.search}${location.hash}`;
		if (fullUrl.toLocaleLowerCase().includes('payment')) {
			return displaySweetAlert('Use el boton cancelar compra', 'warning');
		}
		if (quantity <= stock) {
			dispatch(updateQuantity(productId, quantity));
		}
	};

	const handleRemoveOneFromCart = (productId, quantity) => {
		// Obtener la URL completa
		const fullUrl = `${location.origin}${location.pathname}${location.search}${location.hash}`;
		if (fullUrl.toLocaleLowerCase().includes('payment')) {
			return displaySweetAlert('Use el boton cancelar compra', 'warning');
		}
		if (quantity > 1) {
			dispatch(updateQuantity(productId, quantity - 1));
		}
	};

	const [id_Cart, setId_Cart] = useState('');

	const thereIsACart = async () => {
		try {
			const { data } = await axios.get(`/cart/?id=${user.id}`);
			setId_Cart(data.data.id);
		} catch (error) {
			
		}
	};

	const emptyCartFromBackend = async () => {
		try {
			const { data } = await axios.delete(`/cart/?id=${id_Cart}`);
		} catch (error) {			
		}
	};

	useEffect(() => {
		thereIsACart();
	}, []);

	const handleEmptyCart = () => {
		thereIsACart();
		// Obtener la URL completa
		const fullUrl = `${location.origin}${location.pathname}${location.search}${location.hash}`;
		if (fullUrl.toLocaleLowerCase().includes('payment')) {
			return displaySweetAlert('Use el boton cancelar compra', 'warning');
		}

		if (id_Cart !== '') {
			emptyCartFromBackend();
		}

		dispatch(updateCartEmptyStatus(true));
		cart.forEach((product) => {
			dispatch(removeFromCart(product.id));
		});
	};

	const hadleBuyCart = (event) => {
		event.preventDefault();
		if (user.id && !user.isAdmin) {
			return navigate(`/payment/${user.id}`);
		}
		if (user.isAdmin) {
			return displaySweetAlert('El administrador no puede comprar', 'error');
		}
		return notAllowed();
	};

	const notAllowed = () => {
		swal({
			title: 'Usuario No registrado',
			icon: 'error',
			text: 'No podés realizar la compra hasta tener una cuenta',
			buttons: 'aceptar',
		});
		navigate('/login');
	};

	const calculateTotal = () => {
		let total = 0;
		cart.forEach((product) => {
			total += product.price * product.quantity;
		});
		dispatch(updateAmount(total));
		return total;
	};

	const cartQuantity = cart.reduce(
		(total, product) => total + product.quantity,
		0,
	);

	return (
		<div
			className={
				cart.length > 0 ? `${styles.container}` : `${styles.containerEmpty}`
			}
		>
			<div>
				<div className={styles.cartContainer}>
					{cart.length > 0 ? (
						cart.map((product) => (
							<div key={product.id} className={styles.productContainer}>
								<div className={styles.contentImage}>
									<img src={product.picture} alt={product.name} />
								</div>
								<div className={styles.contentText}>
									<h3 className={styles.name}>{product.name}</h3>
									<p className={styles.price}>
										Valor unitario: {product.price}
									</p>

									<div className={styles.productDetails}>
										<div className={styles.quantity}>
											<button
												className={styles.quantityButton}
												onClick={() =>
													handleRemoveOneFromCart(product.id, product.quantity)
												}
											>
												-
											</button>
											<p>{product.quantity}</p>

											<button
												className={styles.quantityButton}
												onClick={() =>
													handleUpdateQuantity(
														product.id,
														product.quantity + 1,
														product.stock,
													)
												}
												disable={product.quantity >= product.stock}
											>
												+
											</button>
										</div>
									</div>
								</div>
								<div className={styles.contentButtonRemove}>
									{cart.length > 1 ? (
										<button
											onClick={() => handleRemoveFromCart(product.id)}
											className={styles.button}
										>
											{' '}
											X{' '}
										</button>
									) : (
										<div className={styles.notButtonRemove}></div>
									)}
								</div>
							</div>
						))
					) : (
						<div className={styles.cartEmpty}>
							<p className={styles.titleEmpty}>Carro vacío</p>
						</div>
					)}
					<div className={styles.buttonContainer}>
						{cart.length > 0 && (
							<>
								<button
									className={styles.emptyButton}
									onClick={handleEmptyCart}
								>
									Vaciar
								</button>
								<button className={styles.buyButton} onClick={hadleBuyCart}>
									Comprar
								</button>
							</>
						)}
					</div>
				</div>
				<h1 className={styles.total}>Precio Total: ${calculateTotal()}</h1>
			</div>
		</div>
	);
};

export default Cart;
