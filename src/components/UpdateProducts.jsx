import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from '../assets/styles/components/UpdateProducts.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { date } from 'yup';
import Tippy from '@tippyjs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Esta importacion es para poder abrir una ventana del sistema
//para asi seleccionar las imagenes

import { Container } from 'reactstrap';
import Dropzone from 'react-dropzone';

import swal from 'sweetalert';
import folder from '../assets/img/folder-filled.png';
import { getAllCategoryWine, getAllCategoryLiquor } from '../redux/actions';

const UpdateProducts = () => {
	const [id_product, setId_product] = useState('');
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const dispatch = useDispatch();
	const [category, setCategory] = useState('');
	const [form, setForm] = useState({
		description: '',
		id_picture: '',
		picture: '',
		price: '',
		stock: '',
		graduation: '',
	});
	const [error, setError] = useState({
		description: '',
		id_picture: '',
		picture: '',
		price: '',
		stock: '',
		graduation: '',
	});

	const validateFiels = (form, stateErrors) => {
		let error = { ...stateErrors };
		if (!form.description) error.description = 'Completa el campo';
		else if (form.description === '') error.description = 'Completa el campo';
		else if (!isNaN(form.description))
			error.description = 'No pueder ser un numero';
		else error.description = '';

		if (!form.price) error.price = 'Completa el campo';
		else if (form.price === '') error.price = 'Completa el campo';
		else if (isNaN(form.price)) error.price = 'Debe ser un numero';
		else if (form.price.toLowerCase().includes('-'))
			error.price = 'No debe ser negativo';
		else if (parseInt(form.price) <= 0) error.price = 'Debe ser mayor a cero';
		else error.price = '';

		if (!form.stock) error.stock = 'Completa el campo';
		else if (form.stock === '') error.stock = 'Completa el campo';
		else if (isNaN(form.stock)) error.stock = 'Debe ser un numero';
		else if (form.stock.toLowerCase().includes('-'))
			error.stock = 'No debe ser negativo';
		else if (parseInt(form.stock) <= 0) error.stock = 'Debe ser mayor a cero';
		else error.stock = '';

		if (!form.graduation) error.graduation = 'Completa el campo';
		else if (form.graduation === '') error.graduation = 'Completa el campo';
		else if (isNaN(form.graduation)) error.graduation = 'Debe ser un numero';
		else if (form.graduation.toLowerCase().includes('-'))
			error.graduation = 'No debe ser negativo';
		else if (parseInt(form.graduation) <= 0)
			error.graduation = 'Debe ser mayor a cero';
		else error.graduation = '';

		return error;
	};

	const handleInputChange = (event) => {
		const property = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [property]: value });
		setError(validateFiels({ ...form, [property]: value }, error));
	};

	const handleSelectChange = (event) => {
		const value = event.target.value;
		setCategory(value);
	};

	const validateFieldsForSubmit = () => {
		if (
			form.description === '' &&
			form.price === '' &&
			form.stock === '' &&
			form.graduation === '' &&
			image.array.length == 0 &&
			category == ''
		) {
			return swal({
				title: 'Error',
				text: 'Debes completar algun cambio',
				icon: 'error',
				buttons: 'Aceptar',
			});
		}
		if (form.description != '' && !isNaN(form.description))
			return swal({
				title: 'Error',
				text: 'El campo descripcion no puede ser numero',
				icon: 'error',
				buttons: 'Aceptar',
			});

		if (
			(form.stock != '' && isNaN(form.stock)) ||
			form.stock.toLowerCase().includes('-') ||
			parseInt(form.stock) <= 0
		)
			return swal({
				title: 'Error',
				text: 'El campo cantidad no cumple con las especificaciones',
				icon: 'error',
				buttons: 'Aceptar',
			});

		if (
			(form.price != '' && isNaN(form.price)) ||
			form.price.toLowerCase().includes('-') ||
			parseInt(form.price) <= 0
		)
			return swal({
				title: 'Error',
				text: 'El campo precio no cumple con las especificaciones',
				icon: 'error',
				buttons: 'Aceptar',
			});

		if (
			(form.graduation != '' && isNaN(form.graduation)) ||
			form.graduation.toLowerCase().includes('-') ||
			parseInt(form.graduation) <= 0
		)
			return swal({
				title: 'Error',
				text: 'El campo graduacion no cumple con las especificaciones',
				icon: 'error',
				buttons: 'Aceptar',
			});

		return true;
	};

	const handleSubmitUpdate = async (event) => {
		event.preventDefault();
		if (validateFieldsForSubmit() == true) {
			let updateProduct = {};
			if (form.description !== ' ') {
				updateProduct.description = form.description;
			}
			if (form.price !== '') {
				updateProduct.price = form.price;
			}
			if (form.stock !== '') {
				updateProduct.stock = form.stock;
			}
			if (form.graduation !== '') {
				updateProduct.graduation = form.graduation;
			}
			if (category !== '') {
				updateProduct.category = category;
			}
			if (image.array.length !== 0) {
				updateProduct.picture = image.array[0];
				updateProduct.id_picture = image.id_image;
			}
			if (product.graduation) {
				try {
					const { data } = axios.put(
						`/liquor/${id_product}/?userId=${id}`,
						updateProduct,
					);
					console.log(data);
					return swal({
						title: 'Actualizado',
						text: 'El producto se actulizo correctamente',
						icon: 'success',
						buttons: 'Aceptar',
					}).then((response) => {
						window.location.reload();
					});
				} catch (error) {
					console.log(error);
					return swal({
						title: 'Error',
						text: 'El producto NO se actulizo correctamente',
						icon: 'error',
						buttons: 'Aceptar',
					});
				}
			} else {
				try {
					const { data } = axios.put(
						`/wine/${id_product}/?userId=${id}`,
						updateProduct,
					);
					console.log(data);
					return swal({
						title: 'Actualizado',
						text: 'El producto se actulizo correctamente',
						icon: 'success',
						buttons: 'Aceptar',
					}).then((response) => {
						window.location.reload();
					});
				} catch (error) {
					console.log(error);
					return swal({
						title: 'Error',
						text: 'El producto NO se actulizo correctamente',
						icon: 'error',
						buttons: 'Aceptar',
					});
				}
			}
		}
	};

	const [apyKey, setApyKey] = useState('');
	const [nameCloud, setNameCloud] = useState('');

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

	const navigate = useNavigate();
	const getDrinkById = async () => {
		try {
			const { data } = await axios.get(`/both_drinks/?id=${id_product}`);
			setProduct(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// Obtener la URL actual
		const urlParams = new URLSearchParams(window.location.search);
		// Obtener el valor del parámetro "id"
		setId_product(urlParams.get('id_product'));
		dispatch(getAllCategoryWine());
		dispatch(getAllCategoryLiquor());

		// Hacer algo con el valor del parámetro
	}, []);

	useEffect(() => {
		if (id_product) {
			getDrinkById();
		}
	}, [!id_product && id_product]);

	return (
		<div className={styles.container}>
			<div className={styles.contentTitleMain}>
				<div
					className={styles.contentIconReturn}
					onClick={() => navigate(`/dashboard/${id}`)}
				>
					<img
						src="https://icongr.am/clarity/undo.svg?size=147&color=ffffff"
						alt=""
						title="Volver atras"
					/>
				</div>
				<h3 className={styles.titleMain}>Actualizar producto</h3>
			</div>

			<main className={styles.content}>
				<div className={styles.contentCardInfo}>
					<h2 className={styles.titleCard}>Datos actuales</h2>
					<div className={styles.contentImageCard}>
						<img src={product.picture} alt="" />
					</div>
					<div className={styles.contentTextCard}>
						<p>Nombre: {product.name}</p>
						<p>Precio: ${product.price}</p>
						<p>Cantidad: {product.stock}</p>
						{!product.graduation ? (
							<p>Categoria: {product.wine_category?.name}</p>
						) : (
							<p>Categoria: {product.liquor_category?.name}</p>
						)}
						{product.graduation && <p>Graduacion: {product.graduation}</p>}
						<p>Descripción: {product.description}</p>
					</div>
					<Tippy
						placement={'top'}
						offset={[0, 20]}
						delay={200}
						interactive={true}
						content={
							<div className={styles.contentTippy}>
								<span>
									Solo completa los datos que necesitas en el formulario. El
									nombre no se puede cambiar, en caso de que el nombre no sea el
									correcto elimine el producto y crealo de nuevo
								</span>
							</div>
						}
					>
						<h2 className={styles.titleSecondCard}>Leer!!!</h2>
					</Tippy>
				</div>
				<div className={styles.contentFormulario}>
					<form action="" className={styles.formulario}>
						<div className={styles.contentPicture}>
							<label htmlFor="picture ">Imagen:</label>
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

													<p className={styles.parrafoFolder}>
														Arrastra o selecciona una imagen
													</p>
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
						<div className={styles.itemForm}>
							<div className={styles.contentLabelAndText}>
								<label htmlFor="description">Descripcion: </label>
								<textarea
									type="text"
									name="description"
									onChange={handleInputChange}
									value={form.description}
								/>
							</div>
							<span>{error.description}</span>
						</div>
						<div className={styles.itemForm}>
							<div className={styles.contentLabelAndInput}>
								<label htmlFor="price">Precio: </label>
								<input
									type="text"
									name="price"
									onChange={handleInputChange}
									value={form.price}
								/>
							</div>
							<span>{error.price}</span>
						</div>
						<div className={styles.itemForm}>
							<div className={styles.contentLabelAndInput}>
								<label htmlFor="stock">Cantidad: </label>
								<input
									type="text"
									name="stock"
									onChange={handleInputChange}
									value={form.stock}
								/>
							</div>
							<span>{error.stock}</span>
						</div>
						{product.graduation && (
							<div className={styles.itemForm}>
								<div className={styles.contentLabelAndInput}>
									<label htmlFor="graduation">Graduacion: </label>
									<input
										type="text"
										name="graduation"
										onChange={handleInputChange}
										value={form.graduation}
									/>
								</div>
								<span>{error.graduation}</span>
							</div>
						)}

						<button className={styles.button} onClick={handleSubmitUpdate}>
							Actualizar
						</button>
					</form>
				</div>
			</main>
			<ToastContainer />
		</div>
	);
};

export default UpdateProducts;
