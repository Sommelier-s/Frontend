import { useEffect, useState } from 'react';
//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import { updateCartEmptyStatus, removeFromCart } from '../redux/actions';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import styles from '../assets/styles/components/Completion.module.css';
function Completion(props) {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [remove, setRemove] = useState(false);

	const handleCancelBuy = () => {
		dispatch(updateCartEmptyStatus(true));
		cart.forEach((product) => {
			dispatch(removeFromCart(product.id));
		});
		navigate('/');
	};


	return (
		<main className={styles.container}>
			<div className={styles.contentInfo}>
				<h2 className={styles.title}>Tu compra fue realizada</h2>
				<p className={styles.text}>Ahora revisa tu correo, te llego la factura</p>
				<span className={styles.note}>¡La necesitaras para retirar del local!</span>
				<button className={styles.button} onClick={handleCancelBuy}>Aceptar</button>
			</div>
		</main>
	);
}

export default Completion;
