import React, { useState} from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styles from "../assets/styles/components/DashboardCardAdminUsers.module.css";


const DashboardCardAdminUsers = ({
  name,
  email,
  date_birth,
  profile_picture,
 }) => {

  return (
    <Card>
        <div className={styles.container}>
            <CardContent>
                <Typography gutterBottom variant="h2" component="div">
                Perfil de usuario
                </Typography>
                <div className={styles.InfoContainer}>
                    <div className={styles.contentProfile}>
                        <div className={styles.contentPicture}>
                            <img src={profile_picture} alt="Imagen de perfil" />
                        </div>
                    </div>
                    <div className={styles.info}>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize:'30px', fontWeight: 'bold' }}>
                        Nombre: {name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize:'23px' }}>
                        Email: {email}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize:'23px' }}>
                        Fecha de nacimiento: {date_birth}
                        </Typography>
                    </div>
                </div>
            </CardContent>
            <div className={styles.buttons}>
                <button>Eliminar usuario</button>
                <button>Hacer administrador</button>
            </div>
        </div>
    </Card>
  );
};

export default DashboardCardAdminUsers;
