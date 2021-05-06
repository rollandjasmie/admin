import React,{useState} from 'react';
import history from "../../../../history";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    height : 400,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Calendar_modif(props) {
   const [arrivee,setArrivee]=useState()
   const [depart,setDepart]=useState()

  const modif_arrivee = (e)=>{
   setArrivee(e.target.value)
   console.log(arrivee) 
  }

  const modif_depart = (e)=>{
  setDepart(e.target.value)
   console.log(depart)
  }
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  
  const valider = () => {

  axios.put(`/logements/${props.logement_id}/reservations/${props.id}`, {
                arrivee: arrivee,
                depart:  depart
              })
  console.log(props.logement_id)
    handleClose()
    history.push(`/logements/${props.logement_id}/details_reservation/${props.id}`)

  }
  return (
    <div className="flex justify-center" >
      
        <h1 onClick={handleOpen} className="border rounded h-10 w-9/12 flex justify-center items-center text-xs text-gray-700 my-3 cursor-pointer"> Modifier les dates de séjour</h1>
    
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={`block ${classes.paper}`}>
            <div>  <input type="date" className="appearance-none text-center px-5 w-42 h-10 bg-gray-100 text-gray-700 border-2 border-gray-200
        rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500 mx-2 my-4 placeholder-blue-500" onChange={modif_arrivee}/></div>
          <div>   <input type="date" className="appearance-none text-center px-5 w-42 h-10 bg-gray-100 text-gray-700 border-2 border-gray-200
      rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500 mx-2 my-4 placeholder-blue-500" onChange={modif_depart}/></div>
         <div className="w-full flex justify-center">  <button className=" my-5 px-4 py-1 text-white rounded" onClick={valider}>valider</button></div>
          
          </div>
        </Fade>
      </Modal>
    </div>
  );
}