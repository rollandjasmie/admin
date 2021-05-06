import React, { Component } from 'react';
import Navboard from '../../Navbar/Navboard'
import 'moment/locale/fr-ca';
import Facturation from './Facturation';
import Facture from '../compta/Facture';
import Bancaire from './Bancaire';
import { Nav } from 'react-bootstrap';


class Reservationtout extends Component {
  constructor(props){
    super(props)
     this.state = {
      showfacture: true,
      showAvenir: false,
      showTerminer : false,
      }
  }

    hideComponent(name) {
    switch (name) {
  
      case "showfacture":
        return this.setState({  
      
          showfacture: true,
            showAvenir: false,
            
            showTerminer : false });
        break;
      case "showAvenir":
        return this.setState({  
          
          showfacture: false,
            showAvenir: true,
          
            showTerminer : false });
        break;
      case "showTerminer":
        return this.setState({  
            
          showfacture: false,
            showAvenir: false,
        
            showTerminer : true });
        break; 
  
      default:
        return null;
    }
    }
  render() {
    const { showfacture, showAvenir, showTerminer, } = this.state;
    const { match: { params } } = this.props
      return (
          <>
          <Navboard />
          <div>
            <div>
                    <Nav variant="tabs" defaultActiveKey="#" className="text-gray-500 mt-10 mx-10 ">
                        <Nav.Item onClick={() => this.hideComponent("showfacture")}>
                    <Nav.Link eventKey="link-1" href=""  >Facture et versements</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() => this.hideComponent("showAvenir")}>
                          <Nav.Link eventKey="link-2" href="" >Coordonnées de facturation</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() => this.hideComponent("showTerminer")}>
                          <Nav.Link eventKey="link-3" href="" >Coordonnées bancaires</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div>
                      {showTerminer && <Bancaire logement_id={params.logement_id}/>}
                      {showAvenir && <Facturation logement_id={params.logement_id}/>}
                      {showfacture && <Facture logement_id={params.logement_id}/>}
                    </div>
                  </div>
          </div>
      </>
      );
  }
}

export default Reservationtout;