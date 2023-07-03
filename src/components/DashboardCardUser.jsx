import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

import styles from '../assets/styles/components/views/DashboardCardUser.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const DashboardCardUser = ({ name, email, password, profile_user }) => {
	const [isEditing, setIsEditing] = useState(false);
	const user = useSelector((state) => state.user);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	return (
		<Card>
			<div className={styles.container}>
				<CardContent>
					<Typography align="center" gutterBottom variant="h2" component="div">
						Perfil de Usuario
					</Typography>
					<div className={styles.InfoContainer}>
						<div className={styles.contentProfile}>
							<img
								src={user.profile_picture}
								alt="Profile"
								className={styles.contentPicture}
							/>
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

export default DashboardCardUser;
