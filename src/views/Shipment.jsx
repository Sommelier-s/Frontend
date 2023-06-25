import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '.././assets/styles/components/views/Shipment.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Footer from '../components/Footer';
import { desarrolloApp } from '../redux/actions';

export default function Shipment() {
    //const desarrolloApp = 'http://localhost:3001';
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

    const [formSubmit, setFormSubmit] = useState(false);
	const showAlert = () => {
		displayFailedMessage('Completa todos los campos del formulario.');
	};

const initialValues = {
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
};


const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Se hizo clic en el botón Enviar');
    if (
      values.firstName &&
      values.lastName &&
      values.postalCode &&
      values.province &&
      values.city &&
      values.street &&
      values.number &&
      values.phoneNumber
    ) {
      let shipmentData = {
        firstName: values.firstName,
        lastName: values.lastName,
        postalCode: values.postalCode,
        province: values.province,
        city: values.city,
        street: values.street,
        number: values.number,
        floor: values.floor,
        location: values.location,
        phoneNumber: values.phoneNumber,
        additionalInstructions: values.additionalInstructions,
        workInstructions: values.workInstructions,
      };

      try {
        const response = await axios.post(`${desarrolloApp}`, shipmentData);
        setSubmitting(false);
        resetForm();
        displaySuccessMessage('Formulario enviado con éxito');
      } catch (error) {
        displayFailedMessage('Hubo un error');
        setSubmitting(false);
      }
    } else {
        console.log('no se envia form')
      showAlert();
    }
  };


const validate = (values) => {
  const errors = {};

  if (!values.firstName || !/^[a-zA-ZñÑ\s]+$/.test(values.firstName)) {
    errors.firstName = 'Ingrese un nombre válido';
  }
  
  if (!values.lastName || !/^[a-zA-ZñÑ\s]+$/.test(values.lastName)) {
    errors.lastName = 'Ingrese un apellido válido';
  }
  
  if (!values.postalCode || !/^\d+$/.test(values.postalCode)) {
    errors.postalCode = 'Ingrese un código postal válido';
  }
  
  if (!values.province || !/^[a-zA-ZñÑ\s]+$/.test(values.province)) {
    errors.province = 'Ingrese una provincia válida';
  }
  
  if (!values.city || !/^[a-zA-ZñÑ\s]+$/.test(values.city)) {
    errors.city = 'Ingrese una ciudad válida';
  }
  
  if (!values.street || !/^[\w\s\d]+$/.test(values.street)) {
    errors.street = 'Ingrese una calle válida';
  }
  
  if (!values.number || !/^\d+$/.test(values.number)) {
    errors.number = 'Ingrese un número válido';
  }
  
  if (values.floor && !/^[\w\d]+$/.test(values.floor)) {
    errors.floor = 'Ingrese un piso/dpto válido';
  }
  
  if (!values.location || (values.location !== 'casa' && values.location !== 'trabajo')) {
    errors.location = 'Seleccione una opción válida';
  }
  
  if (!values.phoneNumber || !/^[\d()-]+$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Ingrese un número de teléfono válido';
  }
  
  if (values.additionalInstructions && !  /^[a-zA-ZñÑ\s]+$/.test(values.additionalInstructions)) {
    errors.additionalInstructions = 'Ingrese información adicional válida';
  }
  

  return errors;
};


return (
    <>
    <div className={styles.contenedor}>
    <div className={styles.formulario}>
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
        >
        <Form>
            <div className={styles.row}>

            <div className={styles.column}>
                <div>
                <label htmlFor="firstName">Nombre:</label>
                <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={styles.input}
                />
                <ErrorMessage
                    name="firstName"
                    component="div"
                    className={styles.error}
                />
                </div>
            </div>

            <div className={styles.column}>
                <div>
                <label htmlFor="lastName">Apellido:</label>
                <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={styles.input}
                />
                <ErrorMessage
                    name="lastName"
                    component="div"
                    className={styles.error}
                />
                </div>
            </div>

        </div>
            <div className={styles.column}>
                <div>
                <label htmlFor="postalCode">Código Postal:</label>
                <Field
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className={styles.input}
                />
                <ErrorMessage
                    name="postalCode"
                    component="div"
                    className={styles.error}
                />
                </div>
            </div>

            <div className={styles.row}>

            <div className={styles.column}>
                <div>
                <label htmlFor="province">Provincia:</label>
                <Field
                    type="text"
                    id="province"
                    name="province"
                    className={styles.input}
                />
                <ErrorMessage
                    name="province"
                    component="div"
                    className={styles.error}
                />
                </div>
            </div>

            <div className={styles.column}>
                <div>
                <label htmlFor="city">Localidad:</label>
                <Field
                    type="text"
                    id="city"
                    name="city"
                    className={styles.input}
                />
                <ErrorMessage
                    name="city"
                    component="div"
                    className={styles.error}
                />
                </div>
            </div>

            </div>

            <div className={styles.row}>
            <div className={styles.column}>
                <div>
                <label htmlFor="street">Calle:</label>
                <Field
                    type="text"
                    id="street"
                    name="street"
                    className={styles.input}
                />
                <ErrorMessage
                    name="street"
                    component="div"
                    className={styles.error}
                />
                </div>
            </div>
            <div className={styles.column}>
                <div>
                <label htmlFor="number">Número:</label>
                <Field
                    type="text"
                    id="number"
                    name="number"
                    className={styles.input}
                />
                <ErrorMessage
                    name="number"
                    component="div"
                    className={styles.error}
                />
                </div>
            </div>
            </div>

            <div className={styles.row}>
            <div className={styles.column}>
                <div>
                <label htmlFor="floor">Piso/Dpto:</label>
                <Field
                    type="text"
                    id="floor"
                    name="floor"
                    className={styles.input}
                />
                </div>
            </div>
            </div>

            <div>
            <label htmlFor="additionalInstructions">Indicaciones adicionales:</label>
            <Field
                as="textarea"
                id="additionalInstructions"
                name="additionalInstructions"
                className={styles.input}
            />
            <ErrorMessage
                name="additionalInstructions"
                component="div"
                className={styles.error}
            />
            </div>

            <div className={styles.fieldGroup}>
                <label>Es su casa o trabajo:</label>
                <div className={styles.radioGroup}>
                    <label>
                    <Field type="radio" name="location" value="casa" />
                    <span>Casa</span>
                    </label>
                    <label>
                    <Field type="radio" name="location" value="trabajo" />
                    <span>Trabajo</span>
                    </label>
                </div>
                <ErrorMessage name="location" component="div" className={styles.error} />
            </div>


            <div>
            <Field name="location">
                {({ field }) => {
                if (field.value === 'trabajo') {
                    return (
                    <div>
                        <label htmlFor="workInstructions">Indicaciones de trabajo:</label>
                        <Field
                        as="textarea"
                        id="workInstructions"
                        name="workInstructions"
                        style={{ display: 'block' }}
                        className={styles.input}
                        />
                        <ErrorMessage
                        name="workInstructions"
                        component="div"
                        className={styles.error}
                        />
                    </div>
                    );
                }
                return null;
                }}
            </Field>
            </div>

                
            <div>
            <label htmlFor="phoneNumber">Teléfono de contacto:</label>
            <Field
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className={styles.input}
            />
            <ErrorMessage
                name="phoneNumber"
                component="div"
                className={styles.error}
            />
            </div>

            <button type="submit" className={styles.submitButton} >
            Enviar
            </button>
        </Form>
        </Formik>
    </div>
    </div>
    <Footer />
    <ToastContainer />
    </>
  );
}
