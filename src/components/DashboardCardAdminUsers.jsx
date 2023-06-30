import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styles from "../assets/styles/components/DashboardCardAdminUsers.module.css";
import BlockIcon from '@mui/icons-material/Block';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CardMedia from '@mui/material/CardMedia';
import swal from 'sweetalert';

const DashboardCardAdminUsers = ({
  name,
  email,
  date_birth,
  profile_picture,
}) => {
  const [blockHover, setBlockHover] = useState(false);
  const [adminHover, setAdminHover] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [isUnbannedHover, setIsUnbannedHover] = useState(false);

  const banUser = () => {
    swal({
      title: 'ATENCIÓN!',
      text: '¿Quieres banear a este usuario?',
      icon: 'warning',
      buttons: ['NO', 'SI'],
    }).then((response) => {
      if (response) {
        setIsBanned(true);
        swal({
          title: 'Usuario baneado',
          text: 'El usuario ya no podra ingresar al sitio',
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
        setIsBanned(false);
        swal({
          title: 'Usuario desbaneado',
          text: 'El usuario ahora puede ingresar al sitio',
          icon: 'success',
          buttons: 'aceptar',
        });
      }
    });
  };

  const makeAdmin = () => {
    swal({
      title: 'ATENCIÓN!',
      text: '¿Quieres convertir a este usuario en administrador?',
      icon: 'warning',
      buttons: ['NO', 'SI'],
    }).then((response) => {
      if (response) {
        swal({
          title: 'Usuario convertido en administrador',
          text: 'El usuario ahora tiene privilegios de administrador',
          icon: 'success',
          buttons: 'aceptar',
        });
      }
    });
  };

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
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '30px', fontWeight: 'bold' }}>
                Nombre: {name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '23px' }}>
                Email: {email}
              </Typography>
            </div>
            <div className={styles.buttonsContainer}>
            {!isBanned ? (
                <IconButton
                  onMouseEnter={handleBlockHover}
                  onMouseLeave={handleBlockHover}
                  title={blockHover ? "Banear usuario" : ""}
                >
                  <BlockIcon onClick={banUser} />
                </IconButton>
            ) : (
                <IconButton
                  onMouseEnter={handleUnbannedHover}
                  onMouseLeave={handleUnbannedHover}
                  title={isUnbannedHover ? "Desbanear usuario" : ""}
                >
                  <CheckCircleIcon onClick={unbanUser} />
                </IconButton>
            )}
                <IconButton
                    onMouseEnter={handleAdminHover}
                    onMouseLeave={handleAdminHover}
                    title={adminHover ? "Hacer administrador" : ""}
                 >
                <AdminPanelSettingsIcon onClick={makeAdmin} />
              </IconButton>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCardAdminUsers;