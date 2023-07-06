import React from 'react';
import { useState } from 'react';

//Importo lo necesario para toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../assets/styles/components/CreateCategory.module.css';
const CreateCategoryWine = () => {
	const [option, setOption] = useState('vino');
	const [form, setForm] = useState({
		name: '',
	});

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
