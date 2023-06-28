import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

import styles from "../assets/styles/components/views/DashboardCardUser.module.css";





const DashboardCardUser = ({
  name,
  email,
  password,
  profile_user }) => {

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Card>
      <div className={styles.container}>
        <CardContent>
          <Typography align='center'gutterBottom variant="h2" component="div">
            Perfil de Usuario
          </Typography>
          <div className={styles.InfoContainer}>
          <div className={styles.contentProfile}>
            <img
              src={profile_user}
              alt="Profile"
              className={styles.contentPicture}
            />
          </div>
          <div className={styles.info}>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize:'30px', fontWeight: 'bold' }}>
                  {name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize:'23px' }}>
                  {email}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize:'23px' }}>
                  Contraseña: {password}
                </Typography>
                {!isEditing && (
                  <div className={styles.buttons}>
                    <button onClick={handleEditClick}>Editar contraseña</button>       
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
