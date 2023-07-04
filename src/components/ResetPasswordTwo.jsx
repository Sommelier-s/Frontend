import React from 'react';
import styles from '../assets/styles/components/ResetPassword.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import { Grid, Button, Paper, Typography, TextField } from '@mui/material';

const ResetPasswordOne = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const handleChangePassword = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setPassword(value);
		validatePassword(value);
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

	const validatePassword = (password) => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		if (!passwordRegex.test(password)) {
			setPasswordError(
				'La contraseña debe tener al menos una letra mayúscula, un número y tener al menos 8 caracteres.'
			);
		} else {
			setPasswordError('');
		}
	};

	const paperStyle = {
		padding: '30px 20px',
		width: 500,
		margin: '0px auto',
	  };
	  const headerStyle = {
		margin: '10px 0',
	  };
	  const btnstyle = {
		marginTop: 15,
		backgroundColor: '#780000',
	  };

	return (
		<Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
			<Grid item xs={12} sm={8} md={6}>
				<Paper style={paperStyle}>
					<Grid align="center">
						<Typography variant="h4" style={headerStyle}>
							Paso 2
						</Typography>
						<Typography variant="body1" style={headerStyle}>
							Ingresa tu nueva contraseña
						</Typography>
					</Grid>
					<form onSubmit={handleResetPassword}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Contraseña"
								type="password"
								name="password"
								value={password}
								onChange={handleChangePassword}
								variant="outlined"
								error={!!passwordError}
								helperText={passwordError}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button 
							fullWidth 
							type="submit" 
							variant="contained" 
							color="primary" 
							style={btnstyle}
							>
							Confirmar
							</Button>
						</Grid>
					</form>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default ResetPasswordOne;
