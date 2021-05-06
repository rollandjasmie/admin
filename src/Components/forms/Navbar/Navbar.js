import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import DropDown from '../DropDown/DropDown';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { userLogoutAttempt } from '../../../redux/Auth/auth.action';
import ListItemText from "@material-ui/core/ListItemText";

import '../HomePage.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import logoo from '../../../assets/images/logo.jpg';


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

function Navbar(props) {

      const { isAuthenticated } = props;
     
      const { user } = props;
      const logout = () => {
    
        props.userLogoutAttempt()
      }
      const [anchorEl, setAnchorEl] = React.useState(null);

      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      return (
          <>
              <header className="text-blue-500 body-font ">
                  { !isAuthenticated ? (
                <div className="container mx-auto flex p-1 flex-col md:flex-row items-center">
                  <div className="w-6/12 ">   <NavLink to="/" onClick={() => window.location.reload()} className="flex  title-font font-medium  items-center text-gray-600 mb-4 md:mb-0">
                    <img className="w-40 pt-2 mx-2" src={logoo}></img>
                  </NavLink></div>
             
                  
                  <NavLink to="/signup"  className="  flex flex-wrap items-center text-base justify-center">
                    <a className="  text-blue-500 ">Ajouter un hébergement</a>
                  </NavLink>
                 
                  <form>
                    <>
                      <div className="flex mx-2">
                        <DropDown title="Espace propriétaire" className="nav-action mx-5">
                          <NavLink to="/signup"><div className="item">Gérer mes annonces</div></NavLink>
                          <NavLink to="/signup"><div className="item">Service à la carte</div></NavLink>
                        </DropDown>

                        <DropDown title="Espace voyageur" className="nav-action">
                          <NavLink to="/Inscription"><div className="item">S'inscrire</div></NavLink>
                          <NavLink to="/Connexion"><div className="item">Se connecter</div></NavLink>
                        </DropDown>
                      </div>
                    </>
                  </form>
                </div>) : null}
                 { isAuthenticated && user.is_client === false ? (
                    <>
                    <div className="flex flex-wrap p-1 flex-col md:flex-row items-center">
                  <NavLink to="/" onClick={() => window.location.reload()} className=" flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img className="w-40 pt-2 mx-2" src={logoo}></img>
                  </NavLink>
                  <NavLink to="/AjoutHebergements"  className="md:ml-auto flex flex-wrap items-center text-base justify-end">
                    <a className=" hover:text-gray-600">Ajouter un hébergement</a>
                  </NavLink>
                  <form>
                    <>
                      <div className="flex ">
                        <DropDown title="Espace propriétaire" className="nav-action mx-3 ml-5">
                          <NavLink to="/Dashboard"><div className="item">Gérer mes annonces</div></NavLink>
                          <NavLink to=""><div className="item">Service à la carte</div></NavLink>
                        </DropDown>

                        {/* <DropDown title="Espace voyageur" className="nav-action">
                          <NavLink to=""><div className="item">S'inscrire</div></NavLink>
                          <NavLink to=""><div className="item">Se connecter</div></NavLink>
                        </DropDown> */}
                      </div>
                    </>
                  </form>
                </div>
                    
                    </>
                  ) : null }
                   {  isAuthenticated && user.is_client === true ? (
                    <>
                    <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
                  <NavLink to="/" onClick={() => window.location.reload()} className=" flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img className="w-40 pt-2 mx-2" src={logoo}></img>
                  </NavLink>
                  <NavLink to="/AjoutHebergements"  className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                   
                  </NavLink>
                  <form>
                    <>
                      <div className="flex items-center">
                            <p className="text-gray-600 text-lg font-medium uppercase">{user.name}<span className="mx-2 capitalize">{user.first_name} </span></p>
                           <div>
                            <Button aria-controls="simple-menu" className="focus:outline-none" aria-haspopup="true" onClick={handleClick}>
                            <GiHamburgerMenu style={{height:25,width:25,color:'grey'}} />
                            </Button>
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
                              <StyledMenuItem className="h-10"><NavLink to="/EditProfil"><span className="text-white" >Mon compte</span> </NavLink> </StyledMenuItem>
                              <StyledMenuItem className="h-10" onClick={() => logout()}><span className="text-white" >Se déconnecter</span>  </StyledMenuItem>
                              </div>
                            </StyledMenu>
                          </div>
                        {/* <DropDown title="Espace propriétaire" className="nav-action mx-5">
                          <NavLink to="/EditProfil"><div className="item">Mon compte</div></NavLink>
                          <div className="item" onClick={() => logout()}>Se deconnecter</div>
                        </DropDown> */}

                        {/* <DropDown title="Espace voyageur" className="nav-action">
                          <NavLink to=""><div className="item">S'inscrire</div></NavLink>
                          <NavLink to=""><div className="item">Se connecter</div></NavLink>
                        </DropDown> */}
                      </div>
                    </>
                  </form>
                </div>
                    
                    </>
                  ) : null }
              </header>
          </>
        )
    }


const mapStateToProps = (state) => {
  return {
    ...state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      userLogoutAttempt: () => dispatch(userLogoutAttempt())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar);