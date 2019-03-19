import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    display: 'inline-block',
    margin: '1rem',
    maxWidth: 345,
    textAlign: 'left',
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  content: {
  },
  buy: {
        marginLeft: 'auto',
  },
};

function Badge(props) {
  const { classes, image, name, price, expires, buy } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={name}
          className={classes.media}
          height="240"
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography
            component="p"
            className={classes.content}
        >
            Price: {price} ETH<br />
            Expires: {expires}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={buy} className={classes.buy}>
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired,
  buy: PropTypes.func.isRequired,
};

export default withStyles(styles)(Badge);