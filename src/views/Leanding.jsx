import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { generatedUserId } from '../redux/actions';

import styles from '../assets/styles/components/views/Leanding.module.css';
const Leanding = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const Login = async (event) => {
		event.preventDefault();
		navigate('/home');
	};

	useEffect(() => {
		dispatch(generatedUserId());
	});

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.titleMain}>Bienvenido a Sommelier's</h1>

				<button className={styles.cssbuttonsIoButton} onClick={Login}>
					{' '}
					Ingresar a Inicio
					<div className={styles.icon}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<path fill="none" d="M0 0h24v24H0z"></path>
							<path
								fill="currentColor"
								d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
							></path>
						</svg>
					</div>
				</button>
			</div>
		</div>
	);
};

export default Leanding;
