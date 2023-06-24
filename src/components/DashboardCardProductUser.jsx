import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Rating } from '@mui/material';
import styles from "../assets/styles/components/DashboardCardProductUser.module.css";
const DashboardCardProductUser = ({ product }) => {

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleCommentChange =(event) => {
        setComment(event.target.value);
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Comentario guardado");
        // Restablecer los valores del formulario
        setComment('');
        setRating(0);
    };

  return (
    <Card className={styles.card}>
      <CardContent>
        <div className={styles.imageItems}>
          <img src={product.picture} alt={product.name} className={styles.productImage} />
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
      </CardContent>
    </Card>
  )
}

export default DashboardCardProductUser;
