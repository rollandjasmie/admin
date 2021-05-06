import { fitBounds } from 'google-map-react';
import React, { Component } from 'react';
import fb from '../../assets/images/fb.png'
import insta from '../../assets/images/insta.png'
export default class Footer extends Component {
 
    render() {
        return (
            <section class="w-full text-gray-600 body-font">
            <div class="w-full py-5 ">
              <div class="w-full bg-blue-500 h-9  mb-10">
               
              </div>
              <center>
              <div class="w-11/12 flex flex-wrap ">
                <div class="p-4  lg:w-1/4 sm:w-1/2 w-1/4">
                  <h2 class="font-bold title-font tracking-widest text-blue-500 mb-4 text-2xl  sm:text-left">RUNBNB</h2>
                  <nav class="text-blue-500 flex flex-col sm:items-start sm:text-left   -mb-1 space-y-2.5">
                    <a>
                     Qui sommes nous?
                    </a>
                    <a>
                    Notre philosophie
                    </a>
                    <a>
                     Nos dalons concierges
                    </a>
                    <a>
                     Recrutement
                    </a>
                   
                  </nav>
                </div>
                <div class="p-4  lg:w-1/4 sm:w-1/2 w-1/4">
                  <h2 class="font-bold title-font tracking-widest text-blue-500 mb-4 text-2xl  sm:text-left">VOYAGEUR</h2>
                  <nav class="text-blue-500 flex flex-col sm:items-start sm:text-left   -mb-1 space-y-2.5">
                    <a>
                    L'ile de la Réunion
                    </a>
                    <a>
                     Tous les Hébergement
                    </a>
                    <a>
                     Toutes les villes
                    </a>
                    <a>
                     Toutes les offres
                    </a>
                   
                  </nav>
                </div>
                <div class="p-4  lg:w-1/4 sm:w-1/2 w-1/4">
                  <h2 class="font-bold title-font tracking-widest text-blue-500 mb-4 text-2xl  sm:text-left">PROPRIETAIRE</h2>
                  <nav class="text-blue-500 flex flex-col sm:items-start sm:text-left   -mb-1 space-y-2.5">
                    <a>
                     Ajouter un hébergement
                    </a>
                    <a>
                    Service à la carte
                    </a>
                    <a>
                     Service premium
                    </a>
                    <a>
                     Gerer mes annonces
                    </a>
                   
                  </nav>
                </div>
                <div class="p-4  lg:w-1/4 sm:w-1/2 w-1/4">
                  <h2 class="font-bold title-font tracking-widest text-blue-500 mb-4 text-2xl  sm:text-left">ASSISTANCE</h2>
                  <nav class="text-blue-500 flex flex-col sm:items-start sm:text-left   -mb-1 space-y-2.5">
                    <a>
                  Ressources
                    </a>
                    <a>
                    Nous contacter
                    </a>
           
                  </nav>
                </div>
              </div>
              <div class="flex items-center justify-center h-10 my-5">
                    <p class="text-blue-500 ">Copyright ©2021 runbnb, tout droits réservé - Condition générales de vente - Mentions légales - Données personnelles</p>
                      <img className="h-9 w-9 mx-4 overflow-x-hidden" src={fb}></img>
                    <img className="h-9 w-9 overflow-x-hidden" src={insta}></img>
            </div>
              </center>
            </div>
          </section>
        )
    }
}