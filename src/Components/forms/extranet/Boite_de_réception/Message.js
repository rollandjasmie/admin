import React,{ Component} from 'react';
import axios from 'axios'

// import { Chat } from '@progress/kendo-react-conversational-ui';
class Message extends Component {
  state={
      id_conversation: this.props.id_conversation,
      
  }
    componentDidMount(){
        // this.interval = setInterval(() => 
        axios.get(`/logements/${this.props.logement_id}/conversations/${this.props.id_conversation}/messages`).then(response=>{
            this.setState({
                message: response.data.messages
            })
        })
        // , 1000)
    }

    text=(event)=>{
        this.setState({
            content:event.target.value
        })
    }
    file=(e)=>{
        this.setState({
            files: e.target.files[0],
        })
    }
    componentDidUpdate(prevProps,prevState){
        if (prevProps.id_conversation !== this.props.id_conversation) {
            axios.get(`/logements/${this.props.logement_id}/conversations/${this.props.id_conversation}/messages`).then(response => {
                this.setState({
                    message: response.data.messages
                })
                console.log(this.state)
            })
        }
     
        // if (prevState !== this.props.state){
            
        //     axios.get(`/logements/${this.props.logement_id}/conversations/${this.props.id_conversation}/messages`).then(response => {
        //         this.setState({
        //             message: response.data.messages
        //         })
        //         console.log(this.state)
        //     })
        // }
    }
    
    envoyer=(e)=>{
        // :content, :conversation_id,:is_client
        const formData = new FormData 
        formData.append('files', this.state.files)
        if (this.state.content != null) {
            formData.append('content', this.state.content)
        }
        formData.append('is_client', false)

        axios.post(`/logements/${this.props.logement_id}/conversations/${this.props.id_conversation}/messages`, formData).then(response=>{
            this.setState({
                message: response.data.messages,
                content: '',
                files: ''
            })
        })
     
    }
   
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <div> 
                {
                    this.props.id_conversation?(
                <>
                        <div className="aa  h-64 overflow-x-hidden "> 
                        {
                                this.state.message && this.state.message.map((message)=>(
                                <div className="aa flex  ">
                                            <div className="flex w-1/2 ">
                                            {
                                                message.is_client === true ? (
                                                    <>
                                                        {message.content ? 

                                                        (
                                                                
                                                            <p className="break-all mx-3 my-2 border  leading-normal text-sm text-gray-600 px-3  py-2 rounded-2xl  ">{message.content}
                                                        </p>

                                                        )
                                                         : null}
                                                        {message.files.url ? (
                                                            <>{
                                                                (message.files.url.split(".").pop() == "png" || message.files.url.split(".").pop() == "jpeg" || message.files.url.split(".").pop() == "jpg") ? (
                                                                    <img src={` http://f07f4cb.online-server.cloud/${message.files.url}`} />
                                                                ) : (
                                                                        <>
                                                                            <a href={` http://f07f4cb.online-server.cloud/${message.files.url}`}>Fichier</a>
                                                                        </>
                                                                    )}
                                                            </>
                                                        ) : null
                                                        }
                                                    </>
                                                ): (null
                                                    )
                                        }
                                            </div>
                                        

                                                {/* LOGEMENT */}


                                            <div className="flex justify-end w-1/2">
                                                {
                                                message.is_client === false ? (
                                                 <div className="">
                                                    {message.content ? 
                                                    (
                                                        <p className="break-all mx-3 my-2 border bg-blue-500  leading-normal text-sm text-white px-3  py-2 rounded-2xl  ">
                                                    
                                                    {message.content} < br />
                                                    
                                                    </p>
                                                    ) : null}
                                                    { message.files.url?(
                                                        <div className="mr-4 my-2">{
                                                            (message.files.url.split(".").pop() == "png" || message.files.url.split(".").pop() == "jpeg" || message.files.url.split(".").pop() == "jpg")?(
                                                                <img src={` http://f07f4cb.online-server.cloud/${message.files.url}`} />
                                                            ):(
                                                            <>
                                                                <a href={` http://f07f4cb.online-server.cloud/${message.files.url}`}>{message.files.url.split("/").pop()}</a>
                                                            </>
                                                            )}
                                                        </div>
                                                     ):null
                                                    }
                                                 </div>
                                                 ):null
                                                }   
                                            </div> 
                                        
                                </div>
                            ))
                        }
                        </div>
                                {/* <div className="mx-3">
                                    <div className="my-3 flex mx-3">
                                        <input  onChange={this.text} type='text'defaultValue={null} className="w-10/12 border rounded-2xl leading-tight"/>
                                        <button onClick={this.envoyer} className="w-24 contacterr textprom h-10 border-2 ml-3  rounded-xl border-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white">Envoyer</button>
                                    </div> 
                                    <label for="file" className="label-file text-sm mx-3">Choisir un fichier</label>
                                   <input className="input-file" id="file" type="file" accept=".xlsx,.xls,.png,.jpg,.doc, .docx,.ppt, .pptx,.txt,.pdf" onChange={this.file} />
                                </div> */}
                        </>        
                    ):(
                    <div className="text-center text-gray-600 font-medium my-5">
                        Pas de message
                    </div>
                    )
                }
            </div>
        );
    }


}

export default Message;


