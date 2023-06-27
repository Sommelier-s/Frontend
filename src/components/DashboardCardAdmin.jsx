import React, { useState} from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styles from "../assets/styles/components/DashboardCardAdmin.module.css";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const DashboardCardAdmin = ({
  name,
  email,
  password,
  date_birth,
  profile_picture,
 }) => {

  //Estados para editar la imagen
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(profile_picture);

  const handleEditImageClick = () => {
    setIsEditingImage(true);
  };

  const handleSaveChanges = () => {
    // Guardar los cambios y actualizar el estado profile_picture
    setNewProfilePicture(newProfilePicture);
    setIsEditingImage(false);
  };
  
  //Estado para editar la clave
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  return (
    <Card>
      <div className={styles.container}>
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            Perfil de administrador
          </Typography>
          <div className={styles.InfoContainer}>
            <div className={styles.contentProfile}>
              <div className={styles.contentPicture}>
                {isEditingImage ? (
                  <div>
                    <input
                    type='file'
                    accept='image/*'
                    onChange={(event) =>
                      setNewProfilePicture(URL.createObjectURL(event.target.files[0]))}
                      />
                    <img src={newProfilePicture} alt="Imagen de perfil" />
                  </div>
                ) : (
                  <div>
                    <img src={newProfilePicture} alt="Imagen de perfil" />
                    <div className={styles.editIcon} onClick={handleEditImageClick}>
                      <EditRoundedIcon fontSize="small" />
                    </div>
                  </div>
                )}
              </div>
                {isEditingImage && (
                  <div className={styles.buttonSave}>
                    <button onClick={handleSaveChanges}>Guardar cambios</button>
                  </div>
                )}
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
                <Typography variant="body1" color="text.secondary" sx={{ fontSize:'23px' }}>
                  Contraseña: {password}
                </Typography>
            </div>
          </div>
        
          {!isEditing && (
            <div className={styles.buttons}>
              <button onClick={handleEditClick}>Editar contraseña</button>       
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default DashboardCardAdmin;
