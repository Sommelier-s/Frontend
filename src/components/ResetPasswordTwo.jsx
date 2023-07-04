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
	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmError, setConfirmError] = useState('');

	const handleChangePassword = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setPassword(value);
		validatePassword(value);
	};
	
	const handleChangeConfirmPassword = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setConfirmPassword(value);
		validateConfirmPassword(value);
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
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{1,}$/;
		if (!passwordRegex.test(password)) {
			setPasswordError(
				'La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número.'
			);
		} else {
			setPasswordError('');
		}
	};

	const validateConfirmPassword = (confirmPassword) => {
		if (password !== confirmPassword) {
			setConfirmError('Las contraseñas no coinciden.');
		} else {
			setConfirmError('');
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
	  const marginTop = { marginTop: 10 , marginBottom: 10};

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
						<Grid item xs={12} style={marginTop}>
							<TextField
								fullWidth
								label="Contraseña"
								type="text"
								name="password"
								value={password}
								onChange={handleChangePassword}
								variant="outlined"
								error={!!passwordError}
								helperText={passwordError}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Confirme su contraseña"
								type="text"
								name="confirmPassword"
								value={confirmPassword}
								onChange={handleChangeConfirmPassword}
								variant="outlined"
								error={!!confirmError}
								helperText={confirmError}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button 
							fullWidth 
							type="submit" 
							variant="contained" 
							color="primary" 
							style={btnstyle}
							disabled={passwordError || confirmError}
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
