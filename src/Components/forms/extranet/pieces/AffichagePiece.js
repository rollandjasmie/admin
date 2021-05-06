import React from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import axios from 'axios';




class AffichagePiece extends React.Component{
  state = {
    logement:[],
    chambres:[],
    lits:[],
    canapes:[],
    salons:[],
    autres:[],
    autrelits:[],
    id:null
  };
 
  componentDidMount() {
    axios.get(`/logements/${this.props.logement_id}/chambres`).then(response =>  {
      this.setState({
        chambres:response.data.chambres,
        logement:response.data.logement,
        lits:response.data.lits ,canapes:response.data.canapes,
        autres:response.data.autres,
        autrelits: response.data.autreslits,
        salons:response.data.salons,
        id:response.data.chambres[0].id
      })
      })
  }
    render(){

      const { user } = this.props;
      const { chambres,lits,autres,autrelits,salons,canapes } = this.state;
      console.log(this.state)

      lits.map(ch=>{
        console.log(ch)
      })
                                                                                                  
      return(
        <>
        {
          this.state.id?(
            <Formik>
            <div className="w-full bg-white">
              <div className="flex">
               <h1 className="w-2/3 text-xl font-bold text-gray-700">Pièces et espaces</h1>
               <NavLink to={`/modifierpiece/${this.props.logement_id}/chambre`}>
               <h2 className="text-theme border-2 sansbg rounded px-4 py-2 hover:text-white">Modifier</h2>
               </NavLink>
              </div>

                <div  className="py-4 flex mx-5">
                <div className="w-1/3 py-1">

                  <div>
                  {  chambres.map((ch,index)=>(
                    <>
                    <h1  className=" text-gray-600 text-sm my-2">{ch.title} : {index + 1}</h1>   
                    {lits.map(lit=>{                
                      return(
                      <>
                        {
                          lit.map(li=>{
                            if (li.checked == true && li.chambre_id == ch.id  ) {
                          return (

                            <h1 className=" text-gray-600 text-sm">{li.name} :{li.quantite} </h1>
                          )

                        }
                      })
                          }
                      </>)                      
                        
                      }
                      )
                    }
                    </>
                  ))}

                    
                  </div>              
                  <div className="my-4">
                  {
                    this.state.salons?(
                      <>
                              {salons && salons.map((salon, index) => (
                                <>
                                  <h1 key={salon.id} className=" text-gray-600 text-sm ">{salon.title} : {index + 1}</h1>
                                  {canapes && canapes.map(canape => {
                                    return (
                                      <>
                                        {
                                          canape.map(ca => {
                                            if (ca.checked == true && ca.salon_id == salon.id) {
                                              return (
                                                <h1 key={ca.id} className=" text-gray-600 text-sm ">{ca.name} :{ca.quantite} </h1>
                                              )
                                            }
                                          })
                                        }

                                      </>
                                    )
                                  }
                                  )}
                                </>
                              ))}

                      </>
                    ):null
                  }
                  </div>
                    <div>
                       {
                         this.state.autre?(
                           <>
                              {autres.map(ch => (
                                <h1 className="text-gray-600 text-sm my-2">{ch.title} : 1</h1>
                              )
                              )
                              }
                              {autrelits.map(ch => (
                                <>
                                  {ch.checked == true &&
                                    <h1 className="text-gray-600 text-sm">{ch.name} :{ch.quantite} </h1>
                                  }
                                </>
                              ))}
                           </>
                         ):null
                       }
                      </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                </ div>
            </div> 
          </div>  
        </Formik>
      
          ):null
        }
        </>
        )
    }
  }

export default AffichagePiece;
