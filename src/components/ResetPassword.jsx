import React from 'react';
import styles from '../assets/styles/components/ResetPassword.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [stepOne, setStepOne] = useState(false);
	const [stepTwo, setStepTwo] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleChangeEmail = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setEmail(value);
	};

	const handleChangePassword = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setPassword(value);
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

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<button onClick={displayCancel} className={styles.cancelar}>
					Cancelar
				</button>

				<div className={styles.steptwo}>
					{!stepTwo && (
						<div className={styles.contentStepOne}>
							<h4 className={styles.titulo}>Paso 1</h4>
							<p className={styles.parrafo}>
								Ingresa tu email para enviar una verificacion
							</p>
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
							<button className={styles.botonEnviar}>Enviar</button>
						</div>
					)}

					{stepOne && (
						<div className={styles.contentStepTwo}>
							<h4 className={styles.titulo}>Paso 2</h4>
							<p className={styles.parrafo}>Ingresa tu nueva contraseña</p>
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
							<button className={styles.botonEnviar}>Confirmar</button>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default ResetPassword;
