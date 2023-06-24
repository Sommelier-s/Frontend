import React from 'react';
import { Paper, MenuList, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const DashboardMenuUser = ({ onClick }) => {

  const handleItemClick = (option) => {
    onClick(option);
  };

  return (
    <Paper>
    <MenuList>
      <MenuItem onClick={() => handleItemClick('profile')}>
        <ListItemIcon>
          <AccountCircleIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Perfil</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleItemClick('purchasedProducts')}>
        <ListItemIcon>
          <ShoppingBasketIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Productos Comprados</ListItemText>
      </MenuItem>
    </MenuList>
  </Paper>
  )
}

export default DashboardMenuUser;
