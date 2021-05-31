import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import history from '../../../history';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const SignupSchema = Yup.object().shape({
    pseudo: Yup.string()
        .min(6, 'au moins 6 caractères!'),
    mobile: Yup.number()
        .min(10, 'Min 10 caractères!')
        .min(12, 'Max 12 caractères!'),
      
       

});



function Home(props) {
    const [users, setUsers] = useState(false)
    const [cherche, setCherche] = useState(false)
    const {match:{params}} = props
    useEffect(() => {
        axios.get(`/show/${params.admin_id}/admin`).then(response => (
            setUsers(response.data.admin)
        ))

    }, [])



    const { isAuthenticated } = props;
    const { user } = props;
    return (
        <>
            <div className="flex">
                <ToastContainer />

                <div className="w-3/12 h-screen bg-gray-700">
                    <h1 className="bg-gray-800 text-white text-5xl font-bold h-32 flex items-center justify-center"> Runbnb.com </h1>
                    <div className="text-white text-base font-bold h-20 flex items-center justify-center bg-indigo-500 bg-opacity-25 border-r-4 border-red-500" >
                        Utilisateurs

                    </div>
                    <div className="text-white text-base  h-20 flex items-center justify-center">
                        <NavLink to={'/logements/all'}>
                            Logements
                        </NavLink>
                    </div>
                    {
                        user.niveau === "2" ? (
                            <>
                                <div className="text-white text-base  h-20 flex items-center justify-center">
                                    <NavLink to={'/admin'}>
                                        Admin
                                    </NavLink>
                                </div>
                                <div className="text-white text-base  h-20 flex items-center justify-center">
                                    <NavLink to={'/comptabilite'}>
                                        Comptabilité
                                    </NavLink>
                                </div>
                                <div className="text-white text-base  h-20 flex items-center justify-center">
                                    <NavLink to={'/historique'}>
                                        Historique
                                    </NavLink>
                                </div>
                            </>
                            
                        ) : null
                    }
                </div>
                {users?(
                    <div className="w-2/3 mx-5 my-5">
                        <Formik
                            validationSchema={SignupSchema}
                            initialValues={users}
                            onSubmit={values => {
                                console.log(values)
                                async function add() {
                                    await axios.post(`/update/${users.id}/admin`, values).then(response => {
                                        if (response.data.statu === "Email déjà existé") {
                                            toast.error("Email déjà existé")

                                       }else{
                                           history.push(`/admin/show/${users.id}`)
                                       }
                                    })
                                }
                                add()
                            }}
                        >
                            {({ values, errors, handleSubmit, touched, setfieldValue }) => (
                                <Form className="cont" onSubmit={handleSubmit}>
                                    <Field required   name="pseudo" placeholder="Pseudo" minlength="6" type="text"></Field><br />
                                    <Field required   name="first" placeholder="Prénom" type="text"></Field><br />
                                    <Field required   name="name" placeholder="Nom" type="text"></Field><br />
                                    <Field required   name="email" placeholder="Email" type="email"></Field><br />
                                    <Field required   name="mobile" placeholder="Numéro de tél portable" type="tel" minlength="10" maxlength="12" ></Field><br />
                                    <label className="text-red-600 text-sm ">
                                    </label>
                                    <Field required   name="adresse" placeholder="Adresse complète (numéro + rue, code postal, ville, Région/département)" type="text"></Field><br />
                                    <label>
                                        Niveau d’accréditation:<br />
                                        <label>1<br />
                                            <Field required   name="niveau" type="radio" value="1"></Field>
                                        </label> ou
                                        <label>2
                                            <br />
                                            <Field required   name="niveau" type="radio" value="2"></Field>
                                        </label>
                                    </label><br />

                                    <label>
                                        Statut:<br />
                                        <label>actif<br />
                                            <Field required   name="statu" placeholder="" value="actif" type="radio"></Field>
                                        </label>ou
                                        <label>en pause
                                            <br />
                                            <Field required   name="statu" placeholder="" value="en pause" type="radio"></Field>
                                        </label>
                                    </label><br />

                                    <div className="flex items-end justify-end my-5">
                                        <button class=" text-white font-bold py-2 px-4 rounded mr-1" onClick={() => { history.push('/admin') }} >annuler</button>
                                        <button class=" text-white pl-6 pr-6 font-bold py-2 px-4 rounded" type="submit">Modifier</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>

                ):null}
                </div>
        </>
    );
}
const mapStateToprops = (state) => {
    return {
        ...state.auth
    }
}
export default connect(mapStateToprops)(Home);