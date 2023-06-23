import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';



const Login = ({ handleChange }) => {
  const paperStyle = { padding: 20, height: '73vh', width: 500, margin: '0 auto' };
  const avatarStyle = { backgroundColor: '#1bbd7e' , fontFamily: 'felixti'};
  const btnstyle = { margin: '8px 0' , fontFamily: 'felixti'};
  const marginTop = { marginTop: 10 };
  const initialValues = {
    email: '',
    password: '',
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Ingrese un correo electrónico válido').required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <br/>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Email"
                name="email"
                placeholder="Ingrese su email"
                fullWidth
                required
                helperText={<ErrorMessage name="email" />}
                error={props.errors.email && props.touched.email}
                style={marginTop}
              />
              <Field
                as={TextField}
                label="Contraseña"
                name="password"
                placeholder="Ingrese su contraseña"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
                error={props.errors.password && props.touched.password}
                style={marginTop}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Recuérdame"
              />
              <br/>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                style={btnstyle}
                fullWidth
              >
                {props.isSubmitting ? 'Cargando' : 'Iniciar sesión'}
              </Button>
            </Form>
          )}
        </Formik>
        <br/>
        <Typography>
          <Link href="#">¿Olvidaste tu contraseña?</Link>
        </Typography>
        <Typography>
          ¿No tienes una cuenta?
          <Link href="#" onClick={() => handleChange('event', 1)}>
            Registrarse
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
