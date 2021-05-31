import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import Nav from '../../forms/Navbar/NavbarUpvo';
import axios from 'axios';
class Password extends Component {
    state = {}
    render() {
        return (
            <Formik
                initialValues={{ email: '' }}
                onSubmit={(values) => {
                    console.log(values);
                    axios.post('/admin/forgot/password', values)
                }}
            >
                <>
                    <Nav />
                    <div className=" w-full py-10 flex justify-center">
                                    <div className=" w-4/12 bg-gray-100 shadow border rounded ">
                            <Form className="  px-10" >
                                <h1 className="block tracking-wide text-gray-700 text-xl font-bold mb-2 my-5">Mot de passe oublié</h1>
                                <label className="block tracking-wide text-gray-700 text-base font-bold mb-2 my-8" for="grid-city">
                                    Adresse e-mail
                                </label>
                                <Field name="email" className="w-full appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                                                px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Adresse e-mail "
                                />
                                  <div className="w-full flex justify-center">
                                            <button className=" appearance-none block text-white rounded py-2
                                                px-5 my-10 leading-tight focus:outline-none hover:font-bold"  type="submit">Suivant</button>
                                                </div>
                            </Form>
                        </div>
                    </div>

                </>
            </Formik>
        );
    }
}

export default Password;