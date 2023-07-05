import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styles from '../assets/styles/components/DashboardCardAdminUsers.module.css';
import BlockIcon from '@mui/icons-material/Block';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CardMedia from '@mui/material/CardMedia';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import swal from 'sweetalert';
import axios from 'axios';

const DashboardCardAdminUsers = ({
	id,
	name,
	email,
	date_birth,
	profile_picture,
	isActive,
	isAdmin,
}) => {
	const [blockHover, setBlockHover] = useState(false);
	const [adminHover, setAdminHover] = useState(false);
	const [isBanned, setIsBanned] = useState(false);
	const [isUnbannedHover, setIsUnbannedHover] = useState(false);

	const updateUserInAdmin = async (type) => {
		try {
			const { data } = await axios.put(`/auth/update-user/${id}`, {
				is_Admin: type,
				email,
				name,
			});
			
		} catch (error) {
			console.log(error);
		}
	};

	const updateUserInBanned = async (type) => {
		try {
			const { data } = await axios.put(`/auth/update-user/${id}`, {
				isActive: type,
				email,
				name,
			});
			
		} catch (error) {
			console.log(error);
		}
	};

	// const sendEmailOfNotification = async (datos) => {
	// 	console.log('Se llamo a la funcion');
	// 	try {
	// 		const { data } = await axios.post(`/auth/send-email`, datos);

	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const banUser = () => {
		swal({
			title: 'ATENCIÓN!',
			text: '¿Quieres banear a este usuario?',
			icon: 'warning',
			buttons: ['NO', 'SI'],
		}).then((response) => {
			if (response) {
				updateUserInBanned(false);
				setIsBanned(true);
				swal({
					title: 'Usuario baneado',
					text: 'El usuario fue notificado y ya no podra ingresar al sitio',
					icon: 'success',
					buttons: 'aceptar',
				});
			}
		});
	};

	const unbanUser = () => {
		swal({
			title: 'ATENCIÓN!',
			text: '¿Quieres desbanear a este usuario?',
			icon: 'warning',
			buttons: ['NO', 'SI'],
		}).then((response) => {
			if (response) {
				updateUserInBanned(true);
				setIsBanned(false);
				swal({
					title: 'Usuario desbaneado',
					text: 'El usuario fue notificado y  ahora puede ingresar al sitio',
					icon: 'success',
					buttons: 'aceptar',
				});
			}
		});
	};

	const makeAdministrator = () => {
		swal({
			title: 'ATENCIÓN!',
			text: '¿Quieres convertir a este usuario en administrador?',
			icon: 'warning',
			buttons: ['NO', 'SI'],
		}).then((response) => {
			if (response) {
				updateUserInAdmin(true);
				setAdminHover(true);
				swal({
					title: 'Usuario convertido en administrador',
					text: 'El usuario fue notificado y  ahora tiene privilegios de administrador',
					icon: 'success',
					buttons: 'aceptar',
				});
			}
		});
	};

	const makeRegularUser = () => {
		swal({
			title: 'ATENCIÓN!',
			text: '¿Quieres convertir a este usuario en usuario regular?',
			icon: 'warning',
			buttons: ['NO', 'SI'],
		}).then((response) => {
			if (response) {
				updateUserInAdmin(false);
				setAdminHover(false);
				swal({
					title: 'Usuario convertido a usuario regular',
					text: 'El usuario fue notificado y  ahora no tiene privilegios de administrador',
					icon: 'success',
					buttons: 'aceptar',
				});
			}
		});
	};

	useEffect(() => {
		setIsBanned(!isActive);

		console.log(`el ${name} is admin ${isAdmin}`);

		setAdminHover(isAdmin);
	}, []);

	const handleBlockHover = () => {
		setBlockHover(!blockHover);
	};

	const handleAdminHover = () => {
		setAdminHover(!adminHover);
	};

	const handleUnbannedHover = () => {
		setIsUnbannedHover(!isUnbannedHover);
	};

	return (
		<Card className={`${styles.cardMain} ${isBanned ? styles.banned : ''}`}>
			<div className={styles.cardContainer}>
				<div className={styles.imageContainer}>
					<CardMedia
						component="img"
						alt="Foto del usuario"
						height="140"
						image={profile_picture}
					/>
				</div>
				<div className={styles.contentContainer}>
					<CardContent>
						<div className={styles.infoContainer}>
							<Typography
								variant="body1"
								color="text.secondary"
								sx={{ fontSize: '30px', fontWeight: 'bold' }}
							>
								Nombre: {name}
							</Typography>
							<Typography
								variant="body1"
								color="text.secondary"
								sx={{ fontSize: '23px' }}
							>
								Email: {email}
							</Typography>
						</div>
						<div className={styles.buttonsContainer}>
							{!isBanned ? (
								<IconButton
									onMouseEnter={handleBlockHover}
									onMouseLeave={handleBlockHover}
									title={blockHover ? 'Banear usuario' : ''}
								>
									<BlockIcon onClick={banUser} />
								</IconButton>
							) : (
								<IconButton
									onMouseEnter={handleUnbannedHover}
									onMouseLeave={handleUnbannedHover}
									title={isUnbannedHover ? 'Desbanear usuario' : ''}
								>
									<CheckCircleIcon onClick={unbanUser} />
								</IconButton>
							)}

							{!adminHover ? (
								<IconButton title={adminHover ? 'Hacer administrador' : ''}>
									<AdminPanelSettingsIcon onClick={makeAdministrator} />
								</IconButton>
							) : (
								<IconButton title={adminHover ? 'Hacer usuario regular' : ''}>
									<SupervisorAccountIcon onClick={makeRegularUser} />
								</IconButton>
							)}
						</div>
					</CardContent>
				</div>
			</div>
		</Card>
	);
};

export default DashboardCardAdminUsers;
