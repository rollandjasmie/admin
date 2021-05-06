import React from 'react'
import './Galery.scss'
import ReactBnbGallery from 'react-bnb-gallery'
import axios from 'axios'



class Example extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { 
      galleryOpened: false,
      photos : null,
      id: this.props.logement_id
    };
    this.toggleGallery = this.toggleGallery.bind(this);
  }
  componentDidMount(){
    const id = this.state.id
    const asy = async () =>{
      await axios.get(`/logement/${id}/photos/public`).then(response => (
        this.setState({photos:response.data.photos})
    ))
    }
    asy()
  }
  toggleGallery() {
    this.setState(prevState => ({
      galleryOpened: !prevState.galleryOpened
    }));
  }

  render () {
    return (
      <>
        {
          this.state.photos?(
            <>
              <h1 onClick={this.toggleGallery} className="mx-3 mb-3 cursor-pointer text-gray-500 hover:text-blue-500">Voir toutes les photos</h1>
              <ReactBnbGallery
                show={this.state.galleryOpened}
                photos={this.state.photos}
                onClose={this.toggleGallery} />
            </>

          ):null
        }
      </>
    )
  }
}
export default Example;
