import React from 'react';
import InformationLogements from '../Logements/InformationLogements';
import Localisation from '../Logements/Localisation';
import Chambres from '../Logements/Chambres';
import Regle from '../Logements/Regle';
import MapContainers from '../Logements/MapContainers'
import StepProgress from './components/StepProgress';
import Equipement from '../Logements/Equipement';
import CalendrierContainer from '../Logements/CalendrierContainer';
import Conditions from '../Logements/Conditions'
import axios from '../../axios'
import ShowUser from '../Logements/ShowUser'
import Uploadphoto from "../Logements/Uploadphoto";
import InformationHeb from "../Logements/InformationHeb";
import InfoRunbnb from '../Logements/InfoRunbnb';
import PageCharte from '../Logements/PageCharte';
import history from '../../history';
import Loading from './Chargementajout';


export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formValue, setFormValue] = React.useState({
    loading: true,
    hebergement: {
      name: '',
      types: '',
      categorie: '',
    },
    localisation:{
      pays: 'La Réunion',
      ville: '',
      adresse:'',
      code: '',
    },
    personne:0
    ,
    map:{
      latitude:-21.121661209928707,
      longitude:55.53817922704148,
      zoom: 12.5
    },
  
    canapes: {
      canapes: [
        {
          checked: false,
          quantite: 0,
          name: " Canapés"
        },
        {
          checked: false,
          quantite: 0,
          name: "Canapés lits"
        }

      ]
    },
    autres: {
      autres: [
        {
          checked: false,
          quantite: 0,
          name: "Lit Simple"
        },
        {
          checked: false,
          quantite: 0,
          name: "Lit Double"
        },
        {
          checked: false,
          quantite: 0,
          name: "Lit Famille"
        }
      ]
    },

    title: {},
    
    photo:null,
    regles: {
        regle: [],
        arrive1:'',
        arrive2:'',
        depart1:'',
        depart2:'',
      },
    // date:{
    //    startDate:"",
    //    endDate:"",
    // },
    conditions:null,
    Lits:
    {
      Lits: [
        {
          checked: false,
          quantite: 0,
          name: "Lit Double"
        },
        {
          checked: false,
          quantite: 0,
          name: "Lit Simple"
        },
        {
          checked: false,
          quantite: 0,
          name: "Lit King-size"
        },
        {
          checked: false,
          quantite: 0,
          name: "Lit Superposé"
        },
        {
          checked: false,
          quantite: 0,
          name: "Canapé lit"
        },
        {
          checked: false,
          quantite: 0,
          name: "Canapé lit double"
        },
        {
          checked: false,
          quantite: 0,
          name: "Futon"
        }

      ]
    }

  
  });

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  

  const previousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let adresse1 = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 8);
  };
  let nom1 = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 9);
  };
  let map1 = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 7);
  };
  // let li1 = null;
  // let li2 = null;
  // let lit3 = null;
  // let lit = Object.values(formValue.Lits.Lits).map((el,id) => {
  //   id ++
  //   li1 = el
  // })
  //JSON.stringify(formData)
  // console.log(li1);
  // formValue.Lits.map((index) => console.log(index.name)) 
  const saveHebergement = () => {
    // // [formValue, setFormValue]
    let formData = new FormData();
    formData.append('hebergement', JSON.stringify(formValue.hebergement))
    formData.append('localisation', JSON.stringify(formValue.localisation))
    formData.append('map', JSON.stringify(formValue.map))
    formData.append('personne', JSON.stringify(formValue.personne))
    formData.append('canapes', JSON.stringify(formValue.canapes.canapes))
    formData.append('autres', JSON.stringify(formValue.autres.autres))
    formData.append('title', JSON.stringify(formValue.title))
    formData.append('regles', JSON.stringify(formValue.regles))
    // formData.append('date', JSON.stringify(formValue.date))
    formData.append('conditions', JSON.stringify(formValue.conditions))
    formData.append('Lits', JSON.stringify(formValue.Lits.Lits))
    formValue.photo.map((photo)=>{
      formData.append('photo[]', photo)      
    })
        const load = async () => {
          setFormValue({
            loading: !formValue.loading,
          })
          await
          axios.post('/logements', formData)
        
            history.push('/Dashboard')          
        }
        load ()
  }

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <InformationLogements 
                  nextStep={nextStep}
                  formValue={formValue}
                  setFormValue={setFormValue}/>;
      case 1:
        return <Localisation
                  previousStep={previousStep}
                  nextStep={nextStep}
                  formValue={formValue}
                  setFormValue={setFormValue}/>;
      case 2:
        return <MapContainers 
                previousStep={previousStep}
                nextStep={nextStep}
                formValue={formValue}
                setFormValue={setFormValue}
                   />;
       
     
      case 3:  
              return  <Chambres
                  previousStep={previousStep}
                  nextStep={nextStep}
                  formValue={formValue}
                  setFormValue={setFormValue}
                  /> 
       

      case 4:
        return <Equipement
        previousStep={previousStep}
        nextStep={nextStep}
        formValue={formValue}
        setFormValue={setFormValue}/>

        case 5:
              return   <Regle
              previousStep={previousStep}
              nextStep={nextStep}
              formValue={formValue}
              setFormValue={setFormValue}
              />;    
        case 6:
              return  (<Uploadphoto
              previousStep={previousStep}
              nextStep={nextStep}
              formValue={formValue}
              setFormValue={setFormValue} />) ;
      
        
        case 7:
              return <Conditions
              previousStep={previousStep}
              nextStep={nextStep}
              formValue={formValue}
              setFormValue={setFormValue}
              />
        // case 8:
        //     return <CalendrierContainer
        //     previousStep={previousStep}
        //     nextStep={nextStep}
        //     formValue={formValue}
        //     setFormValue={setFormValue}/>   
        case 8: 
              return <InformationHeb
            previousStep={previousStep}
            nextStep={nextStep}
            formValue={formValue}
            adresse1={adresse1}
            nom1={nom1}
            map1={map1}
                />
        
        case 9:
             return <InfoRunbnb
             previousStep={previousStep}
            nextStep={nextStep}/>
        
       case 10:
              return <PageCharte
              saveHebergement = {saveHebergement}
              />     

    }
  }

  const stepList = [
  
    {
      title: 'Nom et emplacement',
      sections: [{
        step: 0
      }, {
        step: 1
      }, {
        step: 2
      }]
    }, 
    
    {
  
      title: "Configuration de l'hébergement",

      sections: [{
        step: 3
      }, {
        step: 4
      }, {
        step: 5
      }]
    },

     {
  
      title: "Photos",

      sections: [{
        step: 6
      }]
    },
    
    {
      title: "Tarifs",
      // title: "Tarifs et Calendrier",
        sections: [{
          step: 7
        }
      //   ,
      //   {
      //   step: 8
      // }
    ]
    },
    {
  
      title: "Révision et finalisation",

      sections: [{
        step: 9
      },{
        step: 10
      },{
        step: 11
      }]
    }

    
  
  


    
  
  ]

  return (
    <>
     {
        formValue.loading ? (<> <StepProgress stepList={stepList} activeStep={activeStep} />
          { getStepContent()}</>):(<Loading />)
     }
    </>
  );
}


