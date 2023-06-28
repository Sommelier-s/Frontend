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
        <div className={styles.containerUser}>
            <CardContent>
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
                    </div>
                    <div className={styles.buttons}>
                        <button>Eliminar</button>
                        <button>Nombrar como administrador</button>
                    </div>
                </div>
            </CardContent>
        </div>
    </Card>
  );
};

export default DashboardCardAdminUsers;
