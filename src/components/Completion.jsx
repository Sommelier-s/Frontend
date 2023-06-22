import { useEffect, useState } from 'react';
//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Completion(props) {
	const [pageLoading, setPageLoading] = useState(false);
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

	useEffect(() => {
		setPageLoading(true);
	}, []);

	useEffect(() => {
		displaySuccessMessage(
			'Compra exitosa, completa los campos para enviarte a domicilio',
		);
	}, [pageLoading]);

	return (
		<div>
			{alert('Revisa tu correo')}
			<ToastContainer />
		</div>
	);
}

export default Completion;
