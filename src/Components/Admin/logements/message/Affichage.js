import React,{useState,useEffect} from 'react';
import axios from 'axios'
function Affichage(props){
  const [message,setMessage]=useState()
  const [content,setContent]=useState()
  useEffect(() => {
    const {match:{params}}=props
        axios.get(`/logement/${params.logement_id}/conversation`).then(response=>{
            setMessage({conversation:response.data.conver,messages:response.data.messages})
        })
        
    }, [])
  useEffect((delay) => {
    function new_massage() {
      const { match: { params } } = props
      axios.get(`/logement/${params.logement_id}/conversation`).then(response => {
        setMessage({ conversation: response.data.conver, messages: response.data.messages })
      })
    }
    if (delay !== null) {
      let id = setInterval(new_massage, 1000);
      return () => clearInterval(id);
    }
  }, [1000]);
   
    function text(event){
     setContent({ ...content,text:event.target.value})
    }
    function file(file) {
      setContent({ ...content,file:file.target.files[0]})
    }
    function envoyer() {
      const formData = new FormData()
      formData.append('files', content.file)
      if (content.text != null) {
        formData.append('content', content.text)
      }
      formData.append('is_admin',1)
      axios.post(`/logements/${message.conversation[0].conversation.logement_id}/conver_admin/${message.conversation[0].conversation.id}/message_admin`, formData).then(response => {
        setMessage({ ...message,
          messages: response.data.messages,
   
        })
      })
    }
    return(
      <div className="flex">
      <div className="w-3/12 h-screen bg-gray-700">
          <h1 className="bg-gray-800 text-white text-5xl font-bold h-32 flex items-center justify-center"> Runbnb.com </h1>
          <div className="text-white text-base font-bold h-20 flex items-center justify-center bg-indigo-500 bg-opacity-25 border-r-4 border-red-500" >
           
                 Utilisateurs
          
              {/* {this.state.users && this.state.users.length} */}
          </div>
          <div className="text-white text-base  h-20 flex items-center justify-center">
              
                  Logements
            
              {/* {this.state.logements && this.state.logements.length} */}
          </div>
      </div>
      <div className="w-2/3 mx-5 my-5">
      <div>
          <div className="flex justify-center w-full">
            {/* <div className=" w-3/12  ">
              <div className="border-2 my-5 bg-gray-300 h-auto">
                <div className="h-12 bg-gray-200  flex items-center justify-center text-sm " >
                  H
                </div>
              </div>
            </div> */}
            <div className="w-8/12 border">
              <div className="h-12 flex items-center justify-center text-sm font-bold">
              </div>
              <hr></hr>
              <div className=" my-5  ">
              {message ? (
                <div>
                  <div className="aa  h-64 overflow-x-hidden ">
                    {message.messages && message.messages.map(messag =>
                      <div className="aa flex">
                        <div className="flex w-1/2 ">

                          {/*===================== ADMIN =============================================*/}
                          {
                           parseInt(messag.is_admin) === parseInt(message.conversation[0].conversation.logement_id) ? (
                              <>
                                {messag.content ?
                                  (
                                    <p className="break-all mx-3 my-2 border  leading-normal text-sm text-gray-600 px-3  py-2 rounded-2xl    ">{messag.content}
                                    </p>

                                  )
                                  : null
                                }
                                {messag.files.url ? (
                                  <>{
                                    (messag.files.url.split(".").pop() === "png" || messag.files.url.split(".").pop() === "jpeg" || messag.files.url.split(".").pop() === "jpg") ? (
                                      <img alt="fichier" src={` http://f07f4cb.online-server.cloud/${messag.files.url}`} />
                                    ) : (
                                      <>
                                        <a href={` http://f07f4cb.online-server.cloud/${messag.files.url}`}>Fichier</a>
                                      </>
                                    )}
                                  </>
                                ) : null
                                }
                              </>
                            ) : (null
                            )
                          }
                        </div>
                        <div className="flex justify-end w-1/2 ">
                          {/*===================== Propriétaire =============================================*/}
                          {
                             parseInt(messag.is_admin) !== parseInt(message.conversation[0].conversation.logement_id) ? (
                           
                              <>
                                {messag.content ?
                                  (
                                    <h6 className="break-all mx-3 my-2 border bg-blue-500  leading-normal text-sm text-white px-3  py-2 rounded-2xl   ">{messag.content}
                                    </h6>

                                  )
                                  : null
                                }

                                {messag.files.url ? (
                                  <>{
                                    (messag.files.url.split(".").pop() === "png" || messag.files.url.split(".").pop() === "jpeg" || messag.files.url.split(".").pop() === "jpg") ? (
                                      <img alt="fichier" src={` http://f07f4cb.online-server.cloud${messag.files.url}`} />
                                    ) : (
                                      <>
                                        <a href={` http://f07f4cb.online-server.cloud ${messag.files.url}`}>Fichier</a>
                                      </>
                                    )}
                                  </>
                                ) : null
                                }
                              </>
                            ) : (null
                            )
                          }
                        </div>
                       
                      </div>
                    )
                    }
                  </div>
                  <div className="mx-3">
                    <div className="my-3 flex mx-3">
                      <input onChange={(event) => { text(event) }} type='text' defaultValue={null} className="w-10/12 border rounded-2xl leading-tight" />
                      <p onClick={() => { envoyer() }} className="w-24 h-10 border-2 ml-3 text-orange-500  rounded-xl border-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white">Envoyer</p>
                    </div>
                    <label htmlFor="file" className="label-file text-sm mx-3">Choisir un fichier</label>
                    <input className="input-file" id="file" type="file" accept=".xlsx,.xls,.png,.jpg,.doc, .docx,.ppt, .pptx,.txt,.pdf" onChange={(event) => { file(event) }} />
                  </div>
                  <div className="text-center text-gray-600 font-medium my-5">
                    Pas de message
              </div>
                </div>
              ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>    
       
         )    
}
export default Affichage