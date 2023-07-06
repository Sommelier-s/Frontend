import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Card, CardContent, Typography, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Rating } from '@mui/material';
import jack_copy from '../assets/img/jack_copy.png';
import { DataArray } from '@mui/icons-material';

import styles from '../assets/styles/components/DashboardUserReview.module.css';

import axios from 'axios';
const DashboardCardProductUserReview = () => {
	const user = useSelector((state) => state.user);
	const idUser = user.id;
	const [ratings, setRatings] = useState([]);
	const [isEditing, setIsEditing] = useState(false);

	const getRatings = async () => {
		try {
			const { data } = await axios.get(`/rating/user/${idUser}`);
			setRatings(data.data);
		} catch (error) {
			
		}
	};

	useEffect(() => {
		getRatings();
	}, []);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	console.log(ratings);

	return (
		<>
			{ratings.length !== 0 ? (
				ratings.map((rating, index) => {
					return (
						<Card key={rating.id} className={styles.card}>
							<div className={styles.imageItems}>
								<img
									src={rating.search.picture || jack_copy}
									alt="img"
									className={styles.productImage}
								/>

								<div className={styles.productInfo}>
									<Typography variant="h4" color="text.secondary">
										{rating.search.name || 'Nombre del producto'}
									</Typography>

									<Typography
										variant="body1"
										color="text.secondary"
										className={styles.comment}
									>
										Comentario: "{rating.comment}"
									</Typography>

									<div className={styles.starRating}>
										<Rating
											name={`product-rating-${index}`}
											value={rating.puntuation}
											className={styles.rating}
											// onChange={(event, value) => handleRatingChange(value)}
											size="large"
										/>
									</div>
								</div>
							</div>
						</Card>
					);
				})
			) : (
				<div className={styles.boxReviewNotFound}>
					<h3 className={styles.reviewNotFound}>No tienes reseñas aún...</h3>
				</div>
			)}
		</>
	);
};

export default DashboardCardProductUserReview;
