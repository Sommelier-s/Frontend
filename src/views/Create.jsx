import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '.././assets/styles/components/views/Create.module.css'
import axios from "axios";

export default function Create() {
    const [formSubmit, setFormSubmit] = useState(false);
    const showAlert = () => {
      alert('Por favor complete todos los campos antes de enviar el formulario.');
    };
  return (
    <>
    <div className={styles.contenedor}>
      <Formik
        initialValues={{
          name: '',
          description: '',
          price: '',
          picture: '',
          variety: '',
          stock: '',
        }}
        validate={(values) => {
          let errors = {};

          if (!values.name) {
            errors.name = "Ingrese un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = 'El nombre solo puede contener letras y espacios';
          }

          if (!values.description) {
            errors.description = "Ingrese una descripción";
          } else if (!/^[\w\s\d.,:]+$/u.test(values.description)) {
            errors.description = "La descripción solo puede contener letras, números, espacios y los caracteres . , :";
          }

          if (!values.price) {
            errors.price = "Ingrese un precio";
          } else if (!/^\d+(\.\d{1,2})?$/.test(values.price)) {
            errors.price = "El precio debe ser un número con máximo 2 decimales";
          }

          if (!values.variety) {
            errors.variety = "Ingrese una variedad";
          } else if (!/^[\w\s\d.,:]+$/u.test(values.variety)) {
            errors.variety = "La variedad solo puede contener letras y espacios";
          }

          if (!values.stock) {
            errors.stock = "Ingrese el stock";
          } else if (!/^\d+$/.test(values.stock)) {
            errors.stock = "El stock solo puede contener números";
          }

          if (!values.picture) {
            errors.picture = "Ingrese la URL de la imagen";
          } else if (!/^https?:\/\/\S+$/.test(values.picture)) {
            errors.picture = "Ingrese una URL de imagen válida";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (
            values.name &&
            values.description &&
            values.price &&
            values.variety &&
            values.stock
          ) {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('variety', values.variety);
            formData.append('stock', values.stock);
            formData.append('picture', values.picture);

            try {
              const response = await axios.post('URL_DE_TU_API', formData);
              console.log('Formulario enviado:', values);
              console.log('Respuesta del servidor:', response)
              setSubmitting(false);
              resetForm();
              setFormSubmit(true);
            } catch (error) {
              console.error('Error al enviar el formulario:', error);
              setSubmitting(false);

            }
          } else {
            showAlert();
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
          <Form className={styles.formulario} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Nombre:</label>
              <Field
                type='text'
                id='name'
                name='name'
                placeholder="Nombre del licor/vino..."
              />
              <ErrorMessage name="name" component="div" className={styles.error} />
            </div>
            <div>
              <label htmlFor="description">Descripción:</label>
              <Field
                type='text'
                id='description'
                name='description'
                placeholder="Descripción..."
              />
              <ErrorMessage name="description" component="div" className={styles.error} />
            </div>
            <div>
              <label htmlFor="price">Precio:</label>
              <Field
                type='text'
                id='price'
                name='price'
                placeholder="Precio..."
              />
              <ErrorMessage name="price" component="div" className={styles.error} />
            </div>
            <div>
              <label htmlFor="variety">Variedad:</label>
              <Field
                type='text'
                id='variety'
                name='variety'
                placeholder="Variedad de vino o licor"
              />
              <ErrorMessage name="variety" component="div" className={styles.error} />
            </div>
            <div>
              <label htmlFor="price">Stock:</label>
              <Field
                type='text'
                id='stock'
                name='stock'
                placeholder="Stock..."
              />
              <ErrorMessage name="price" component="div" className={styles.error} />
            </div>
            <div>
              <label htmlFor="picture">Picture URL:</label>
              <Field
                type="text"
                id="picture"
                name="picture"
                placeholder="URL de la imagen"
              />
              <ErrorMessage name="picture" component="div" className={styles.error} />
            </div>
            <button
                type='submit'
                disabled={isSubmitting}
                onClick={() => {
                  console.log('Botón deshabilitado:', isSubmitting);
                  if (
                    !values.name ||
                    !values.description ||
                    !values.price ||
                    !values.variety ||
                    !values.stock
                  ) {
                    showAlert();
                  }
                }}
              >
                Enviar
              </button>
              {formSubmit && <p className={styles.exito}>Producto cargado con éxito!</p>}
            </Form>
        )}
      </Formik>
      </div>
    </>
  );
}


