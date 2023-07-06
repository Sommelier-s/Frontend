import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import swalt from 'sweetalert';

import {
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	Rating,
} from '@mui/material';
import { styled } from '@mui/system';

import styles from '../assets/styles/components/DashboardCardProductUser.module.css';

import axios from 'axios';
import swal from 'sweetalert';

const ScrollableCardContent = styled(CardContent)`
	overflow: auto;
	max-height: 400px;
`;

const DashboardCardProductUser = ({ product }) => {
	const user = useSelector((state) => state.user);
	const idUser = user.id;

	const [comment, setComment] = useState('');
	const [rating, setRating] = useState(0);

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};

	const handleRatingChange = (value) => {
		setRating(value);
	};

	const handleSubmit = (event) => {
		swal({
			title: 'Producto puntuado',
			text: 'Se guardo su comentario y puntuacion',
			icons: 'success',
			buttons: 'Aceptar',
		});

		setComment('');
		setRating(0);
		if (product.wine_category) {
			axios.post(`/ratingWines/?id=${idUser}`, {
				productId: product.id,
				puntuation: rating,
				comment: comment,
			});
		} else {
			axios.post(`/ratingLiquors/?id=${idUser}`, {
				productId: product.id,
				puntuation: rating,
				comment: comment,
			});
		}
		// Restablecer los valores del formulario
		setComment('');
		setRating(0);
	};

	return (
		<Card className={styles.card}>
			<ScrollableCardContent>
				<div className={styles.imageItems}>
					<img
						src={product.picture}
						alt={product.name}
						className={styles.productImage}
					/>
					<div>
						<Typography variant="h4" color="text.secondary">
							{product.name}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Precio: {product.price}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Descripción: {product.description}
						</Typography>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<TextField
						label="Dejar un comentario"
						value={comment}
						onChange={handleCommentChange}
						multiline
						rows={4}
						fullWidth
						required
					/>
					<Rating
						name="product-rating"
						value={rating}
						onChange={(event, value) => handleRatingChange(value)}
						size="large"
					/>
					<Button type="submit" variant="contained" color="primary">
						Enviar
					</Button>
				</form>
			</ScrollableCardContent>
		</Card>
	);
};

export default DashboardCardProductUser;
