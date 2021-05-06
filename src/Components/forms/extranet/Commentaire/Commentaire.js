import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Navbarextra from "../../Navbar/Navbarextra";
import Navbarextra2 from "../../Navbar/Navbarextra2";
import { NavLink } from "react-router-dom";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
// import { Progress } from 'antd';

class Commentaire extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.logement_id;
    this.interval = setInterval(
      () =>
        axios.get(`/logements/${id}/commentaire/pall`).then((response) => {
          this.setState({
            commentaires: response.data.commentaires,
            general: response.data.general,
          });
        }),
      1000
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(`/commentaires/${this.state.commentaire_id}/reponse`, {
      content: this.state.content,
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const {
      match: { params },
    } = this.props;
    let { commentaires } = this.state;
    return (
      <div className="bg-white">
        <div>
          <div className="">
            <Navbarextra logement_id={params.logement_id} />
          </div>
          <div className="h-24">
            <Navbarextra2 logement_id={params.logement_id} />
          </div>
        </div>
        <div className="my-3 mx-5 bg-white">
          <h1 className="text-gray-700 font-medium"> Commentaires clients</h1>
          <p className="text-gray-600 text-sm my-3">
            Découvrez ce que les voyageurs ont pensé de leur séjour ! Vous
            pouvez lire les commentaires laissés par les clients et y répondre.
            Cliquez ici pour consulter notre politique en matière de
            commentaires et de réponses à ces commentaires.
          </p>
        </div>
        {this.state.commentaires ? (
          <div className="mx-5 bg-white">
            <div className="bg-gray-100 flex items-center rounded">
              <div className="my-3 mx-5 w-full">
                <div className="flex items-center h-20 ">
                  <lable className="bg-orange-500 flex items-center justify-center rounded-tl-3xl rounded-tr-3xl rounded-br-3xl font-bold text-white text-3xl h-16 w-16">
                    {this.state.general.note_general}
                  </lable>
                  <h1 className="text-gray-700 text-sm font-medium mx-3">
                    D'après {this.state.commentaires.length} Commentaire(s)
                  </h1>
                </div>
                <label className="text-gray-700 font-medium my-4">Aperçu</label>
                <div className="flex w-full">
                  <div className="w-1/3">
                    <div className="">
                      {/* {(this.state.general.personnel*10 )<25?(<Progress percent=  {this.state.general.personnel*10 }/>):null}
                                            {((this.state.general.personnel*10 )>25 && (this.state.general.personnel*10 )<50)?(<Progress percent=  {this.state.general.personnel*10 }/>):null}
                                            {((this.state.general.personnel*10 )>50 && (this.state.general.personnel*10 )<75)?(<Progress percent=  {this.state.general.personnel*10 }/>):null}
                                            {(this.state.general.personnel*10 )>75?(<Progress percent=  {this.state.general.personnel*10 }/>):null} */}
                      <Progress percent={this.state.general.personnel * 10} />
                      <h1></h1>
                      Personnel
                    </div>
                    <div className="my-4">
                      <Progress
                        percent={this.state.general.qualite_prix * 10}
                      />
                      Qualité/Prix
                    </div>
                  </div>
                  <div className="w-1/3 mx-5">
                    <div>
                      <Progress percent={this.state.general.proprete * 10} />
                      Propreté
                    </div>
                    <div className="my-4">
                      <Progress percent={this.state.general.equipement * 10} />
                      Équipements
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {commentaires.map((commentaire) => (
              <div className="bg-gray-100 mt-5   rounded">
                <div className=" flex items-center rounded">
                  <div className="my-3 mx-5 w-full">
                    <div className="flex items-center h-20 ">
                      <lable className="bg-blue-500 flex items-center justify-center rounded-tl-3xl rounded-tr-3xl rounded-br-3xl font-bold text-white text-3xl h-16 w-16">
                        {commentaire.note}
                      </lable>
                      <label className="text-gray-700 text-sm font-medium mx-3">
                        {commentaire.user}
                        <br></br>
                        <span className="text-gray-600 text-sm  ">
                          {moment(commentaire.commentaire.created_at).format(
                            "LL"
                          )}
                        </span>
                      </label>
                    </div>
                    <label className="text-gray-700 font-medium my-4">
                      Aperçu
                    </label>
                    <div className="flex w-full">
                      <div className="w-1/3">
                        <div className="">
                          {/* {(this.state.general.personnel*10 )<25?(<Progress percent=  {this.state.general.personnel*10 }/>):null}
                                            {((this.state.general.personnel*10 )>25 && (this.state.general.personnel*10 )<50)?(<Progress percent=  {this.state.general.personnel*10 }/>):null}
                                            {((this.state.general.personnel*10 )>50 && (this.state.general.personnel*10 )<75)?(<Progress percent=  {this.state.general.personnel*10 }/>):null}
                                            {(this.state.general.personnel*10 )>75?(<Progress percent=  {this.state.general.personnel*10 }/>):null} */}
                          <Progress
                            percent={commentaire.commentaire.personnel * 10}
                          />
                          <h1></h1>
                          Personnel
                        </div>
                        <div className="my-4">
                          <Progress
                            percent={commentaire.commentaire.qualite_prix * 10}
                          />
                          Qualité/Prix
                        </div>
                      </div>
                      <div className="w-1/3 mx-5">
                        <div>
                          <Progress
                            percent={commentaire.commentaire.proprete * 10}
                          />
                          Propreté
                        </div>
                        <div className="my-4">
                          <Progress
                            percent={commentaire.commentaire.equipement * 10}
                          />
                          Équipements
                        </div>
                      </div>
                    </div>
                    {/* <div className="flex">  
                                     <div> 
                                         <div>
                                             Personnel
                                             {commentaire.commentaire.personnel}
                                         </div>
                                         <div>
                                             Qualité/Prix
                                             {commentaire.commentaire.qualite_prix}
                                         </div>
                                     </div>
                                     <div>
                                         <div>
                                             Propreté
                                             {commentaire.commentaire.proprete}
                                         </div>
                                         <div>
                                             Équipements
                                             { commentaire.commentaire.equipement}
                                         </div>
                                     </div>
                                </div>  */}
                  </div>

                  {/* // <div>
                            //    {commentaire.note}{" "}{commentaire.user}{" "}{" "}{moment(commentaire.commentaire.created_at).format("LL")}<br />
                            //     <div>
                            //         Aperçu<br />
                            //     </div>
                            //         Personnel
                            //      {commentaire.commentaire.personnel}
                            //     <div>
                            //         Qualité/Prix
                            //      {commentaire.commentaire.qualite_prix}
                            //     </div>
                            //     <div>
                            //         Propreté
                            //      {commentaire.commentaire.proprete}
                            //     </div>
                            //     <div>
                            //         Équipements
                            //      { commentaire.commentaire.equipement}
                            //     </div>
                            //     <div>
                            //         COMMENTAIRE<br />
                            //         {commentaire.commentaire.content}<br />
                            //         {commentaire.reponses ? (<> Réponse<br />
                            //             {commentaire.reponses.map(comment =>
                            //                 comment.content)}</>
                            //             ):null}
                            //         <form onSubmit={this.handleSubmit}>
                            //             <input required onChange={(event)=>{this.setState({content:event.target.value,commentaire_id:commentaire.commentaire.id})}}/>
                            //             <input type="submit" value="Répondre" ></input>
                            //         </form>
                            //     </div>
                            // </div> */}
                </div>
                <div className="mx-5">
                  <label className="text-gray-700 font-medium my-4">
                    COMMENTAIRE
                  </label>
                  <p className="text-gray-600 text-sm ">
                    {" "}
                    {commentaire.commentaire.content}
                  </p>

                  <p className="mt-2">Réponse</p>
                  {commentaire.reponses ? (
                    <>
                      {commentaire.reponses.map((comment) => (
                        <div className="text-gray-600 text-sm mt-2">
                          {comment.content}
                        </div>
                      ))}
                    </>
                  ) : null}
                  <form onSubmit={this.handleSubmit} className="my-3 ">
                    <input
                      className="h-9 border rounded focus:outline-none bg-blue-100 focus:bg-white focus:border-2 focus:border-gray-200 px-3"
                      required
                      onChange={(event) => {
                        this.setState({
                          content: event.target.value,
                          commentaire_id: commentaire.commentaire.id,
                        });
                      }}
                    />
                    <input
                      type="submit"
                      className="mx-3 bg-gray-100 "
                      value="Répondre"
                    ></input>
                  </form>
                </div>
                <div className="h-10"> </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Commentaire;
