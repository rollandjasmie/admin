import React, { useState, useEffect } from 'react'
import axios from "axios";
import 'moment/locale/fr'
import { createBrowserHistory } from 'history'
import Button from '@material-ui/core/Button';
import { Formik,Form,Field } from 'formik';
const history = createBrowserHistory()
export default function Show(props) {
    const [logements, setLogement] = useState()
    useEffect(() => {
        const { match: { params } } = props
        axios.get(`/logement/${params.logement_id}/show`).then(response => {
            setLogement({
                name: response.data.logement.name,
                description:response.data.logement.description,
                status: response.data.logement.status,
                photo: response.data.photo,

            })
        })
    }, [])
    function supp(id) {
        const asy = async () => {
            await axios.delete(`/logements/${id}/delete`)
            history.push("/logements/all")
            window.location.reload()
        }
        asy()
    }
    return (
        <div>
					{logements ? (
            <Formik
                initialValues={logements}
                onSubmit={values => {
									const { match: { params } } = props
									axios.put(`/logements/${params.logement_id}`,values).then( response =>{
										history.push(`/logement/${params.logement_id}/show`)
				            window.location.reload()
										}
										)
											}}>
						{({ values, errors, handleSubmit, touched, setFieldValue }) => (
							<Form onSubmit={handleSubmit}>
											<div>
                            <img src={logements.photo} alt="Logement" width="30%"></img><br />
                            <div onClick={() => { if (window.confirm('Vous êtes sûr?')) supp(logements.logement.id) }}>
                                Supprimer
                            </div>
                            <div className="">
                                <span className="field bg-white shadow-md rounded px-8 pt-6 pb-8 mb-1 rounded-2xl mx-5">
                                    <div className='foutu-overflow'>
                                            <label>Titre de l'annonce</label><br />
                                        <Field
                                            name="name"
                                            placeholder="Titre de l'annonce"
                                        />
                                        <br />
                                            <label>Description</label><br />
                                        <Field
                                            name="description"
                                            placeholder='Description'
                                        />
                                        <br />
                                            <label>Status</label><br />
                                        <Field
                                            name="status"
                                            placeholder="Status"
                                        />
                                        <br />
                                        <br />
                                        <Button type="submit"
                                            style={{ background: "#F47E54", color: "#fff" }}
                                        >Enregistrer</Button>
                                    </div>
                                </span>
                                </div>
                            </div>
						    </Form>
         		)}
					</Formik>
			) : null}
        </div>
    )
}
