import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { userLogoutAttempt } from '../../redux/Auth/auth.action';
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
   const { isAuthenticated } = props;
   const { user } = props;

  return (
    <>  
    {
      isAuthenticated && user.is_client === true ? (
          <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Mon compte
        </Button>
            <StyledMenu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}

            >
            <StyledMenuItem className="h-10" onClick={() => logout()}><span className="text-white" >Se déconnecter</span> </StyledMenuItem>
            </StyledMenu>
          </div>

      ) :
      
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Mon compte
        </Button>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        
        >
          
          <StyledMenuItem className="h-10" onClick={() => logout()}><span className="text-white" >Se déconnecter</span> </StyledMenuItem>
        </StyledMenu>
    </div>
    }
    </>);
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