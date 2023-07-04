import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '.././assets/styles/components/views/Create.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryWine, getAllCategoryLiquor } from '../redux/actions';
import { useEffect } from 'react';
//Esta importacion es para poder abrir una ventana del sistema
//para asi seleccionar las imagenes

import { Container } from 'reactstrap';
import Dropzone from 'react-dropzone';
import swal from 'sweetalert';
import folder from '../assets/img/folder-filled.png';
import Footer from '../components/Footer';
import {
	Grid,
	Paper,
	Avatar,
	Typography,
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

export default function Create() {
	const desarrolloApp = 'http://localhost:3001';

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const allCategoryWine = useSelector((state) => state.categoryWine);
	const allCategoryLiquor = useSelector((state) => state.categoryLiquor);
	const [apyKey, setApyKey] = useState('');
	const [nameCloud, setNameCloud] = useState('');

	/**********************************************************************/
	/*******************Codigo de Cloudinary*******************************/

	const getAllDataCloudinary = async () => {
		try {
			const { data } = await axios.get(`/cloudinary/data`);
			setApyKey(data.data.apy_key);
			setNameCloud(data.data.name_cloud);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAllDataCloudinary();
		dispatch(getAllCategoryWine());
		dispatch(getAllCategoryLiquor());
	}, []);

	const deleteImage = async (publicId) => {
		try {
			const { data } = await axios.delete(
				`/cloudinary/delete?id_public=${publicId}`,
			);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	//estado para guardar los links de las imagenes que se cargan en cloudinary
	const [image, setImage] = useState({ array: [], id_image: '' });
	//Estado que se activa y desactiva dependiendo de si se completo la carga
	const [loading, setLoading] = useState('');

	//Funcion para verificar el tipo de archivo
	const checkingType = (string) => {
		if (string.toLowerCase().includes('png')) return true;
		if (string.toLowerCase().includes('jpg')) return true;
		if (string.toLowerCase().includes('jpeg')) return true;
		if (string.toLowerCase().includes('bpm')) return true;
		if (string.toLowerCase().includes('tiff')) return true;
		if (string.toLowerCase().includes('webp')) return true;
		if (string.toLowerCase().includes('avif')) return true;
		return false;
	};

	const displayOptions = (event) => {
		event.preventDefault();
		//para el icono solo debes poner el tipo, hay 4
		// error, success, warning, info
		swal({
			title: 'Confirmar',
			text: 'Estas seguro de eliminar la imagen?',
			icon: 'warning',
			buttons: ['No', 'Si'],
		}).then((response) => {
			if (response) {
				deleteImage(image.id_image);
				setImage({ ...image, array: [] });
				setLoading('');
				swal({
					title: 'Eliminado con exito',
					text: 'Vuelve a cargar una imagen',
					icon: 'success',
					buttons: 'Aceptar',
				});
			} else {
				swal({
					title: 'Eliminacion no ejecutada',
					text: '',
					icon: 'success',
					buttons: 'Aceptar',
				});
			}
		});
	};

	//Funcion para subir las imagenes a cloudinary
	const handleDrop = async (files) => {
		//Checkeo el tipo de archivo
		if (checkingType(files[0].name)) {
			//Checkeo que no suba mas de una imagen
			if (image.array.length === 0 && files.length === 1) {
				displaySuccessMessage('Formato de imagen admitido');
				const upLoaders = files.map((file) => {
					const formData = new FormData();
					formData.append('file', file);
					formData.append('tags', `codeinfuse,medium,gist`);
					formData.append('upload_preset', 'uploadProductsImages');
					formData.append('api_key', `${apyKey}`);
					formData.append('timestamp', Date.now() / 1000 || 0);
					setLoading('true');

					return axios
						.post(
							`https://api.cloudinary.com/v1_1/${nameCloud}/image/upload`,
							formData,
							{
								headers: { 'X-Requested-With': 'XMLHttpRequest' },
							},
						)
						.then((response) => {
							const data = response.data;
							const idPublic = data.public_id;

							const fileURL = data.secure_url;
							let specificArrayInObject = image.array;
							specificArrayInObject.push(fileURL);
							const newObj = {
								...image,
								specificArrayInObject,
								id_image: idPublic,
							};

							setImage(newObj);
						});
				});

				axios.all(upLoaders).then(() => {
					setLoading('false');
				});
			} else {
				return displayFailedMessage('No puedes cargar mas de una imagen');
			}
		} else {
			return displayFailedMessage('Formato de imagen no admitido');
		}
	};

	//Funcion para mostrar la imagen una vez cargada en cloudinary
	const imagePrevious = () => {
		if (loading === 'true') {
			return (
				<div className={styles.contentLoading}>
					<h3 className={styles.textLoadingImage}>Cargando imagen</h3>
				</div>
			);
		}
		if (loading === 'false') {
			return (
				<h3>
					{image.array.length > 0 &&
						image.array.map((item, index) => {
							return (
								<div className={styles.imagePreview}>
									<img
										key={index}
										alt="imagen"
										className={styles.image}
										src={item}
									/>
								</div>
							);
						})}
				</h3>
			);
		}
	};

	/*******************Codigo de Cloudinary*******************************/
	/**********************************************************************/

	const [formData, setFormData] = useState({
		product: 'vino',
		name: '',
		description: '',
		price: '',
		stock: '',
		category: '',
	});

	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const { name, description, price, stock } = formData;
		const errors = {};

		if (!name.trim()) {
			errors.name = 'El nombre es requerido.';
		}

		if (!description.trim()) {
			errors.description = 'La descripción es requerida.';
		}

		if (!price) {
			errors.price = 'El precio es requerido.';
		} else if (isNaN(price) || parseFloat(price) <= 0) {
			errors.price = 'El precio debe ser un número válido y mayor que cero.';
		}

		if (!stock) {
			errors.stock = 'El stock es requerido.';
		} else if (isNaN(stock) || parseInt(stock) <= 0) {
			errors.stock = 'El stock debe ser un número válido y mayor que cero.';
		}

		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const validateField = (fieldName, value) => {
		const fieldErrors = {};

		switch (fieldName) {
			case 'name':
			// if (!value.trim().match(/^[a-zA-Z ]*$/)) {
			// 	fieldErrors.name =
			// 		'Nombre inválido. Solo se permiten letras y espacios.';
			// }
			// break;
			case 'description':
				if (!value.trim()) {
					fieldErrors.description = 'Descripción requerida.';
				}
				break;
			case 'price':
				if (isNaN(value) || Number(value) <= 0) {
					fieldErrors.price =
						'Precio inválido. Debe ser un número mayor a cero.';
				}
				break;
			case 'stock':
				if (isNaN(value) || Number(value) < 0) {
					fieldErrors.stock =
						'Stock inválido. Debe ser un número mayor o igual a cero.';
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		validateForm();
		if (
			formData.name &&
			formData.description &&
			formData.price &&
			formData.stock
		) {
			let requestData = {};
			if (formData.product === 'vino') {
				requestData = {
					name: formData.name,
					description: formData.description,
					price: parseFloat(formData.price),
					stock: parseInt(formData.stock),
					picture: image.array[0],
					id_picture: image.id_image,
					wineCategoryId: formData.category,
				};

				try {
					const response = await axios.post(
						`/wine/?id=${user.id}`,
						requestData,
					);
					setFormData({
						name: '',
						description: '',
						price: '',
						stock: '',
						product: '',
						category: '',
					});
					setFormSubmit(true);
					displaySuccessMessage('Producto cargado con éxito');
					setImage({ array: [] });
				} catch (error) {
					console.log('Error al enviar el formulario:', error);
					displayFailedMessage('Hubo un error, no se cargó el producto');
				}
			} else if (formData.product === 'licor') {
				requestData = {
					name: formData.name,
					description: formData.description,
					price: parseFloat(formData.price),
					graduation: parseFloat(formData.graduation),
					stock: parseInt(formData.stock),
					picture: image.array[0],
					id_picture: image.id_image,
					liquorCategoryId: formData.category,
				};
				try {
					const response = await axios.post(
						`${desarrolloApp}/liquor/?id=${user.id}`,
						requestData,
					);
					setFormData({
						name: '',
						description: '',
						price: '',
						stock: '',
						product: '',
						category: '',
						graduation: '',
					});
					setFormSubmit(true);
					displaySuccessMessage('Producto cargado con éxito');
					setImage({ array: [] });
				} catch (error) {
					console.log('Error al enviar el formulario:', error);
					displayFailedMessage('Hubo un error, no se cargó el producto');
				}
			} else {
				showAlert();
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
		validateField(event.target.name, event.target.value);
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

	const [formSubmit, setFormSubmit] = useState(false);
	const showAlert = () => {
		displayFailedMessage('Completa todos los campos del formulario.');
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
		<div className={styles.content}>
			<Grid container justifyContent="center" alignItems="center">
				<Grid item xs={12} sm={8} md={6}>
					<Paper style={paperStyle}>
						<Grid align="center">
							<Avatar style={avatarStyle}>
								<AddCircleOutlineIcon />
							</Avatar>
							<Typography variant="h5" style={headerStyle}>
								Nuevo producto
							</Typography>
							<Typography variant="subtitle2">
								Complete los campos para crear su nuevo producto
							</Typography>
						</Grid>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2} style={marginTop}>
								<Grid item xs={12}>
									<FormControl fullWidth>
										<InputLabel>Seleccione un producto</InputLabel>
										<Select
											name="product"
											label="Seleccione un producto"
											value={formData.product}
											onChange={handleChange}
											error={Boolean(errors.product)}
										>
											<MenuItem value="vino">Vino</MenuItem>
											<MenuItem value="licor">Licor</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										label={
											formData.product === 'vino'
												? 'Nombre del vino'
												: 'Nombre del licor'
										}
										placeholder={
											formData.product === 'vino'
												? 'Nombre del vino'
												: 'Nombre del licor'
										}
										name="name"
										value={formData.name}
										onChange={handleChange}
										error={Boolean(errors.name)}
										helperText={errors.name ? errors.name : ''}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										label="Descripción"
										placeholder="Ingrese la descripción"
										name="description"
										value={formData.description}
										onChange={handleChange}
										error={Boolean(errors.description)}
										helperText={errors.description ? errors.description : ''}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										label="Precio"
										placeholder="Ingrese el precio"
										name="price"
										value={formData.price}
										onChange={handleChange}
										error={Boolean(errors.price)}
										helperText={errors.price ? errors.price : ''}
									/>
								</Grid>
								{formData.product === 'licor' && (
									<Grid item xs={12}>
										<TextField
											fullWidth
											label="Graduación"
											placeholder="Ingrese la graduación"
											name="graduation"
											value={formData.graduation}
											onChange={handleChange}
											error={Boolean(errors.graduation)}
											helperText={errors.graduation ? errors.graduation : ''}
										/>
									</Grid>
								)}
								<Grid item xs={12}>
									<TextField
										fullWidth
										label="Stock"
										placeholder="Ingrese el stock"
										name="stock"
										value={formData.stock}
										onChange={handleChange}
										error={Boolean(errors.stock)}
										helperText={errors.stock ? errors.stock : ''}
									/>
								</Grid>

								{formData.product === 'vino' && (
									<Grid item xs={12}>
										<FormControl fullWidth>
											<InputLabel>Categoría</InputLabel>
											<Select
												name="category"
												value={formData.category}
												label="Categoría"
												onChange={handleChange}
												error={Boolean(errors.category)}
											>
												{allCategoryWine.map((categoria) => (
													<MenuItem value={categoria.id}>
														{categoria.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>
								)}

								{formData.product === 'licor' && (
									<Grid item xs={12}>
										<FormControl fullWidth>
											<InputLabel>Categoría</InputLabel>
											<Select
												name="category"
												value={formData.category}
												label="Categoría"
												onChange={handleChange}
												error={Boolean(errors.category)}
											>
												{allCategoryLiquor.map((categoria) => (
													<MenuItem value={categoria.id}>
														{categoria.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>
								)}

								<div className={styles.contentPicture}>
									<label htmlFor="picture">Imagen:</label>
									<div className={styles.contentBox}>
										<Container className={styles.contentDropzone}>
											<Dropzone
												className="dropzone"
												onDrop={handleDrop}
												onChange={(event) => setImage(event.target.value)}
												value={image}
											>
												{({ getRootProps, getInputProps }) => (
													<section>
														<div {...getRootProps({ className: 'dropzone' })}>
															<input {...getInputProps()} />
															<div className={styles.contentImageFolder}>
																<img src={folder} alt="" />
															</div>

															<p>Arrastra o selecciona una imagen</p>
														</div>
													</section>
												)}
											</Dropzone>
										</Container>
										{loading === '' ? (
											<div className={styles.contentImagePreviewEmpty}></div>
										) : (
											<div className={styles.contentImagePreview}>
												{imagePrevious()}
												{image.array.length == 1 && (
													<button
														onClick={displayOptions}
														className={styles.button}
													>
														X
													</button>
												)}
											</div>
										)}
									</div>
								</div>

								<Grid item xs={12}>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										style={btnstyle}
										onClick={() => {
											if (
												!formData.name ||
												!formData.description ||
												!formData.price ||
												!formData.stock
											) {
												showAlert();
											}
										}}
									>
										Cargar producto
									</Button>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Grid>
				<ToastContainer />
			</Grid>
		</div>
	);
}
