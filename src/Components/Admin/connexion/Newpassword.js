import React from 'react'
import { Formik, Form, Field } from 'formik';
import Nav from '../../forms/Navbar/NavbarUpvo';
import axios from 'axios';
import history from '../../../history';


const Password = (props)=> {
        return (
            <Formik
                initialValues={{ new: '' }}
                onSubmit={(value) => {
                    const {match:{params}}=props
                    const values = {
                        password:value.new,
                        id: params.email_id,
                        time: params.time_id
                    }
                    axios.post('/admin/new/password', values).then(response=>{
                        if (response.data.lien === "OK") {
                           alert("votre mot de passe a été modiefié")
                            { history.push('/') }

                        } else {
                           alert("Lien expiré")
                            { history.push('/forgot/password')}
                        }
                    })
                }}
            >
                <>
                    <Nav />
                    <div className=" w-2/6 py-10">
                        <div className=" w-11/12 bg-gray-100 border rounded ">
                            <Form className="  px-10" >
                                <h1 className="block tracking-wide text-gray-700 text-xl font-bold mb-2 my-5">Mot de passe oublié</h1>
                                <label className="block tracking-wide text-gray-700 text-base font-bold mb-2 my-8" for="grid-city">
                                    New password
                                            </label>
                                <Field type="password" required name="new" className="w-full appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                                                px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Adresse e-mail "
                                />
                                <button className="w-full appearance-none block text-white rounded py-3
                                                px-4 my-10 leading-tight focus:outline-none hover:font-bold"  type="submit">Ok</button>
                            </Form>
                        </div>
                    </div>

                </>
            </Formik>
         
        );
    }

export default Password;