import React, { useState, useEffect } from 'react';
import styles from '.././assets/styles/components/views/Shipment.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '../components/Footer';
import {
	Grid,
	Paper,
	Avatar,
	Typography,
	TextField,
	Button,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { removeFromCart, updateCartEmptyStatus } from '../redux/actions';
import axios from 'axios';

export default function Shipment() {
	const user = useSelector((state) => state.user);

	const cart = useSelector((state) => state.cart);
	const [backupCart, setBackupCart] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [remove, setRemove] = useState(false);
	const amount = useSelector((state) => state.amount);

	/*Obtenemos la fecha actual de la compra */
	// Obtener la fecha actual
	const fechaActual = new Date();
	// Obtener el día, mes y año de la fecha actual
	const dia = fechaActual.getDate();
	const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
	const año = fechaActual.getFullYear();
	const fechaFormateada = año + '-' + mes + '-' + dia;

	const [id_Cart, setId_Cart] = useState('');

	const sendEmailPuschased=async()=>{
		const userData={
			id:user.id,
			name: user.first_name +" "+user.last_name,
			email:user.email,
			type:"delivery",
		}
		try{
			const {data}=await axios.post(`/auth/send-email`,userData);
			console.log("Se ha notificado al usuario")
		}catch(error){
			console.log(error);
		}
	}

	const thereIsACart = async () => {
		try {
			const { data } = await axios.get(`/cart/?id=${user.id}`);
			setId_Cart(data.data.id);
		} catch (error) {}
	};

	const emptyCartFromBackend = async () => {
		try {
			const { data } = await axios.delete(`/cart/?id=${id_Cart}`);
		} catch (error) {}
	};

	useEffect(() => {
		const cart = window.localStorage.getItem('cart');
		if (cart) {
			const cartParseado = JSON.parse(cart);
			if (cartParseado.length != 0) {
				setBackupCart(cartParseado);
			}
		}
		thereIsACart();
	}, []);

	const updateStockProducts = () => {
		backupCart.map(async ({ id, quantity, graduation }) => {
			console.log(graduation);
			if (!graduation) {
				try {
					const { data } = await axios.put(`/wine/stock/${id}`, {
						quantity,
					});
				} catch (error) {
					console.log('No se puede actualizar el stock');
				}
			} else {
				try {
					const { data } = await axios.put(`/liquor/stock/${id}`, {
						quantity,
					});
				} catch (error) {
					console.log('No se puede actualizar el stock');
				}
			}
		});
	};

	const loadSale = () => {
		backupCart.map(async ({ id, quantity, price }) => {
			const saleCompleted = {
				clientId: user.id,
				date: fechaFormateada,
				productId: id,
				quantity: quantity,
				amount: price * quantity,
			};

			try {
				const { data } = await axios.post(`/sale`, saleCompleted);
			} catch (error) {
				console.log('No se puedo cargar la venta');
			}
		});
	};

	const loadPurchasedProducts = () => {
		backupCart.map(async ({ id }) => {
			const purchasedProduct = {
				clientId: user.id,
				productId: id,
			};
			try {
				const { data } = await axios.post(`/purchased`, purchasedProduct);
			} catch (error) {
				console.log('No se puede cargar el producto comprado');
			}
		});
	};

	const handleCancelBuy = () => {
		thereIsACart();
		if (id_Cart != '') {
			emptyCartFromBackend();
		}

		sendEmailPuschased();

		updateStockProducts();
		loadSale();
		loadPurchasedProducts();
		dispatch(updateCartEmptyStatus(true));
		cart.forEach((product) => {
			dispatch(removeFromCart(product.id));
		});
		navigate('/');
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

	const showAlert = () => {
		displayFailedMessage('Completa todos los campos del formulario.');
		return;
	};

	const [initialValues, setInitialValues] = useState({
		firstName: '',
		lastName: '',
		postalCode: '',
		province: '',
		city: '',
		street: '',
		number: '',
		floor: '',
		location: '',
		phoneNumber: '',
		additionalInstructions: '',
		workInstructions: '',
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log('Se hizo clic en el botón Enviar');
		if (
			initialValues.firstName &&
			initialValues.lastName &&
			initialValues.postalCode &&
			initialValues.province &&
			initialValues.city &&
			initialValues.street &&
			initialValues.number &&
			initialValues.phoneNumber
		) {
			let shipmentData = {
				user_id: user.id,
				cart: backupCart,
				amount: amount,
				firstName: initialValues.firstName,
				lastName: initialValues.lastName,
				postal_code: initialValues.postalCode,
				province: initialValues.province,
				city: initialValues.city,
				address: initialValues.street,
				number: initialValues.number,
				apartment: initialValues.floor,
				phone: initialValues.phoneNumber,
				instructions: initialValues.additionalInstructions,
			};

			try {
				console.log('entro al try');
				const { data } = await axios.post('/shipment', shipmentData);

				if (data.data) {
					console.log('entro al si del if');
					swal({
						title: 'Compra exitosa',
						text: 'Revisa tu correo por la factura',
						icon: 'success',
						buttons: 'Aceptar',
					}).then((response) => {
						handleCancelBuy();
					});
				}
			} catch (error) {
				console.log(error);
				return displayFailedMessage('Hubo un error en el axios');
			}
		} else {
			console.log('no se envia form');
			return displayFailedMessage('Campos invalidos');
		}
	};

	const paperStyle = {
		padding: '30px 20px',
		width: 500,
		margin: '20px auto',
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
	};

	const [errors, setErrors] = useState({});

	const validateField = (fieldName, value) => {
		const fieldErrors = {};

		if (!value.trim()) {
			fieldErrors[fieldName] = `El campo ${fieldName} es requerido`;
		} else {
			switch (fieldName) {
				case 'firstName':
					if (!value.match(/^[a-zA-ZñÑ\s]+$/)) {
						fieldErrors.firstName = 'Ingrese un nombre válido';
					}
					break;
				case 'lastName':
					if (!value.match(/^[a-zA-ZñÑ\s]+$/)) {
						fieldErrors.lastName = 'Ingrese un apellido válido';
					}
					break;
				case 'postalCode':
					if (!value.match(/^\d+$/)) {
						fieldErrors.postalCode = 'Ingrese un código postal válido';
					}
					break;
				case 'province':
					if (!value.match(/^[a-zA-ZñÑ\s]+$/)) {
						fieldErrors.province = 'Ingrese una provincia válida';
					}
					break;
				case 'city':
					if (!value.match(/^[a-zA-ZñÑ\s]+$/)) {
						fieldErrors.city = 'Ingrese una ciudad válida';
					}
					break;
				case 'street':
					if (!value.match(/^[\w\s\d]+$/)) {
						fieldErrors.street = 'Ingrese una calle válida';
					}
					break;
				case 'number':
					if (!value.match(/^\d+$/)) {
						fieldErrors.number = 'Ingrese un número válido';
					}
					break;
				// case 'floor':
				// 	if (value.trim() && !value.match(/^[\w\d]+$/)) {
				// 		fieldErrors.floor = 'Ingrese un piso/dpto válido';
				// 	}
				// 	break;
				case 'phoneNumber':
					if (!value.match(/^[\d()-]+$/)) {
						fieldErrors.phoneNumber = 'Ingrese un número de teléfono válido';
					}
					break;
				case 'additionalInstructions':
					if (value.trim() && !value.match(/^[a-zA-ZñÑ\s]+$/)) {
						fieldErrors.additionalInstructions =
							'Ingrese información adicional válida';
					}
					break;
				default:
					break;
			}
		}

		setErrors((prevErrors) => ({
			...prevErrors,
			[fieldName]: fieldErrors[fieldName],
		}));
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setInitialValues((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
		validateField(event.target.name, event.target.value);
	};

	return (
		<Grid container justifyContent="center" alignItems="center">
			<Grid item xs={12} sm={8} md={6}>
				<Paper style={paperStyle}>
					<Grid align="center">
						<Avatar style={avatarStyle}>
							<LocalShippingIcon />
						</Avatar>
						<Typography variant="h5" style={headerStyle}>
							Ahora completa los campos para el envio!
						</Typography>
					</Grid>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2} style={marginTop}>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="Nombre"
									placeholder="Nombre"
									name="firstName"
									value={initialValues.firstName}
									onChange={handleChange}
									error={!!errors.firstName}
									helperText={errors.firstName}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="Apellido"
									placeholder="Apellido"
									name="lastName"
									value={initialValues.lastName}
									onChange={handleChange}
									error={!!errors.lastName}
									helperText={errors.lastName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Código Postal"
									placeholder="Código Postal"
									name="postalCode"
									value={initialValues.postalCode}
									onChange={handleChange}
									error={!!errors.postalCode}
									helperText={errors.postalCode}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="Provincia"
									placeholder="Provincia"
									name="province"
									value={initialValues.province}
									onChange={handleChange}
									error={!!errors.province}
									helperText={errors.province}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="Ciudad"
									placeholder="Ciudad"
									name="city"
									value={initialValues.city}
									onChange={handleChange}
									error={!!errors.city}
									helperText={errors.city}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="Calle"
									placeholder="Calle"
									name="street"
									value={initialValues.street}
									onChange={handleChange}
									error={!!errors.street}
									helperText={errors.street}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="Número"
									placeholder="Número"
									name="number"
									value={initialValues.number}
									onChange={handleChange}
									error={!!errors.number}
									helperText={errors.number}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="Piso"
									placeholder="Piso"
									name="floor"
									value={initialValues.floor}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Instrucciones Adicionales"
									placeholder="Instrucciones Adicionales"
									name="additionalInstructions"
									value={initialValues.additionalInstructions}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Número de Teléfono"
									placeholder="Número de Teléfono"
									name="phoneNumber"
									value={initialValues.phoneNumber}
									onChange={handleChange}
									error={!!errors.phoneNumber}
									helperText={errors.phoneNumber}
								/>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								style={btnstyle}
							>
								Cargar datos de envío
							</Button>
						</Grid>
					</form>
				</Paper>
			</Grid>
			<Footer />
			<ToastContainer />
		</Grid>
	);
}
