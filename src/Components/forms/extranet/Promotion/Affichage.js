import React from 'react';

import StepProgress from './StepProgress';
import Promotion from './Promotion'
import Recapitulatif from './Recapitulatif'


export default function Affichage(props) {
    const { match: { params } } = props




    const [activeStep, setActiveStep] = React.useState(0);



    const [formValue, setFormValue] = React.useState({
   recapu:{
       temps:null,
       reduction:null,
       name_promotion:null,
       datevuedebut:null,
       datevuefin:null,
       datedebut:null,
       datefin:null,
       types:null,
       vu:null
   }
    });

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };


    const previousStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    
    const getStepContent = () => {
        switch (activeStep) {
            case 0:
                return <Promotion
                    nextStep={nextStep}
                    logement_id={params.logement_id}
                    setFormValue={setFormValue}
                    formValue={formValue} />;
            case 1:
                return <Recapitulatif
                    previousStep={previousStep}
                    logement_id={params.logement_id}
                    nextStep={nextStep}
                    setFormValue={setFormValue}
                    formValue={formValue} />;
        }
    }

    

    return (
        <>
        <StepProgress activeStep={activeStep} />
                    { getStepContent()}
            
        </>
    );
}


