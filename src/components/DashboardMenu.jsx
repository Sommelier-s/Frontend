import * as React from 'react';
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

export default function DashboardMenu({ onClick }) {
  const handleItemClick = (option) => {
    onClick(option);
  };

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
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
          <ListItemText>Envios Pendientes</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleItemClick('completedShipments')}>
          <ListItemIcon>
            <MarkEmailReadRoundedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Envios Realizados</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
