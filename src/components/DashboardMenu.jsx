import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import WineBarRoundedIcon from '@mui/icons-material/WineBarRounded';
import LiquorRoundedIcon from '@mui/icons-material/LiquorRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import MarkAsUnreadRoundedIcon from '@mui/icons-material/MarkAsUnreadRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';

export default function DashboardMenu({ onClick }) {
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();

	const handleItemClick = (option) => {
		onClick(option);
	};

	return (
		<Paper sx={{ width: 500, maxWidth: '100%' }}>
			<MenuList>
				<MenuItem onClick={() => handleItemClick('profile')}>
					<ListItemIcon>
						<AccountCircleIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>Perfil</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => handleItemClick('wine')}>
					<ListItemIcon>
						<WineBarRoundedIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>Vinos</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => handleItemClick('liquor')}>
					<ListItemIcon>
						<LiquorRoundedIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>Licores</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => handleItemClick('productMonth')}>
					<ListItemIcon>
						<MonetizationOnRoundedIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>Producto del mes</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => handleItemClick('discountedProducts')}>
					<ListItemIcon>
						<LocalOfferRoundedIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>Productos en oferta</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => handleItemClick('users')}>
					<ListItemIcon>
						<GroupRoundedIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>Usuarios</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => handleItemClick('pendingShipments')}>
					<ListItemIcon>
						<MarkAsUnreadRoundedIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>Envíos pendientes</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => handleItemClick('completedShipments')}>
					<ListItemIcon>
						<MarkEmailReadRoundedIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>Envíos realizados</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => handleItemClick('create')}>
					<ListItemIcon>
						<AddCircleOutlineRoundedIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>Cargar producto</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => handleItemClick('load new category')}>
					<ListItemIcon>
						<CategoryRoundedIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>Cargar nueva categoría</ListItemText>
				</MenuItem>
			</MenuList>
		</Paper>
	);
}
