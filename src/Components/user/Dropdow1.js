import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { userLogoutAttempt } from '../../redux/Auth/auth.action';
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from 'react-redux';


// pesonnalisation du menu
const StyledMenu = withStyles({
  paper: {
    borderRadius: 0,
    backgroundColor: '#F47E54;'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom"
    }}
    transformOrigin={{
      vertical: "top"
    }}
    {...props}
  />
));
//personnalisation du Item menu 

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:active": {
      backgroundColor: '#ffa685;',
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);
 function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    props.userLogoutAttempt()
  }
   const { isAuthenticated } =props;
   const { user } = props;

  return (
    <div>
      <p aria-controls="simple-menu" aria-haspopup="true" className="text-gray-600 cursor-pointer hover text-gray-700 text-lg hover:font-bold focus:outline-none" onClick={handleClick}>
      Mon compte
      </p>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
       
      >
        <div  className="h-full">
          {isAuthenticated && user.is_client === true ? (
            null
          ) :
          <a  className =" text-white hover:no-underline hover:font-normal" href='/EditProfil'> <StyledMenuItem  className="h-10 "> <ListItemText  primary=" Mon Profil" /></StyledMenuItem></a>
            
          }
        <StyledMenuItem className="h-10" onClick={() => logout()}><span className="text-white" >Se déconnecter</span> </StyledMenuItem>
        </div>
      </StyledMenu>
    </div>
  );
}

const mapStateToprops = (state) => {
  return {
    ...state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogoutAttempt: () => dispatch(userLogoutAttempt())
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(SimpleMenu);