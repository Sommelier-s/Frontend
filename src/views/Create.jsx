import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '.././assets/styles/components/views/Create.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryWine, getAllCategoryLiquor } from '../redux/actions';
import { useEffect } from 'react';

import Footer from '../components/Footer';

export default function Create() {
	useEffect(() => {
		dispatch(getAllCategoryWine());
		dispatch(getAllCategoryLiquor());
	}, []);

	const dispatch = useDispatch();
	const userId = window.localStorage.getItem('userId');
	const userIdParseado = JSON.parse(userId);
	const allCategoryWine = useSelector((state) => state.categoryWine);
	const allCategoryLiquor = useSelector((state) => state.categoryLiquor);

	const desarrolloApp = 'http://localhost:3001';
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
							values.stock
						) {
							let requestData = {};

							if (values.product === 'vino') {
								requestData = {
									name: values.name,
									description: values.description,
									price: parseFloat(values.price),
									stock: parseInt(values.stock),
									picture: values.picture,
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
									picture: values.picture,
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
							<div>
								<label htmlFor="picture">Picture URL:</label>
								<Field
									type="text"
									id="picture"
									name="picture"
									placeholder="URL de la imagen"
								/>
								<ErrorMessage
									name="picture"
									component="div"
									className={styles.error}
								/>
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
