import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styles from '../assets/styles/components/DashboardCardAdmin.module.css';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardCardAdmin = ({
	name,
	email,
	password,
	date_birth,
	profile_picture,
}) => {
	//Estados para editar la imagen
	const [isEditingImage, setIsEditingImage] = useState(false);
	const [newProfilePicture, setNewProfilePicture] = useState(profile_picture);

	const user = useSelector((state) => state.user);
	const handleEditImageClick = () => {
		setIsEditingImage(true);
	};

	const handleSaveChanges = () => {
		// Guardar los cambios y actualizar el estado profile_picture
		setNewProfilePicture(newProfilePicture);
		setIsEditingImage(false);
	};

	//Estado para editar la clave
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	return (
		<Card>
			<div className={styles.container}>
				<CardContent>
					<Typography
						gutterBottom
						variant="h2"
						component="div"
						style={{ textAlign: 'center' }}
					>
						Mi perfil
					</Typography>
					<div className={styles.InfoContainer}>
						<div className={styles.contentProfile}>
							<div className={styles.contentPicture}>
								{isEditingImage ? (
									<div>
										<input
											type="file"
											accept="image/*"
											onChange={(event) =>
												setNewProfilePicture(
													URL.createObjectURL(event.target.files[0]),
												)
											}
										/>
										<img src={newProfilePicture} alt="Imagen de perfil" />
									</div>
								) : (
									<div>
										<img src={user.profile_picture} alt="Imagen de perfil" />
										<div
											className={styles.editIcon}
											onClick={handleEditImageClick}
										>
											<EditRoundedIcon fontSize="small" />
										</div>
									</div>
								)}
							</div>
							{isEditingImage && (
								<div className={styles.buttonSave}>
									<button onClick={handleSaveChanges}>Guardar cambios</button>
								</div>
							)}
						</div>
						<div className={styles.info}>
							<Typography
								variant="body1"
								color="text.secondary"
								sx={{ fontSize: '30px', fontWeight: 'bold' }}
							>
								{user.first_name + " " + user.last_name}
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
							{!isEditing && (
								<div className={styles.buttons}>
									<Link to="/forget_password_one">
										¿Quieres cambiar tu contraseña?
									</Link>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</div>
		</Card>
	);
};

export default DashboardCardAdmin;
