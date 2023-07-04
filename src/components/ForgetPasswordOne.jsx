import React from 'react';
import styles from '../assets/styles/components/ResetPassword.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { Grid, Button, Paper, Typography, TextField, InputLabel, Avatar } from '@mui/material'; 
import LockResetIcon from '@mui/icons-material/LockReset';
import { ToastContainer, toast } from 'react-toastify';

const ForgetPasswordOne = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const desarrolloApp = 'http://localhost:3001';
	
	const handleChangeEmail = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setEmail(value);
		validateEmailFormat(value);
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

		if (email === '') {
			displayFailedMessage('Ingrese su email para continuar !');
			return;
		}

		try {
			const { data } = await axios.post(`${desarrolloApp}/auth/olvide-password`, { email });
			console.log(data);
			swal({
				title: 'Operación completada',
				text: data.message,
				icon: 'success',
				buttons: 'Aceptar',
			});
		} catch (error) {
			console.log(error);
		}
	};

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

	const validateEmailFormat = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError('Ingrese un formato de email válido.');
		} else {
			setError('');
		}
	};

	const paperStyle = {
		padding: '30px 20px',
		width: 500,
		margin: '0px auto',
	  };
	  const avatarStyle = {
		backgroundColor: '#1bbd7e',
	  };
	  const headerStyle = {
		margin: '10px 0',
	  };
	  const marginTop = {
		marginTop: 10,
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
							<Avatar style={avatarStyle}>
								<LockResetIcon />
							</Avatar>
							<Typography variant="h5" style={headerStyle}>
								Restablecer contraseña
							</Typography>
							<Typography variant="subtitle2" style={headerStyle}>
								Paso 1 : Ingrese su email
							</Typography>
						</Grid>
					<form onSubmit={ buttonSubmit }>
						<Grid item xs={12}>
							<TextField
							fullWidth
							label="Email:"
							placeholder="Ingrese su email"
							name="email"
							value={email}
							onChange={ handleChangeEmail }
							variant="outlined"
							error={!!error}
							helperText={error}
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
							Restablecer contraseña
							</Button>
						</Grid>
						<Grid item xs={12}>
						<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={displayCancel}
						style={btnstyle}
						>
						Cancelar
						</Button>
						</Grid>	
					</form>
				</Paper>
			</Grid>
			<ToastContainer />
		</Grid>
	);
};

export default ForgetPasswordOne;
