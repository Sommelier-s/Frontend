import React, { useState } from 'react';
import styles from '.././assets/styles/components/views/Shipment.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Footer from '../components/Footer';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function Shipment() {

    const desarrolloApp = 'http://localhost:3001';

    const displaySuccessMessage = (mensaje) => {
		toast.success(mensaje, {
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

	const displayFailedMessage = (mensaje) => {
		toast.error(mensaje, {
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

const [initialValues,setInitialValues] = useState({
  firstName: '',
  lastName: '',
  postalCode: '',
  province: '',
  city: '',
  street: '',
  number: '',
  floor: '',
  location: '',
  phoneNumber: '',
  additionalInstructions: '',
  workInstructions: '', 
});


const handleSubmit = async ({ resetForm }) => {
    console.log('Se hizo clic en el botón Enviar');
    if (
      initialValues.firstName &&
      initialValues.lastName &&
      initialValues.postalCode &&
      initialValues.province &&
      initialValues.city &&
      initialValues.street &&
      initialValues.number &&
      initialValues.phoneNumber
    ) {
      let shipmentData = {
        firstName: initialValues.firstName,
        lastName: initialValues.lastName,
        postalCode: initialValues.postalCode,
        province: initialValues.province,
        city: initialValues.city,
        street: initialValues.street,
        number: initialValues.number,
        floor: initialValues.floor,
        phoneNumber: initialValues.phoneNumber,
        additionalInstructions: initialValues.additionalInstructions
      };
  
      try {
        const response = await axios.post(`${desarrolloApp}`, shipmentData);
        resetForm();
        displaySuccessMessage('Formulario enviado con éxito');
        console.log('Respuesta del servidor:', response)
      } catch (error) {
        displayFailedMessage('Hubo un error');
      }
    } else {
      console.log('no se envia form')
      showAlert();
    }
  };


const paperStyle = {
  padding: '30px 20px',
  width: 500,
  margin: '20px auto',
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
};

const [errors, setErrors] = useState({});

const validateField = (fieldName, value) => {
  const fieldErrors = {};

  if (!value.trim()) {
    fieldErrors[fieldName] = `El campo ${fieldName} es requerido`;
  } else {
    switch (fieldName) {
      case 'firstName':
        if (!value.match(/^[a-zA-ZñÑ\s]+$/)) {
          fieldErrors.firstName = 'Ingrese un nombre válido';
        }
        break;
      case 'lastName':
        if (!value.match(/^[a-zA-ZñÑ\s]+$/)) {
          fieldErrors.lastName = 'Ingrese un apellido válido';
        }
        break;
      case 'postalCode':
        if (!value.match(/^\d+$/)) {
          fieldErrors.postalCode = 'Ingrese un código postal válido';
        }
        break;
      case 'province':
        if (!value.match(/^[a-zA-ZñÑ\s]+$/)) {
          fieldErrors.province = 'Ingrese una provincia válida';
        }
        break;
      case 'city':
        if (!value.match(/^[a-zA-ZñÑ\s]+$/)) {
          fieldErrors.city = 'Ingrese una ciudad válida';
        }
        break;
      case 'street':
        if (!value.match(/^[\w\s\d]+$/)) {
          fieldErrors.street = 'Ingrese una calle válida';
        }
        break;
      case 'number':
        if (!value.match(/^\d+$/)) {
          fieldErrors.number = 'Ingrese un número válido';
        }
        break;
      case 'floor':
        if (value.trim() && !value.match(/^[\w\d]+$/)) {
          fieldErrors.floor = 'Ingrese un piso/dpto válido';
        }
        break;
      case 'phoneNumber':
        if (!value.match(/^[\d()-]+$/)) {
          fieldErrors.phoneNumber = 'Ingrese un número de teléfono válido';
        }
        break;
      case 'additionalInstructions':
        if (value.trim() && !value.match(/^[a-zA-ZñÑ\s]+$/)) {
          fieldErrors.additionalInstructions =
            'Ingrese información adicional válida';
        }
        break;
      default:
        break;
    }
  }

  setErrors((prevErrors) => ({
    ...prevErrors,
    [fieldName]: fieldErrors[fieldName],
  }));
};

const handleChange = (event) => {
  const { name, value } = event.target;
  setInitialValues((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
  validateField(event.target.name, event.target.value);
};




return (
  <Grid container justifyContent="center" alignItems="center">
    <Grid item xs={12} sm={8} md={6}>
    <Paper style={paperStyle}>
    <Grid align="center">
      <Avatar style={avatarStyle}>
        <LocalShippingIcon />
      </Avatar>
      <Typography variant="h5" style={headerStyle}>
      Ahora completa los campos para el envio!
      </Typography>

    </Grid>
    <form onSubmit={handleSubmit}>
    <Grid container spacing={2} style={marginTop}>
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Nombre"
      placeholder="Nombre"
      name="firstName"
      value={initialValues.firstName}
      onChange={handleChange}
      error={!!errors.firstName}
      helperText={errors.firstName}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Apellido"
      placeholder="Apellido"
      name="lastName"
      value={initialValues.lastName}
      onChange={handleChange}
      error={!!errors.lastName}
      helperText={errors.lastName}
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      fullWidth
      label="Código Postal"
      placeholder="Código Postal"
      name="postalCode"
      value={initialValues.postalCode}
      onChange={handleChange}
      error={!!errors.postalCode}
      helperText={errors.postalCode}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Provincia"
      placeholder="Provincia"
      name="province"
      value={initialValues.province}
      onChange={handleChange}
      error={!!errors.province}
      helperText={errors.province}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Ciudad"
      placeholder="Ciudad"
      name="city"
      value={initialValues.city}
      onChange={handleChange}
      error={!!errors.city}
      helperText={errors.city}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Calle"
      placeholder="Calle"
      name="street"
      value={initialValues.street}
      onChange={handleChange}
      error={!!errors.street}
      helperText={errors.street}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Número"
      placeholder="Número"
      name="number"
      value={initialValues.number}
      onChange={handleChange}
      error={!!errors.number}
      helperText={errors.number}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Piso"
      placeholder="Piso"
      name="floor"
      value={initialValues.floor}
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      fullWidth
      label="Instrucciones Adicionales"
      placeholder="Instrucciones Adicionales"
      name="additionalInstructions"
      value={initialValues.additionalInstructions}
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      fullWidth
      label="Número de Teléfono"
      placeholder="Número de Teléfono"
      name="phoneNumber"
      value={initialValues.phoneNumber}
      onChange={handleChange}
      error={!!errors.phoneNumber}
      helperText={errors.phoneNumber}
    />
  </Grid>
  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    style={btnstyle}
    onClick={() => {
      if (
        !initialValues.firstName ||
        !initialValues.lastName ||
        !initialValues.postalCode ||
        !initialValues.province ||
        !initialValues.location ||
        !initialValues.street ||
        !initialValues.number ||
        !initialValues.phoneNumber ||
        !initialValues.additionalInstructions
      ) {
        showAlert();
      }
    }}
  >
    Cargar datos de envío
  </Button>
</Grid>


    </form>
    </Paper>
    </Grid>
    <Footer />
    <ToastContainer />
  </Grid>
  );
}
