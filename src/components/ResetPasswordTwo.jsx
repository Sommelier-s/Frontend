import React from 'react';
import styles from '../assets/styles/components/ResetPassword.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
const ResetPasswordOne = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [password, setPassword] = useState('');

	const handleChangePassword = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setPassword(value);
	};

	const { id } = useParams();

	const displaySuccessReset = (message) => {
		swal({
			title: 'Operacion exitosa',
			text: message,
			icon: 'success',
			buttons: 'Aceptar',
		}).then((response) => {
			if (response) {
				navigate('/');
			}
		});
	};

	const handleResetPassword = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.post(`/auth/olvide-password/${id}`, {
				password,
			});
			console.log(data);
			displaySuccessReset(data.message);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<div className={styles.contentStepTwo}>
					<h4 className={styles.titulo}>Paso 2</h4>
					<p className={styles.parrafo}>Ingresa tu nueva contraseña</p>
					<form action="" onSubmit={handleResetPassword}>
						<div className={styles.contentStepOne}>
							<label htmlFor="password" className={styles.email}>
								Password:
							</label>
							<input
								type="text"
								name="password"
								value={password}
								onChange={handleChangePassword}
								id=""
							/>
						</div>
						<button className={styles.botonEnviar} type="submit">
							Confirmar
						</button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default ResetPasswordOne;
