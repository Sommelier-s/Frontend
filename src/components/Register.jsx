import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { registerUser } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Register = () => {
	

	const navigate = useNavigate();
	const desarrolloApp = 'http://localhost:3001';

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

	//Toastify module for success message
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

	// Toastify module for error messages
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

	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: '',
		lastName: '',
		email: '',
		dateOfBirth: '',
		phoneNumber: '',
		password: '',
		confirmPassword: '',
		acceptTerms: false,
	});

	const [errors, setErrors] = useState({});

	const paperStyle = {
		padding: 20,
		minHeight: '80vh',
		width: 400,
		margin: '0 auto',
	};
	const headerStyle = { margin: 0 };
	const avatarStyle = { backgroundColor: '#1bbd7e', fontFamily: 'felixti' };
	const marginTop = { marginTop: 10 };
	const btnstyle = { margin: '8px 0', fontFamily: 'felixti' };

	const validateForm = () => {
		const { name, lastName, email, password, confirmPassword, acceptTerms } =
			formData;
		const errors = {};

		if (!name.match(/^[a-zA-Z ]*$/)) {
			errors.name = 'Nombre inválido. Solo se permiten letras y espacios.';
		}

		if (!lastName.match(/^[a-zA-Z ]*$/)) {
			errors.lastName =
				'Apellido inválido. Solo se permiten letras y espacios.';
		}

		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			errors.email = 'Dirección de correo electrónico inválida.';
		}

		if (
			password.length < 6 ||
			!/\d/.test(password) ||
			!/[A-Z]/.test(password)
		) {
			errors.password =
				'Contraseña inválida. Debe tener al menos 6 caracteres, un número y una letra mayúscula.';
		}

		if (password !== confirmPassword) {
			errors.confirmPassword = 'Las contraseñas no coinciden.';
		}

		if (!acceptTerms) {
			errors.acceptTerms = 'Debe aceptar los términos y condiciones.';
		}

		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const [acess, setAcess] = useState(false);
	const registerInBdd = async (user) => {
		try {
			const response = await axios.post(`/auth/register`, user);
			displaySuccessMessage(response.data.message);
			setAcess(true);
			
      setShowPassword(false);
			// userLocal = response.data.data;
			// dispatch({ type: GET_ALL_USERS, payload: response.data.data })
		} catch (error) {
			displayFailedMessage(error.response.data.error);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (validateForm()) {
			const newUser = {
				first_name: formData.name,
				last_name: formData.lastName,
				date_birth: formData.dateOfBirth,
				email: formData.email,
				password: formData.password,
			};

			await registerInBdd(newUser);
			if (acess) {
				setFormData({
					name: '',
					lastName: '',
					email: '',
					dateOfBirth: '',
					phoneNumber: '',
					password: '',
					confirmPassword: '',
					acceptTerms: false,
				});
				
			}
			//const resultado = await dispatch(registerUser(newUser));

			// Aquí puedes realizar el envío del formulario
		} else {
			displayFailedMessage('Todos los campos son obligatorios');
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

		// Validar el campo actual al cambiar su valor
		validateField(e.target.name, e.target.value);
	};

	const validateField = (fieldName, value) => {
		const fieldErrors = {};

		switch (fieldName) {
			case 'name':
				if (!value.match(/^[a-zA-Z ]*$/)) {
					fieldErrors.name =
						'Nombre inválido. Solo se permiten letras y espacios.';
				}
				break;
			case 'lastName':
				if (!value.match(/^[a-zA-Z ]*$/)) {
					fieldErrors.lastName =
						'Apellido inválido. Solo se permiten letras y espacios.';
				}
				break;
			case 'email':
				if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
					fieldErrors.email = 'Dirección de correo electrónico inválida.';
				}
				break;
			case 'password':
				if (value.length < 6 || !/\d/.test(value) || !/[A-Z]/.test(value)) {
					fieldErrors.password =
						'Contraseña inválida. Debe tener al menos 6 caracteres, un número y una letra mayúscula.';
				}
				break;
			case 'confirmPassword':
				if (value !== formData.password) {
					fieldErrors.confirmPassword = 'Las contraseñas no coinciden.';
				}
				break;
			case 'acceptTerms':
				if (!value) {
					fieldErrors.acceptTerms = 'Debe aceptar los términos y condiciones.';
				}
				break;
			default:
				break;
		}

		setErrors((prevErrors) => ({
			...prevErrors,
			[fieldName]: fieldErrors[fieldName],
		}));
	};

	return (
		<Grid container>
			<Grid item xs={12} sm={8} md={6}>
				<Paper style={paperStyle}>
					<Grid align="center">
						<Avatar style={avatarStyle}>
							<AddCircleOutlineIcon />
						</Avatar>
						<Typography variant="h5" style={headerStyle}>
							Registrarse
						</Typography>
						<Typography variant="subtitle2">
							Complete los campos para crear su cuenta
						</Typography>
					</Grid>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2} style={marginTop}>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="Nombre"
									placeholder="Ingrese su nombre"
									name="name"
									value={formData.name}
									onChange={handleChange}
									error={Boolean(errors.name)}
									helperText={errors.name}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="Apellido"
									placeholder="Ingrese su apellido"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									error={Boolean(errors.lastName)}
									helperText={errors.lastName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Email"
									placeholder="Ingrese su email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									error={Boolean(errors.email)}
									helperText={errors.email}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									type="date"
									name="dateOfBirth"
									value={formData.dateOfBirth}
									onChange={handleChange}
									error={Boolean(errors.dateOfBirth)}
									helperText={errors.dateOfBirth}
								/>
							</Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowPassword}>
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirme su contraseña"
                  placeholder="Confirme su contraseña"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? 'text' : 'password'}
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowConfirmPassword}>
                          {showConfirmPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											name="acceptTerms"
											checked={formData.acceptTerms}
											onChange={handleChange}
											color="primary"
										/>
									}
									label="Acepto los términos y condiciones"
								/>
								{errors.acceptTerms && (
									<Typography color="error">{errors.acceptTerms}</Typography>
								)}
							</Grid>
							<Grid item xs={12}>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									style={btnstyle}
								>
									Registrarse
								</Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
			<ToastContainer />
		</Grid>
	);
};

export default Register;
