import React from 'react';
import { useState } from 'react';
import exios from 'axios';
import { useSelector } from 'react-redux';
//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../assets/styles/components/CreateCategory.module.css';
const CreateCategoryWine = () => {
	const user = useSelector((state) => state.id);
	const [option, setOption] = useState('vino');
	const [form, setForm] = useState({
		name: '',
	});

	//Toastify module for success message
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

	// Toastify module for error messages
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

	const handleOption = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setOption(value);
	};

	const handleChangeName = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setForm({ name: value });
	};

	return (
		<div className={styles.container}>
			<select name="" id="" onChange={handleOption}>
				<option value="vino">Vino</option>
				<option value="licor">Licor</option>
			</select>
			<div>
				<label htmlFor="name">Ingrese la categoria</label>
				<input
					type="text"
					name="name"
					value={form.name}
					onChange={handleChangeName}
				/>
			</div>
			<ToastContainer />
		</div>
	);
};

export default CreateCategoryWine;
