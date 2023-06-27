import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import InventoryIcon from '@mui/icons-material/Inventory';
import styles from "../assets/styles/components/DashboardCard.module.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DescriptionWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
}));

const EditIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  wordWrap: 'break-word',
}));

export default function RecipeReviewCard({name, picture, description, stock}) {
  const [expanded, setExpanded] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleVisibilityClick = () => {
    setVisible(!visible);
  };

  return (
    <Card className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <CardMedia
          component="img"
          image= {picture}
          alt="Imagen del vino"
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name || 'Nombre del producto'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="toggle visibility" onClick={handleVisibilityClick}>
          {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
        <IconButton>
          <InventoryIcon/>
          {stock || 'Stock'}
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <DescriptionWrapper>
            <DescriptionText paragraph>
              {description || 'Descripcion del producto'}
            </DescriptionText>
            <EditIconWrapper>
              <IconButton>
                <EditIcon fontSize="small" />
              </IconButton>
            </EditIconWrapper>
          </DescriptionWrapper>
        </CardContent>
      </Collapse>
    </Card>
  );
}
