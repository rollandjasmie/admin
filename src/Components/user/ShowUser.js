import React, { Component } from 'react';
import Dropdow1 from './Dropdow1';
import Navboard from '../forms/Navbar/Navboard';

import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import $ from 'jquery'
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      selection: 1,
      avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      logement: [],
      adresse: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios.get('/users/show',).then(response => {
      if (response.data.photo === true) {
        this.setState({
          avatar: `http://f07f4cb.online-server.cloud${response.data.avatar}`
        })
      }
    })
    // this.interval = setInterval(() => {
        axios.get('/logements').then(response => {
          this.setState({
            logement: response.data.logement,
            adresse: response.data.adresse,
            photos: response.data.photos,
            arrivee: response.data.arrivee,
            depart: response.data.depart,
            messages:response.data.message,
            admins: response.data.admin
          })
          console.log(response.data)
        }
        )
    // }, 1000);
  }
  handleChange(event, index, value) {
    this.setState({ selection: value });
  }
  
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  printDocument() {
    const input = $(".capture")[0];
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, );
        pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
      ;
  }
  render() {
    const { logement, adresse, photos, arrivee, depart,messages,admins } = this.state;
    let hebergements = [];
    logement && logement.map(log => {
      return hebergements.push({ ...log });
    })
    hebergements && hebergements.map(hebergement => {
      hebergement.adresse = adresse.find(adr => adr.logement_id === hebergement.id)
      hebergement.photos = photos.find(pho => pho.logement_id === hebergement.id)
      hebergement.arrivee = arrivee.find(arr=> arr.logement_id === hebergement.id)
      hebergement.depart = depart.find(dep=> dep.logement_id === hebergement.id)
     const mes= messages.filter(message =>
        message.log.id === hebergement.id
        )
      const admin = admins.filter(message =>
        message.logs.id === hebergement.id
      )
      hebergement.messages = mes
      hebergement.admin = admin
    })
    hebergements && hebergements.map(heb=>{
      console.log(heb)
    })
    return (
      <>
        {
          hebergements?
          <>
              <Navboard />
           
              <div>
                <nav className="bg-blue-500">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                          <div className="flex items-center  w-10/12  h-full">
                            <a href="/Dashboard" className="border-b-4 border-orange-500 bg-gray-200 bg-opacity-50 h-full text-white flex justify-center items-center w-3/12 text-sm font-medium text-gray-300 hover:text-white  focus:outline-none focus:text-white">
                              Tous les hébergements</a>
                            <a href="/proprietaire/calendriers" className="h-full  flex justify-center items-center w-3/12 rounded-md text-sm font-medium text-gray-300 hover:text-white 
                                focus:outline-none focus:text-white ">Calendrier de tous les hébergements</a>
                            <Link to="/proprietaire/reservation" className="h-full  flex justify-center items-center w-3/12 rounded-md text-sm font-medium text-gray-300 hover:text-white 
                                focus:outline-none focus:text-white ">Toutes les réservations</Link>
                          </div>
                      <div className=" md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <div class="ml-3  relative">
                            <div className="flex  items-center mr-1 w-auto ">
                              <img className=" h-8 w-8 rounded-full" src={this.state.avatar} alt=""></img>
                              <Dropdow1 />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 </nav>
                <main>
                  {/* <div onClick={this.printDocument}>
                      pdf
                  </div> */}
                  <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 capture" >
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="tab divide-y divide-gray-200 my-5 mx-2">
                              <thead>
                                <tr>
                                  <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Identifiant
                                  </th>
                                  <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Nom
                                  </th>
                                  < th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Adresse
                                  </th>
                                  < th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Statut
                                  </th>
                                  <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Arrivée/Départ aujourd’hui ou demain
                                  </th>
                                  <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Message des clients
                                  </th>
                                  <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Message de Runbnb.com
                                  </th>
                                </tr>
                              </thead>
                              {hebergements && hebergements.map(hebergement => (
                                <tbody className="bg-white divide-y divide-gray-200">
                                  <tr>
                                    <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                        {hebergement.idlogement}
                                      </span>
                                    </td>
                                    <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                      <div className="flex items-center justify-start">
                                        <div className="flex-shrink-0 h-10 w-10">
                                          <img className="h-10 w-10 rounded-full" src={`http://f07f4cb.online-server.cloud${hebergement.photos.photo.url}`} alt=""></img>
                                        </div>
                                        <div className="ml-4">
                                          <Link to={`/extraheb/${hebergement.id}`}>
                                            <span key={hebergement.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                              {hebergement.name}
                                            </span>
                                          </Link>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                        {hebergement.adresse.adresse}
                                      </span>
                                    </td>
                                    <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                      <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full text-gray-500">
                                        {hebergement.status?(<>Active</>):<>-</>}
                                      </span>
                                    </td>
                                    <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                        {hebergement.arrivee? <>1</>:<>0</>} - {hebergement.depart? <>1</>:<>0</>}
                                      </span>
                                    </td>
                                    <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                        {hebergement.messages.length ===0 ?(0):(
                                          <>
                                            {hebergement.messages.length}
                                          </> 
                                        )}
                                      </span>
                                    </td>
                                    <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                        {hebergement.admin.length === 0 ? (0) : (
                                          <>
                                            {(hebergement.admin[0].admin === 0) ? (<>0</>) : (<>{hebergement.admin.length}</>)}
                                          </>
                                        )}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </>:null
        }
      </>
    )
  }
}
const mapStateToPropos = (state) => {
  return {
    ...state.auth
  }
}
export default connect(mapStateToPropos)(Dashboard);