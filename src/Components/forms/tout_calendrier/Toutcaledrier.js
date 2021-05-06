import React from 'react'
import $ from 'jquery';
import axios from 'axios'
import Dropdow1 from '../../user/Dropdow1';
import Navboard from '../Navbar/Navboard'
import {Link  } from 'react-router-dom';
import moment from 'moment';
import { ScheduleComponent, getWeekNumber, HeaderRowDirective, HeaderRowsDirective, TimelineMonth, ResourcesDirective, ResourceDirective, Inject, ViewsDirective, ViewDirective, Month, Day } from '@syncfusion/ej2-react-schedule';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import './style.css';
import image from '../../../assets/images/promotion.png';
import history from '../../../history'
class Planning extends React.Component {
  constructor(){
    super(...arguments)
    this.state = { tarif: null, searchs: null, nom: null }
  }
  componentDidMount() {
    axios.get('/users/show',).then(response => {
        if (response.data.photo === true) {

          this.setState({
            avatar: `http://localhost:4000//${response.data.avatar}`
          })
        }
      })
    axios.get('/tout/caledriers').then(response => (
      this.setState({ tarif: response.data.tarif })
    ))
    this.set = setInterval(() => {
      $(".e-time").remove()
      $(".e-quick-popup-wrapper").remove()
      $(".e-dlg-container").remove()
      let divs = $(".e-subject")
      Object.keys(divs) && Object.keys(divs).map((item,index) =>{
        if ($(divs[item]).text() === "promotion") {
          $(divs[item]).replaceWith(`<img src="${image}" className="promotion" style={{width:5,height:5}}></img>`)
        }
      })
    }, 50);
  }
  componentWillUnmount() {
    clearInterval(this.set)
  }
  handler = (e) => {
    this.setState({searchs:e.target.value})
  }
async  search(){
    const rsearch = {recherche: this.state.searchs}
    await   axios.post('/tout/caledriers',rsearch).then(response => {
      this.setState({ tarif: response.data.search})
      console.log(response.data.search)
     }
    )
  }

  render() {
    const { tarif } = this.state
    const tab = [ ];
    tarif && tarif.map((tarif, key) => {
      //=================== tarif========================
      const s = moment(tarif.tarif.startDate);
      const e = moment(tarif.tarif.endDate);
      var start = new Date(s)
      var end = new Date(e)
      const id = key + 1
      while (start <= end) {
        const res$key = {}
        res$key["Id"] = id
        res$key["Subject"] = `${tarif.tarif.tarif}€`
        res$key["StartTime"] = new Date(moment(start))
        res$key["EndTime"] = new Date(moment(start))
        res$key["ResourceID"] = id
          //res$key["Color"] = 'red'
        tab.push(res$key)
        var newDate = start.setDate(start.getDate() + 1);
        start = new Date(newDate);
      }
        //============= promotion =======================
      tarif.promotion && tarif.promotion.map(prom=>{
        const sp = moment(prom.datedebut);
        const ep = moment(prom.datefin);
        var startp = new Date(sp)
        var endp = new Date(ep)
        while (startp <= endp) {
          const res$keyp = {}
          res$keyp["Id"] = id
          res$keyp["Subject"] = "promotion"
          res$keyp["StartTime"] = new Date(moment(startp))
          res$keyp["EndTime"] = new Date(moment(startp))
          res$keyp["ResourceID"] = id
          //res$key["Color"] = 'red'
          tab.push(res$keyp)
          var newDate = startp.setDate(startp.getDate() + 1);
          startp = new Date(newDate);
        }
      })
    })

    //=================== logement ============================
    
    const logement = []
    tarif && tarif.map((tarif,i) => {
      const objet = {}
      objet['name'] = tarif.logement.name
      objet['id'] = i+1
      objet['color'] = `#FFFFFF`
      objet['photo'] = tarif.photo
      logement.push(objet)
    
    })

    return (
      <>
        <Navboard/>
        <nav className="bg-blue-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <div className="flex items-center  w-10/12  h-full">
                <a href="/Dashboard" className="h-full  flex justify-center items-center w-3/12 rounded-md text-sm font-medium text-gray-300 hover:text-white 
                          focus:outline-none focus:text-white">
                        Tous les hébergements</a>
                <a href="/proprietaire/calendriers" className="border-b-4 border-orange-500 bg-gray-200 bg-opacity-50 h-full text-white flex justify-center items-center w-3/12 text-sm font-medium text-gray-300 hover:text-white  focus:outline-none focus:text-white">Calendrier de tous les hébergements</a>
                <Link onClick={() => { history.push('/proprietaire/reservation')}}  className="h-full  flex justify-center items-center w-3/12 rounded-md text-sm font-medium text-gray-300 hover:text-white 
                        focus:outline-none focus:text-white ">Toutes les réservations</Link >
              </div>
              <div className="hidden md:block">
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
        <div className="ml-3 mt-10 mb-3"> 
              <input type="text" className="outline-none px-3 border mx-2 rounded-lg  text-gray p-1"placeholder="Rechercher un nom , id " onChange={this.handler}></input>
              <button className="rounded-lg hover:text-white text-white py-1 px-3  " onClick={()=>this.search()}>Rechercher</button>
          </div>
          <div className='schedulecontainer mx-4 ' disabled={true}>
        {tarif?(
          <div className='container_IL'>
        {tarif && tarif.map(tarif=>(
            <img width="70px" src={tarif.photo} className='imageLogement'></img>
            ))}
          </div>):null} 
          {tarif?(
          <div className="">
            <ScheduleComponent  
                  width='100%' 
                  height='450px' 
                  eventSettings={{ dataSource: tab }} 
                  group={{ resources: ['Resources'] }} 
                  allowKeyboardInteraction={false}
                  allowMultiCellSelection={false}
                  allowMultiRowSelection={false}
                  allowResizing={false}
                  >
              <HeaderRowsDirective height='100%'>
                <HeaderRowDirective option='Date' />
              </HeaderRowsDirective>
              <ViewsDirective>
                  <ViewDirective option='TimelineMonth' />
              </ViewsDirective>
              <ResourcesDirective>
                <ResourceDirective dataSource={logement}  field='ResourceID' title='Resource Name' name='Resources' textField='name' idField='id' colorField='color'>
                </ResourceDirective>
              </ResourcesDirective>
              <Inject services={[Day,TimelineMonth, Month]} />
            </ScheduleComponent>
          </div>
          ):null}
        </div>
      </> )
  }
}
export default Planning;