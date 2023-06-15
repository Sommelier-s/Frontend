import React from 'react';

import styles from '../assets/styles/components/views/Detail.module.css';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Detail = () => {

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
		displayFailedMessage('Este es el error');
	};
	const mostrarMensajeSuccess = (event) => {
		event.preventDefault();
		displaySuccessMessage('Este es el exito para pedro');
	};

	return (
		<div>
			<button onClick={mostrarMensajeFailed}> Failed </button>
			
			<button onClick={mostrarMensajeSuccess}> Success </button>
			<ToastContainer />
		</div>
	);
};

export default Detail;
