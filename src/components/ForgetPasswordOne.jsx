import React from 'react';
import styles from '../assets/styles/components/ResetPassword.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';

const ForgetPasswordOne = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	
	const handleChangeEmail = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setEmail(value);
	};
	
	const displayCancel = () => {
		swal({
			title: 'ATENCIÓN!',
			text: 'Desea cancelar la restauracion?',
			icon: 'warning',
			buttons: ['NO', 'SI'],
		}).then((response) => {
			if (response) {
				swal({
					title: 'Restauracion cancelada',
					text: 'Al cancelar la operacion tu contraseña seguira siendo la misma',
					icon: 'success',
					buttons: 'aceptar',
				}).then(() => {
					navigate('/');
				});
			}
		});
	};

	const buttonSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.post(`/auth/olvide-password`, { email });
			console.log(data);
			swal({
				title: 'Operacion completada',
				text: data.message,
				icon: 'success',
				buttons: 'Aceptar',
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<button onClick={displayCancel} className={styles.cancelar}>
					Cancelar
				</button>

				<div className={styles.contentStepOne}>
					<h4 className={styles.titulo}>Paso 1</h4>
					<p className={styles.parrafo}>
						Ingresa tu email para enviar una verificacion
					</p>
					<form action="" onSubmit={buttonSubmit}>
						<div className={styles.contentStepOne}>
							<label htmlFor="email" className={styles.email}>
								Email:
							</label>
							<input
								type="text"
								name="email"
								value={email}
								onChange={handleChangeEmail}
								id=""
							/>
						</div>
						<button className={styles.buttonSubmit} type="submit">
							Enviar
						</button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default ForgetPasswordOne;
