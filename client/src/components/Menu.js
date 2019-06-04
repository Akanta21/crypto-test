import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
  },
}));

function ButtonAppBar() {
  const [location, setLocation] = React.useState('Home')
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(location) {
    setAnchorEl(null);
    if (location) {
      setLocation(location)
    }
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
        <MenuIcon onClick={handleClick} />
      </IconButton>
      {/* <Typography variant="h6" className={classes.title}>
        {location}
      </Typography> */}
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleClose('Home')}>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem onClick={() => handleClose('Balance')}>
          <Link to="/balances">Balance</Link>
        </MenuItem>
        <MenuItem onClick={() => handleClose('About')}>
          <Link to="/about">About</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ButtonAppBar;