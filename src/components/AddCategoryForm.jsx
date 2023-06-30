import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';

export default function AddCategoryForm() {

  const desarrolloApp = 'http://localhost:3001';
  const [product, setProduct] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const user = useSelector((state) => state.user);

  const displaySuccessMessage = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const displayFailedMessage = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const showAlert = () => {
    displayFailedMessage('Completa todos los campos del formulario.');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (product && categoryName) {
      const categoryData = {
        name: categoryName,
      };

      try {
        let response;
        if (product === 'wine') {
          response = await axios.post(`${desarrolloApp}/category_wine/?id=${user.id}`, categoryData);
        } else if (product === 'liquor') {
          response = await axios.post(`${desarrolloApp}/category_liquor?id=${user.id}`, categoryData);
        }

        setProduct('');
        setCategoryName('');
        displaySuccessMessage('Categoría agregada exitosamente');
        console.log('Respuesta del servidor:', response);
      } catch (error) {
        displayFailedMessage('Hubo un error al agregar la categoría');
      }
    } else {
      showAlert();
    }
  };

  const paperStyle = {
    padding: '30px 20px',
    width: 500,
    margin: '0px auto',
  };
  const avatarStyle = {
    backgroundColor: '#1bbd7e',
  };
  const headerStyle = {
    margin: '10px 0',
  };
  const marginTop = {
    marginTop: 10,
  };
  const btnstyle = {
    marginTop: 15,
    backgroundColor: '#780000',
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <CategoryIcon />
            </Avatar>
            <Typography variant="h5" style={headerStyle}>
              Agregar nueva categoría
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} style={marginTop}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Producto</InputLabel>
                  <Select
                    label="Producto"
                    name="product"
                    value={product}
                    onChange={(event) => setProduct(event.target.value)}
                    variant="outlined"
                  >
                    <MenuItem value="wine">Vino</MenuItem>
                    <MenuItem value="liquor">Licor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre de la categoría"
                  placeholder="Nombre de la categoría"
                  name="categoryName"
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={btnstyle}
                >
                  Agregar categoría
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};
