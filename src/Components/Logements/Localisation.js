import React from 'react';
import { Formik, Form, Field } from 'formik';
import scriptLoader from 'react-async-script-loader'
import * as Yup from 'yup';
import $ from "jquery";

const LocalisationSchema = Yup.object().shape({
    ville: Yup.string()
      .required('Champs obligatoire'),
    code : Yup.string()
        .required('Champs obligatoire')
});

class Localisation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      adresse:props.formValue.localisation.adresse
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({adresse:e.target.value})
    const google = window.google
    const input = document.getElementById("pac-input");
    var options = {
      componentRestrictions: { country: "RE" },
      fields: ["address_components", "geometry", "icon", "name"],
    };
    const searchBox = new google.maps.places.SearchBox(input, options);

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      console.log(places);
      console.log(places[0].geometry.location.lat());
      console.log("places");
      console.log(places[0].geometry.location.lng());
      $("#pac-input").val()
      this.setState({
        googlemap: {
          latitude: places[0].geometry.location.lat(),
          longitude: places[0].geometry.location.lng(),
          },
          adresse:$("#pac-input").val()
        })


    });
  }
  render() {
    return (
      <Formik
  
       validationSchema={LocalisationSchema}
        initialValues={this.props.formValue.localisation}
        onSubmit={values => {
          console.log(this.props.formValue.localisation.adresse)
          let { formValue, setFormValue } = this.props;
          if (this.state.googlemap) {
            formValue = {
              ...formValue,
              localisation: {
                pays: 'La Réunion',
                ville: values.ville,
                adresse: this.state.adresse,
                code: values.code
              },
              map: {
                latitude: this.state.googlemap.latitude,
                longitude: this.state.googlemap.longitude,
                zoom: 8.56
              }
            }
          } else {
          const villes =  {
              "Basse Vallée":[-21.351144425787524, 55.69982829067352],
              "Bernica":[-21.0490748,55.2745928],
              "Bois de Nèfles":[-20.98644241911565, 55.32959448594687],
              "Bras Panon":[-21.0055451583881, 55.69193469795323],
              "Cambuston":[-20.931621664715045, 55.648457221200715],
              "Cilaos":[-21.135794064566028, 55.4628122369591],
              "Entre Deux":[-21.24540541073276, 55.47065329063244],
              "Gillot":[-20.8919791650006, 55.515028957864004],
              "Grand Îlet":[-21.030812,55.4671248],
              "Hell Bourg":[-21.058237780260963, 55.51671608259824],
              "L'Étang-Salé":[-21.250273733282796, 55.37225744075249],
              "La Bretagne":[-20.929091719885008, 55.49438879738184],
              "La Chaloupe":[-21.149236180372757, 55.3189702234904],
              "La Montagne":[-20.90148649399876, 55.40903626824781],
              "La Nouvelle": [-21.0739984, 55.4188478],
              "La Plaine des Cafres":[-21.220598655445823, 55.55899009210566],
              "La Plaine des Palmistes":[-21.1398913,55.6149785],
              "La Possession":[-20.93226493192573, 55.33591852861461],
              "La Rivière":[-21.24488470544306, 55.43504753312376],
              "La Saline":[-21.085228479137378, 55.26531801453888],
              "La Saline les Bains":[-21.09291943719195, 55.24043938334602],
              "Le Guillaume":[-21.0377650088282, 55.299290797965604],
              "Le Port":[-20.944643255224992, 55.29496912120569],
              "Le Quatorzième":[-21.251725743064938, 55.52121423322052],
              "Le Tampon":[-21.28539769310363, 55.51947420599277],
              "Le Tévelave":[-21.212987,55.3476735],
              "Les Avirons":[-21.240076372149513, 55.334333698043935],
              "Les Makes":[-21.2108718,55.3955736],
              "Les Trois Bassins":[-21.102876533322007, 55.29036633816327],
              "Les Trois Mares":[-21.2536672774772, 55.49841824081806],
              "Manapany les Bains":[-21.3753436,55.5851222],
              "Palmiste Rouge":[-21.16964989958149, 55.47457999736679],
              "Petite-Île":[-21.3479649,55.5602895],
              "Rivière des Pluies":[-20.91021580640848, 55.50864952043132],
              "Rivière du Mat":[-20.971329158050573, 55.689215409807275],
              "Saint-André":[-20.962805655581075, 55.6471801251489],
              "Saint-Benoît":[-21.043436025641174, 55.71783549818889],
              "Saint-Bernard":[-20.904979,55.3944744],
              "Saint-Denis":[-20.88828219510062, 55.454656990424006],
              "Saint-Gilles les Bains":[-21.056585812638524, 55.22501257025559],
              "Saint-Gilles les Hauts":[-21.04871229356869, 55.268832574362975],
              "Saint-Joseph":[-21.379716979290105, 55.612723040617674],
              "Saint-Leu":[-21.17377293414196, 55.28820998960509],
              "Saint-Louis":[-21.29102752113834, 55.409667871279275],
              "Saint-Paul":[-21.01332527250319, 55.2693123791314],
              "Saint-Philippe":[-21.35747788237021, 55.764698871299295],
              "Saint-Pierre":[-21.335038774644595, 55.47929657890186]
            }
            Object.keys(villes).map((ville,key)=>{
              if (ville === values.ville) {
                formValue = {...formValue,
                                localisation:{
                                            pays: 'La Réunion',
                                            ville: values.ville,
                                            adresse: this.state.adresse,
                                            code: values.code},
                                map:{
                                  latitude: villes[ville][0],
                                  longitude: villes[ville][1],
                                  zoom: 8.56
                                }
                          }
              }
            })
          }
          setFormValue(formValue);
          this.props.nextStep();
        }}
     >
       {({ values, errors, touched, setFieldValue }) => (
         <Form>
             <h1 className="w-11/12 text-xl font-bold mt-10 pl-5  pt-5">Où se situe l’hébergement que vous inscrivez ?</h1>
            <div className="w-auto on inline-block element mt-15 pl-10 my-5 mx-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10" >
              <div class="w-full mb-6 md:mb-0">

                <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                Pays
                </label>
                <Field  name="pays" value='La Réunion' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Nom de l'hébergement" />
                
              
              <div class="w-full mb-6 md:mb-0 mt-4">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Ville
                </label>
                <div className="relative">
                  <Field as="select" name="ville" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        <option >-------------Ville--------------</option>
                        <option value="Basse Vallée">Basse Vallée</option>
                        <option value="Bernica">Bernica</option>
                        <option value="Bois de Nèfles">Bois de Nèfles</option>
                        <option value="Bras Panon">Bras Panon</option>
                        <option value="Cambuston">Cambuston</option>
                        <option value="Cilaos">Cilaos</option>
                        <option value="Entre Deux">Entre Deux</option>
                        <option value="Gillot">Gillot</option>
                        <option value="Grand Îlet">Grand Îlet</option>
                        <option value="Hell Bourg">Hell Bourg</option>
                        <option value="L'Étang-Salé">L'Étang-Salé</option>
                        <option value="La Bretagne">La Bretagne</option>
                        <option value="La Chaloupe">La Chaloupe</option>
                        <option value="La Montagne">La Montagne</option>
                        <option value="La Nouvelle">La Nouvelle</option>
                        <option value="La Plaine des Cafres">La Plaine des Cafres</option>
                        <option value="La Plaine des Palmistes">La Plaine des Palmistes</option>
                        <option value="La Possession">La Possession</option>
                        <option value="La Rivière">La Rivière</option>
                        <option value="La Saline">La Saline</option>
                        <option value="La Saline les Bains">La Saline les Bains</option>
                        <option value="Le Guillaume">Le Guillaume</option>
                        <option value="Le Port">Le Port</option>
                        <option value="Le Quatorzième">Le Quatorzième</option>
                        <option value="Le Tampon">Le Tampon</option>
                        <option value="Le Tévelave">Le Tévelave</option>
                        <option value="Les Avirons">Les Avirons</option>
                        <option value="Les Lianes">Les Lianes</option>
                        <option value="Les Makes">Les Makes</option>
                        <option value="Les Trois Bassins">Les Trois Bassins</option>
                        <option value="Les Trois Mares">Les Trois Mares</option>
                        <option value="Manapany les Bains">Manapany les Bains</option>
                        <option value="Palmiste Rouge">Palmiste Rouge</option>
                        <option value="Petite-Île">Petite-Île</option>
                        <option value="Rivière des Pluies">Rivière des Pluies</option>
                        <option value="Rivière du Mat">Rivière du Mat</option>
                        <option value="Saint-André">Saint-André</option>
                        <option value="Saint-Benoît">Saint-Benoît</option>
                        <option value="Saint-Bernard">Saint-Bernard</option>
                        <option value="Saint-Denis">Saint-Denis</option>
                        <option value="Saint-Gilles les Bains">Saint-Gilles les Bains</option>
                        <option value="Saint-Gilles les Hauts">Saint-Gilles les Hauts</option>
                        <option value="Saint-Joseph">Saint-Joseph</option>
                        <option value="Saint-Leu">Saint-Leu</option>
                        <option value="Saint-Louis">Saint-Louis</option>
                        <option value="Saint-Paul">Saint-Paul</option>
                        <option value="Saint-Philippe">Saint-Philippe</option>
                        <option value="Saint-Pierre">Saint-Pierre</option>
                        {/* <option value="Sainte-Clotilde">Sainte-Clotilde</option>
                        <option value="Sainte-Marie">Sainte-Marie</option>
                        <option value="Sainte-Rose">Sainte-Rose</option>
                        <option value="Sainte-Suzanne">Sainte-Suzanne</option>
                        <option value="Sainte-Thérèse">Sainte-Thérèse</option>
                        <option value="Salazie">Salazie</option>
                        <option value="Vincendo">Vincendo</option> */}
                  </Field>
                  { errors.ville && touched.ville ? (
                <div className="text-red-600 text-sm font-bold">{errors.ville}</div>
              ) : null }
                </div>
              </div>
              </div>
  
              <div className="w-full mb-6 md:mb-0 my-4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    Adresse (ligne 1)                  
              </label>
                <input name="adresse" id="pac-input" onChange={(e) => { this.handleChange(e)}} defaultValue={this.props.formValue.localisation.adresse} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Adresse" />
            </div>
              <div className="w-full mb-6 md:mb-0 mt-4">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                code postal
                </label>
                <div className="relative">
                <Field  name="code" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Code postal" />
                { errors.code  && touched.code  ? (
                <div className="text-red-600 text-sm font-bold">{errors.code }</div>
              ) : null }
                  
                </div>
                
              </div>
              <hr className="my-4"/> 
               <div className="w-full mb-6 md:mb-0 mt-4">

              <button class="w-auto text-white font-bold py-2 px-4 rounded mr-1" onClick={this.props.previousStep}>Précédent</button>
              <button  class="w-auto text-white font-bold py-2 px-4 rounded my-3" type="submit">Suivant</button>
            </div>
            </div>
          </Form>
       )}
     </Formik>
    )
  }
}

export default scriptLoader(
  [
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js'
  ]
)(Localisation);