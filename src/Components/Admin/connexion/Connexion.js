import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { userLoginAttempt } from '../../../redux/Auth/auth.action';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Le champ ne doit pas être vide'),
    password: Yup.string()
        .required('Le champ ne doit pas être vide')
});

class Signup extends React.Component {

    render() {
        const { error } = this.props
        return (

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    const value={
                        email: values.email,
                        password: values.password,
                        admin:true
                    }
                    this.props.userLoginAttempt(value);
                }}
            >
                {({ errors, touched }) => (
                    <>
                        <div className="bg-white w-full">
                            <div className=" flex justify-center w-full my-5 pt-5 px-10">
                                <h1 className="text-5xl   font-bold ">Admin <span className="runbnb">Runbnb.com</span></h1>
                            </div>



                            <div className=" flex justify-center w-full  ">
                                <div className=" w-5/12  border rounded shadow">

                                    <Form className="  px-10" >
                                        <h1 className="block tracking-wide text-gray-700 text-xl font-bold mb-2 my-5">Se connecter</h1>

                                        <label className="block tracking-wide text-gray-700 text-base font-bold mb-2 my-8" for="grid-city">
                                            Adresse e-mail
                                        </label>
                                        <Field name="email" className="w-full appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                                            px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Adresse e-mail "
                                        />
                                        {errors.email && touched.email ? (<div className="text-red-600 text-sm font-bold">{errors.email}</div>) : null}
                                        <label className="block tracking-wide text-gray-700 text-base font-bold mb-2 my-8" for="grid-city">
                                            Mot de passe
                                        </label>
                                        <Field name="password" type="password" className="w-full appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                                            px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder=" Mot de passe  " />
                                        {errors.password && touched.password ? (<div className="text-red-600 text-sm font-bold">{errors.password}</div>) : null}
                                        <label className="text-red-600 text-sm ">
                                            {error}
                                        </label>
                                        <button className="w-full appearance-none block  text-white rounded py-3
                                            px-4 my-10 leading-tight focus:outline-none hover:font-bold cursor-pointer"  type="submit">Se connecter</button>
                                    </Form>
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </Formik>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLoginAttempt: (values) => { dispatch(userLoginAttempt(values)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
