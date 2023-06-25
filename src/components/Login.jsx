import React from 'react';
import {
	Grid,
	Paper,
	Avatar,
	TextField,
	Button,
	Typography,
	Link,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../assets/styles/components/views/Login.module.css';
import googleLogo from '../assets/img/google.png';

const Login = ({ handleChange }) => {
	const user = useSelector((state) => state.user);
	const [acess, setAcess] = useState(false);
	useEffect(() => {
		if (user.id) {
			navigate('/');
		}
	}, [user]);

	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	const paperStyle = {
		padding: 20,
		minHeight: '80vh',
		width: 400,
		margin: '0 auto',
	};
	const avatarStyle = { backgroundColor: '#1bbd7e', fontFamily: 'felixti' };
	const btnstyle = { margin: '8px 0', fontFamily: 'felixti' };
	const marginTop = { marginTop: 10 };
	const initialValues = {
		email: '',
		password: '',
		remember: false,
	};
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Ingrese un correo electrónico válido')
			.required('Campo requerido'),
		password: Yup.string().required('Campo requerido'),
	});

	const loginInBdd = async (user) => {
		try {
			const response = await axios.post(`/auth/login`, user);
			const userLogin = response.data.data;
			dispatch(saveUser(userLogin));
			setAcess(true);
		} catch (error) {
			displayFailedMessage(error.response.data.error);
		}
	};

	const onSubmit = async (values, props) => {
		const newUser = {
			email: values.email,
			password: values.password,
		};

		await loginInBdd(newUser);
		if (acess) {
			props.resetForm();
			props.setSubmitting(false);
			navigate('/');
		}
	};

	return (
		<Grid>
			<Paper style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<LockIcon />
					</Avatar>
					<h2>Login</h2>
				</Grid>
				<br />
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{(props) => (
						<Form>
							<Field
								as={TextField}
								label="Email"
								name="email"
								placeholder="Ingrese su email"
								fullWidth
								required
								helperText={<ErrorMessage name="email" />}
								error={props.errors.email && props.touched.email}
								style={marginTop}
							/>
							<Field
								as={TextField}
								label="Contraseña"
								name="password"
								placeholder="Ingrese su contraseña"
								type="password"
								fullWidth
								required
								helperText={<ErrorMessage name="password" />}
								error={props.errors.password && props.touched.password}
								style={marginTop}
							/>
							<br />
							<Button
								type="submit"
								color="primary"
								variant="contained"
								disabled={props.isSubmitting}
								style={btnstyle}
								fullWidth
							>
								{props.isSubmitting ? 'Cargando' : 'Iniciar sesión'}
							</Button>
						</Form>
					)}
				</Formik>
				<br />
				<Typography>
					<Link href="/reset_password">¿Olvidaste tu contraseña?</Link>
				</Typography>
				<Typography>
					¿No tienes una cuenta?
					<Link href="#" onClick={() => handleChange('event', 1)}>
						Registrarse
					</Link>
				</Typography>
			</Paper>
			<div className={styles.contentGoogle}>
				<div className={styles.contentLogoGoogle}>
					<img
						src="https://icongr.am/devicon/chrome-original.svg?size=148&color=currentColor"
						alt=""
					/>
				</div>
				<h4 className={styles.titleGoogle}>Continuar con Google</h4>
			</div>
			<ToastContainer />
		</Grid>
	);
};

export default Login;
