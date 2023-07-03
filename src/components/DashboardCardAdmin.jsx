import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styles from '../assets/styles/components/DashboardCardAdmin.module.css';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Esta importacion es para poder abrir una ventana del sistema
//para asi seleccionar las imagenes

import { Container } from 'reactstrap';
import Dropzone from 'react-dropzone';

import swal from 'sweetalert';
import folder from '../assets/img/folder-filled.png';
import axios from 'axios';

const DashboardCardAdmin = ({
	name,
	email,
	password,
	date_birth,
	profile_picture,
}) => {
	//Estados para editar la imagen
	const [changeProfilePicture, setChangeProfilePicture] = useState(false);
	
	const user = useSelector((state) => state.user);

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

	const [apyKey, setApyKey] = useState('');
	const [nameCloud, setNameCloud] = useState('');

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

	const displayCancel = (event) => {
		event.preventDefault();
		//para el icono solo debes poner el tipo, hay 4
		// error, success, warning, info
		swal({
			title: 'Confirmar',
			text: 'Estas seguro de cancelar el cambio?',
			icon: 'warning',
			buttons: ['No', 'Si'],
		}).then((response) => {
			if (response) {
				if (image.array.length !== 0) {
					deleteImage(image.id_image);
				}
				setImage({ ...image, array: [] });
				setLoading('');
				setChangeProfilePicture(!changeProfilePicture);
				swal({
					title: 'Cancelado con exito',
					text: 'No se a modificado tu perfil',
					icon: 'success',
					buttons: 'Aceptar',
				});
			} else {
				swal({
					title: 'Cancelacion no ejecutada',
					text: '',
					icon: 'success',
					buttons: 'Aceptar',
				});
			}
		});
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
					formData.append('upload_preset', 'usersPictures');
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
				<div className={styles.contentDivImagePreview}>
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
				</div>
			);
		}
	};

	/*******************Codigo de Cloudinary*******************************/
	/**********************************************************************/

	const handleChangeProfilePicture = (event) => {
		event.preventDefault();
		setChangeProfilePicture(!changeProfilePicture);
	};

	const handleUpdateProfilePicture = async (event) => {
		event.preventDefault();
		console.log('Entro en la funcion');
		if (image.array.length !== 0) {
			const newProfilePicture = {
				profile_picture: image.array[0],
				id_picture: image.id_image,
			};
			try {
				const { data } = await axios.put(
					`/auth/update-user/${user.id}`,
					newProfilePicture,
				);
				swal({
					title: 'Perfil actualizado',
					text: 'Se ha cambiado su imagen de perfil de manera exitosa, reinicie sesión para ver los cambios',
					icon: 'success',
					buttons: 'Aceptar',
				}).then((response) => {
					if (response) {
						window.location.reload();
					}
				});
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		} else {
			displayFailedMessage('Primera elija una imagen');
		}
	};

	return (
		<Card>
			<div className={styles.container}>
				<CardContent>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center' }}
					>
						Mi perfil
					</Typography>
					<div className={styles.InfoContainer}>
						<div className={styles.contentProfile}>
							<div className={styles.contentPicture}>
								<div className={styles.contentProfilePicture}>
									<img src={user.profile_picture} alt="Imagen de perfil" />
								</div>
								<div className={styles.editIcon}>
									{changeProfilePicture ? (
										<CancelIcon onClick={displayCancel} fontSize="small" />
									) : (
										<EditRoundedIcon
											onClick={handleChangeProfilePicture}
											fontSize="small"
										/>
									)}
								</div>
							</div>
						</div>
						<div className={styles.info}>
							<Typography
								variant="body1"
								color="text.secondary"
								sx={{ fontSize: '30px', fontWeight: 'bold' }}
							>
								{user.first_name + ' ' + user.last_name}
							</Typography>
							<Typography
								variant="body1"
								color="text.secondary"
								sx={{ fontSize: '23px' }}
							>
								{user.email}
							</Typography>
							<Typography
								variant="body1"
								color="text.secondary"
								sx={{ fontSize: '23px' }}
							>
								Contraseña: *****************
							</Typography>

							<div className={styles.buttons}>
								<Link className={styles.link} to="/forget_password_one">
									¿Quieres cambiar tu contraseña?
								</Link>
							</div>
						</div>
					</div>
				</CardContent>
				{changeProfilePicture && (
					<div className={styles.contentBox}>
						<div className={styles.contentBoxFolder}>
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
										<div className={styles.contentButtonImagenPreview}>
											<button
												onClick={displayOptions}
												className={styles.button}
											>
												X
											</button>
										</div>
									)}
								</div>
							)}
						</div>
						<div className={styles.contentButtonOptions}>
							<button onClick={displayCancel} className={styles.button}>
								Cancelar
							</button>
							<button
								onClick={handleUpdateProfilePicture}
								className={styles.button}
							>
								Cambiar
							</button>
						</div>
					</div>
				)}
			</div>
			<ToastContainer />
		</Card>
	);
};

export default DashboardCardAdmin;
