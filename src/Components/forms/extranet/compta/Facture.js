import axios from 'axios';
import React, { Component } from 'react'
import { IoIosArrowForward } from 'react-icons/io';

export default class AccordionExampleStandard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        home:1,
        resultat:null
      }
    this.recherche = this.recherche.bind(this);

  }
      componentDidMount() {
        console.log(this.props)
        axios.get(`/compta/${this.props.logement_id}/facture`).then(response=>
            this.setState({
              janvier: response.data.janvier,
              fevrier: response.data.fevrier,
              mars: response.data.mars,
              avril: response.data.avril,
              mai: response.data. mai,
              juin: response.data.juin,
              juillet: response.data.juillet,
              aout: response.data.aout,
              septembre: response.data.septembre,
              octobre: response.data.octobre,
              novembre: response.data.novembre,
              decembre: response.data.decembre,
            })
          )
      }
      year(e){
        axios.get(`/compta/${this.props.logement_id}/facture/${e.target.value}`).then(response =>
          this.setState({
            janvier: response.data.janvier,
            fevrier: response.data.fevrier,
            mars: response.data.mars,
            avril: response.data.avril,
            mai: response.data.mai,
            juin: response.data.juin,
            juillet: response.data.juillet,
            aout: response.data.aout,
            septembre: response.data.septembre,
            octobre: response.data.octobre,
            novembre: response.data.novembre,
            decembre: response.data.decembre,
            home: 1,
            resultat: null

          })
        )
      }
      recherche(){
        axios.post(`/compta/${this.props.logement_id}/facture/${this.state.mot}`).then(response =>
            this.setState({
              resultat: response.data.resultat,
              home:null
            })
          )

      }
  render() {
    const {
      home,janvier,fevrier,mars,avril,mai,juin,juillet,aout,septembre,octobre,novembre,decembre,resultat
    } = this.state
    return (
      <div>  
        <div className="my-5 mx-5 flex w-full">
            <label className=" w-1/2">En cours de traitements</label>
            <div className=" w-1/2 ">
                <input id="recherche" placeholder='id réservation,nom,prénom,email' onChange={(e)=>{this.setState({mot:e.target.value})}} className=" border-2 px-3 mr-3 rounded h-10 outline-none focus:border-blue-200 "type="text"></input>
                <label for="recherche" onClick={this.recherche} className="text-gray-500 hover:text-gray-700 cursor-pointer hover:font-bold" >Rechercher</label>
            </div>
        </div>  
        <div>
        <div className="my-5 mx-5">
            <select onChange={(e) => { this.year(e) }} className=" block w-42 h-10 bg-gray-100 text-gray-700 border-2 border-gray-200
                                    rounded my-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-orange-500 mx-2 placeholder-blue-500 ">
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
            </select>
          </div>
          {
            home?(
            <div className="mx-5" >
              {/* <IoIosArrowForward /> */}
            {/* ================== decembre ================================ */}
            {
              decembre && decembre.length !== 0 ? (
                <>
                  Décembre
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {decembre.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </>
              ) : null
            }


            {/* ================== novembre ================================ */}
            {
              novembre && novembre.length !== 0 ? (
                <>
                  Novembre
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {novembre.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </>
              ) : null
            }


            {/* ================== octobre ================================ */}
            {
              octobre && octobre.length !== 0 ? (
                <>
                  Octobre
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {octobre.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </>
              ) : null
            }


            {/* ================== septembre ================================ */}
            {
              septembre && septembre.length !== 0 ? (
                <>
                Septembre
                
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {septembre.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </>
              ) : null
            }


            {/* ================== aout ================================ */}
            {
              aout && aout.length !== 0 ? (
                <>
                Août
                
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {aout.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </>
              ) : null
            }


            {/* ================== juillet ================================ */}
            {
              juillet && juillet.length !== 0 ? (
                <>
                juillet
                
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {juillet.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </>
              ) : null
            }


            {/* ================== juin ================================ */}
            {
              juin && juin.length !== 0 ? (
                <>
                juin
                
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {juin.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </>
              ) : null
            }


            {/* ================== mai ================================ */}
            {
              mai && mai.length !== 0 ? (
                <>
                Mai
                
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {mai.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </>
              ) : null
            }


            {/* ================== AVRIL ================================ */}
            {
              avril && avril.length !== 0 ? (
                <>
                  Avril
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {avril.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </>
              ) : null
            }


            {/* ================== mars ================================ */}
            {
              mars && mars.length !== 0 ? (
                <>
                Mars
                
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {mars.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </> 
              ) : null
            }


            {/* ================== fevrier ================================ */}
            {
              fevrier && fevrier.length !== 0 ? (
                <>
                Février
                
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {fevrier.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </>
              ) : null
            }


            {/* ================== janvier ================================ */}
            {
              janvier && janvier.length !== 0 ? (
                <>
                Janvier
                
                <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                  <thead>
                    <tr>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        N° de réservation
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Voyageur
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Montant Net
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Versé le
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Séjour
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Tarif Total
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Commission
                      </th>
                      <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        Taxe de Séjour
                      </th>
                    </tr>
                  </thead>

                  {janvier.map(verse => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.numreservation}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.voyageur}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.montantnet}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.datedevirment}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.sejour}
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.tariftotal}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.commission}€
                          </span>
                        </td>
                        <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                            {verse.taxe}€
                          </span>
                        </td>

                      </tr>
                    </tbody>
                  ))}

                </table>
                </>
              ) : null
            }
            </div>
            ) : null
          }
          {
            resultat?(
              <table className="tab shadow border divide-y divide-gray-200 my-5 mx-2">
                <thead>
                  <tr>
                    <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      N° de réservation
                    </th>
                    <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      Voyageur
                    </th>
                    <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      Montant Net
                    </th>
                    <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      Versé le
                    </th>
                    <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      Séjour
                    </th>
                    <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      Tarif Total
                    </th>
                    <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      Commission
                    </th>
                    <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      Taxe de Séjour
                    </th>
                  </tr>
                </thead>

                {resultat.map(verse => (
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                          {verse.numreservation}
                        </span>
                      </td>
                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                          {verse.voyageur}
                        </span>
                      </td>
                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                          {verse.montantnet}€
                        </span>
                      </td>
                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                          {verse.datedevirment}
                        </span>
                      </td>
                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                          {verse.sejour}
                        </span>
                      </td>
                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                          {verse.tariftotal}€
                        </span>
                      </td>
                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                          {verse.commission}€
                        </span>
                      </td>
                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                          {verse.taxe}€
                        </span>
                      </td>

                    </tr>
                  </tbody>
                ))}

              </table>

            ):null
          }
        </div>
      </div>
    )
  }
}
