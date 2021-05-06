import React, { useEffect,useState } from 'react';
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
    content: Yup.string().required("Le champ ne doit pas être vide"),
});


function Commentaire (props) {
    const [reservation,setReservation]=useState()
    useEffect(() => {
        axios.get(`/logements/${props.logement_id}/reservation/commentaire`).then(res =>{
                setReservation(res.data.reservation)
           }
          )
    }, [])
        const { user } = props;
        const { isAuthenticated } = props;
        return (
            <>
            {reservation ?(
                <>
                        {isAuthenticated && user.is_client === true && reservation.includes(user.id)  ? (
                            <Formik
                                validationSchema={LoginSchema}
                                initialValues={{
                                    content: null,
                                    personnel: 0,
                                    qualite_prix: 0,
                                    proprete: 0,
                                    equipement: 0,
                                }}
                                onSubmit={(values, { resetForm }) => {
                                    axios
                                        .post(
                                            `/logements/${props.logement_id}/commentaire/`,
                                            values
                                        )
                                        .then((response) => console.log(response));
                                    resetForm();

                                    }}
                            >
                                {({ errors, touched, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div>
                                            <h1 className="font-medium text-base"> Laissez un commentaire</h1>
                                            <Field
                                                component="textarea"
                                                name="content"
                                                className="outline-none leading-tight py-2 px-2 my-3 h-10 w-10/12 border rounded  focus:bg-white bg-blue-100"
                                                placeholder="Mettez votre commentaire ici"
                                                required
                                            />
                                            <br />

                                           </div>
                                        <div className="my-3 ">
                                            <h1>Personnel</h1>
                                            <Field
                                                type="number"
                                                className="my-3 h-10 outline-none border rounded text-center focus:bg-white bg-blue-100"
                                                name="personnel"
                                                step="1"
                                                max="10"
                                                required

                                            />
                                            <br />
                                        </div>
                                        <div className="my-3 ">
                                            <h1>Qualité prix</h1>
                                            <Field
                                                type="number"
                                                className="my-3 h-10 outline-none border rounded text-center focus:bg-white bg-blue-100"
                                                name="qualite_prix"
                                                max="10"
                                            />
                                            <br />
                                        </div>
                                        <div className="my-3 ">
                                            <h1>Propreté</h1>
                                            <Field
                                                type="number"
                                                className="my-3 h-10 outline-none border rounded text-center focus:bg-white bg-blue-100"
                                                name="proprete"
                                                max="10"
                                            />
                                            <br />
                                        </div>
                                        <div className="my-3 ">
                                            <h1>equipement</h1>
                                            <Field
                                                type="number"
                                                className="my-3 h-10 outline-none border rounded text-center focus:bg-white bg-blue-100"
                                                name="equipement"
                                                max="10"
                                            />
                                            <br />
                                        </div>
                                        <button
                                            type="submit"
                                            className="rounded text-white hover:font-medium py-2 px-4"
                                        >
                                            CREER
                                </button>
                                    </Form>
                                )}
                            </Formik>
                        ) : null}

                </>
            ):null}
            </>
        );
    }
const mapStateToPropos = (state) => {
    return {
        ...state.auth,
    };
};

export default  connect(mapStateToPropos)(Commentaire);