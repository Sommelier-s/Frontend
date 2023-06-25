import React from 'react';
import styles from '../assets/styles/components/ResetPassword.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

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
	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<button
					onClick={() => {
						navigate('/');
					}}
				>
					Cancelar
				</button>

				<div>
					{!stepTwo && (
						<div className={styles.contentStepOne}>
							<h4>Paso 1</h4>
							<p>Ingresa tu email para enviar una verificacion</p>
							<div>
								<label htmlFor="email">Email:</label>
								<input
									type="text"
									name="email"
									value={email}
									onChange={handleChangeEmail}
									id=""
								/>
							</div>
							<button>Enviar</button>
						</div>
					)}

					{stepOne && (
						<div className={styles.contentStepTwo}>
							<h4>Paso 2</h4>
							<p>Ingresa tu nueva contraseña</p>
							<div>
								<label htmlFor="password">Password:</label>
								<input
									type="text"
									name="password"
									value={password}
									onChange={handleChangePassword}
									id=""
								/>
							</div>
							<button>Confirmar</button>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default ResetPassword;
