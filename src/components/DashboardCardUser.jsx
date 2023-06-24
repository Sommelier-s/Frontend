import React, { useState} from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const DashboardCardUser = ({ name, email, password }) => {

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Perfil de Usuario
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Nombre: {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Email: {email}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Contraseña: {password}
        </Typography>
        {!isEditing && (
          <Button variant="outlined" onClick={handleEditClick}>
            Editar campos
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCardUser;
