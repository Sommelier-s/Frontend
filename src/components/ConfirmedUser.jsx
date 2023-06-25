import styles from '../assets/styles/components/ConfirmedUser.module.css';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const ConfirmedUser = () => {
	const navigate = useNavigate();

	const { id } = useParams();

	

	const [message, setMessage] = useState('');

	const getConfirmed = async () => {
		try {
			const { data } = await axios.get(`/auth/confirmar/${id}`);
			setMessage(data.message);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getConfirmed();
	}, []);

	const displayConfimed = () => {
		swal({
			title: 'Cuenta confirmada',
			icon: 'success',
			text: 'Ahora podés Iniciar Sesion',
			buttons: 'Aceptar',
		}).then((response) => {
			navigate('/login');
		});
	};

	return (
		<div className={styles.content}>
			{displayConfimed()}
			{/* <p>{message}</p>
			<Link to='/login'>
				<button>Login</button>
			</Link> */}
		</div>
	);
};

export default ConfirmedUser;
