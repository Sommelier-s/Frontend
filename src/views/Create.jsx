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

export default function Create() {
	const desarrolloApp = 'http://localhost:3001';

	const dispatch = useDispatch();
	const userId = window.localStorage.getItem('userId');
	//const userIdParseado = JSON.parse(userId);
	const userIdParseado = 'no hay ';
	const allCategoryWine = useSelector((state) => state.categoryWine);
	const allCategoryLiquor = useSelector((state) => state.categoryLiquor);
	const [apyKey, setApyKey] = useState('');
	const [nameCloud, setNameCloud] = useState('');

	const getAllDataCloudinary = async () => {
		try {
			const { data } = await axios.get(`${desarrolloApp}/cloudinary/data`);
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

	/**********************************************************************/
	/*******************Codigo de Cloudinary**************************/

	//estado para guardar los links de las imagenes que se cargan en cloudinary
	const [image, setImage] = useState({ array: [] });
	//Estado que se activa y desactiva dependiendo de si se completo la carga
	const [loading, setLoading] = useState('');

	//Funcion para verificar el tipo de archivo
	const checkingType = (string) => {
		if (string.toLowerCase().includes('png')) return true;
		if (string.toLowerCase().includes('jpg')) return true;
		if (string.toLowerCase().includes('jpeg')) return true;
		if (string.toLowerCase().includes('bpm')) return true;
		if (string.toLowerCase().includes('tiff')) return true;
		return false;
	};

	const displayOptions = () => {
		//para el icono solo debes poner el tipo, hay 4
		// error, success, warning, info
		swal({
			title: 'Confirmar',
			text: 'Estas seguro de eliminar la imagen?',
			icon: 'warning',
			buttons: ['No', 'Si'],
		}).then((response) => {
			if (response) {
				setImage({ ...image, array: [] });
				setLoading('');
				return swal({
					title: 'Eliminado con exito',
					text: 'Vuelve a cargar una imagen',
					icon: 'success',
					buttons: 'Aceptar',
				});
			} else {
				return swal({
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

							const fileURL = data.secure_url;

							let specificArrayInObject = image.array;
							specificArrayInObject.push(fileURL);
							const newObj = { ...image, specificArrayInObject };

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
		console.log(loading);
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

	/**********************************************************************/
	return (
		<>
			<div className={styles.contenedor}>
				<Formik
					initialValues={{
						product: 'vino', // Valor por defecto
						name: '',
						description: '',
						price: '',
						picture: '',
						stock: '',
						category: '',
					}}
					validate={(values) => {
						let errors = {};

						if (!values.name) {
							errors.name = 'Ingrese un nombre';
						} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
							errors.name = 'El nombre solo puede contener letras y espacios';
						}

						if (!values.description) {
							errors.description = 'Ingrese una descripción';
						} else if (!/^[\w\s\d.,:]+$/u.test(values.description)) {
							errors.description =
								'La descripción solo puede contener letras, números, espacios y los caracteres . , :';
						}

						if (!values.price) {
							errors.price = 'Ingrese un precio';
						} else if (!/^\d+(\.\d{1,2})?$/.test(values.price)) {
							errors.price =
								'El precio debe ser un número con máximo 2 decimales';
						}

						if (values.product === 'licor' && !values.graduation) {
							errors.graduation = 'Ingrese una graduación';
						} else if (
							values.product === 'licor' &&
							!/^\d+(\.\d{1,2})?$/.test(values.graduation)
						) {
							errors.graduation =
								'La graduación debe ser un número con máximo 2 decimales';
						}

						if (!values.stock) {
							errors.stock = 'Ingrese el stock';
						} else if (!/^\d+$/.test(values.stock)) {
							errors.stock = 'El stock solo puede contener números';
						}

						if (!values.picture) {
							errors.picture = 'Ingrese la URL de la imagen';
						} else if (!/^https?:\/\/\S+$/.test(values.picture)) {
							errors.picture = 'Ingrese una URL de imagen válida';
						}

						return errors;
					}}
					onSubmit={async (values, { setSubmitting, resetForm }) => {
						if (
							values.name &&
							values.description &&
							values.price &&
							image.array[0] &&
							values.stock
						) {
							let requestData = {};

							if (values.product === 'vino') {
								requestData = {
									name: values.name,
									description: values.description,
									price: parseFloat(values.price),
									stock: parseInt(values.stock),
									picture: image.array[0],
									wineCategoryId: values.category,
								};

								try {
									const response = await axios.post(
										`${desarrolloApp}/wine/?id=${userIdParseado}`,
										requestData,
									);

									setSubmitting(false);
									resetForm();
									setFormSubmit(true);
									displaySuccessMessage('Formulario enviado con exito');
								} catch (error) {
									displayFailedMessage(
										'Hubo un error, no se cargó el producto',
									);
									console.log(
										'Error al enviar el formulario:',
										error.response.data.error,
									);
									setSubmitting(false);
								}
							} else if (values.product === 'licor') {
								requestData = {
									name: values.name,
									description: values.description,
									price: parseFloat(values.price),
									graduation: parseFloat(values.graduation),
									stock: parseInt(values.stock),
									picture: image.array[0],
									liquorCategoryId: values.category,
								};

								try {
									const response = await axios.post(
										`${desarrolloApp}/liquor/?id=${userIdParseado}`,
										requestData,
									);

									setSubmitting(false);
									resetForm();
									setFormSubmit(true);
									displaySuccessMessage('Formulario enviado con éxito');
								} catch (error) {
									displayFailedMessage(
										'Hubo un error, no se cargó el producto',
									);
									console.log(
										'Error al enviar el formulario:',
										error.response.data.error,
									);
									setSubmitting(false);
								}
							}
						} else {
							showAlert();
							setSubmitting(false);
						}
					}}
				>
					{({
						values,
						errors,
						touched,
						handleSubmit,
						handleChange,
						handleBlur,
						isSubmitting,
					}) => (
						<Form className={styles.formulario} onSubmit={handleSubmit}>
							<div>
								<label htmlFor="product">Producto:</label>
								<Field as="select" id="product" name="product">
									<option value="vino">Vino</option>
									<option value="licor">Licor</option>
								</Field>
							</div>
							<div>
								<label htmlFor="name">Nombre:</label>
								<Field
									type="text"
									id="name"
									name="name"
									placeholder={
										values.product === 'vino'
											? 'Nombre del vino...'
											: 'Nombre del licor...'
									}
								/>
								<ErrorMessage
									name="name"
									component="div"
									className={styles.error}
								/>
							</div>
							<div>
								<label htmlFor="description">Descripción:</label>
								<Field
									type="text"
									id="description"
									name="description"
									placeholder="Descripción..."
								/>
								<ErrorMessage
									name="description"
									component="div"
									className={styles.error}
								/>
							</div>
							<div>
								<label htmlFor="price">Precio:</label>
								<Field
									type="text"
									id="price"
									name="price"
									placeholder="Precio..."
								/>
								<ErrorMessage
									name="price"
									component="div"
									className={styles.error}
								/>
							</div>
							{values.product === 'licor' && (
								<div>
									<label htmlFor="graduation">Graduación:</label>
									<Field
										type="text"
										id="graduation"
										name="graduation"
										placeholder="Graduación del licor"
									/>
									<ErrorMessage
										name="graduation"
										component="div"
										className={styles.error}
									/>
								</div>
							)}
							<div>
								<label htmlFor="price">Stock:</label>
								<Field
									type="text"
									id="stock"
									name="stock"
									placeholder="Stock..."
								/>
								<ErrorMessage
									name="stock"
									component="div"
									className={styles.error}
								/>
							</div>
							<div className={styles.contentPicture}>
								<label htmlFor="picture">Picture URL:</label>
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
								{/* <Field
									type="text"
									id="picture"
									name="picture"
									placeholder="URL de la imagen"
								/>
								<ErrorMessage
									name="picture"
									component="div"
									className={styles.error}
								/> */}
							</div>
							{values.product === 'vino' && (
								// Mostrar el campo "Categoría" solo si se selecciona "vino" en "Producto"
								<div>
									<label htmlFor="category">Categoría:</label>
									<Field as="select" id="category" name="category">
										<option value="">Seleccione una categoría</option>
										{allCategoryWine.map((categoria) => (
											<option key={categoria.id} value={categoria.id}>
												{categoria.name}
											</option>
										))}
									</Field>
									<ErrorMessage
										name="category"
										component="div"
										className={styles.error}
									/>
								</div>
							)}

							{values.product === 'licor' && (
								<div>
									<label htmlFor="category">Categoría:</label>
									<Field as="select" id="category" name="category">
										<option value="">Seleccione una categoría</option>
										{allCategoryLiquor.map((categoria) => (
											<option key={categoria.id} value={categoria.id}>
												{categoria.name}
											</option>
										))}
									</Field>
									<ErrorMessage
										name="category"
										component="div"
										className={styles.error}
									/>
								</div>
							)}

							<button
								type="submit"
								disabled={isSubmitting}
								className={`${styles.btnEnviar} ${
									isSubmitting ? styles.disabled : ''
								}`}
								onClick={() => {
									if (
										!values.name ||
										!values.description ||
										!values.price ||
										!values.stock
									) {
										showAlert();
									}
								}}
							>
								Enviar
							</button>
							{formSubmit && (
								<p className={styles.exito}>Producto cargado con éxito!</p>
							)}
						</Form>
					)}
				</Formik>
			</div>
			<Footer />
			<ToastContainer />
		</>
	);
}
