import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import styles from "../assets/styles/components/DashboardUserReview.module.css";

import jack_copy from "../assets/img/jack_copy.png"



const DashboardCardProductUserReview = ({

}) => {

    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <Card className={styles.card}>
            <div className={styles.imageItems}>
                <img src={jack_copy} alt="img" className={styles.productImage} />

                <div className={styles.productInfo}>
                    <Typography variant="h4" color="text.secondary">
                        Nombre del producto
                    </Typography>

                    <Typography variant="body1" color="text.secondary" className={styles.comment}>
                        Comentario: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    </Typography>

                    <div className={styles.starRating}>
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} className={styles.starIcon} />
          ))}
        </div>
        {!isEditing && (
                  <div className={styles.buttons}>
                    <button onClick={handleEditClick}>Editar Comentario</button>       
                  </div>
          )}
                </div>
            </div>
        </Card>


    );
};

export default DashboardCardProductUserReview;