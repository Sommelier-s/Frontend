import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/components/CardBuy.module.css';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardBuy = ({ id, name, description, price, picture, variety, stock }) => {
	const navigate = useNavigate();

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
					<button className={styles.button} onClick={mostrarMensajeFailed}>
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
