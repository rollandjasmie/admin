import React, { Component } from 'react';
import {DropzoneArea} from 'material-ui-dropzone'


export default class Uploadphoto extends Component {
    
        state = {

        }
        
        handleChange(files){
            this.setState({
            files: files
        })
        console.log(files)
            
            let { formValue, setFormValue } = this.props;
            formValue = {...formValue, photo: files};
            setFormValue(formValue);
        }
        
      
        render() {
            
            
            return (<>
                <div className="regle lg:w-2/4 sm:w-full sm:ml-0 mr-0 mt-5 pl-3 lg:ml-10 pr-3  bg-white shadow-md rounded pt-6 pb-8 ">
            
                    <DropzoneArea
                        onChange={this.handleChange.bind(this)}
                        showPreviewsInDropzone={false}
                        showPreviews={true}
                        filesLimit={50}
                        maxFileSize={5000000}
                        dropzoneText='Importez au moins une photo'
                        previewText="Photo(s) sélectionnée(s)"
                        
                    />                
                    
                    <div className="w-full mb-6 md:mb-0 mt-4">
                <button class=" text-white font-bold py-2 px-4 rounded mr-1" onClick={this.props.previousStep}>Précédent</button>
                <button  class=" text-white pl-6 pr-6 font-bold py-2 px-4 my-3 rounded" onClick={this.props.nextStep}>Suivant</button>  
                </div>
                </div>
                </>
            )
        }
}
