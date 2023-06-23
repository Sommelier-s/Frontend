import React from 'react';
import { useNavigate } from 'react-router-dom';
const DashboardUser = () => {
	const navigate = useNavigate();
	return (
		<div>
			Bienvenido al dashboard del User
			<button onClick={() => navigate('/')}>Volver</button>
		</div>
	);
};

export default DashboardUser;
