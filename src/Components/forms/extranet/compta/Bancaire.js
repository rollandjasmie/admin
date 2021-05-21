import React, { useState, useEffect } from 'react'
export default () => {
    useEffect(() => {

    }, [])
    return (
        <div className="flex mx-5 my-5 border h-auto w-8/12 text-gray-500">
            <div className="w-9 bg-gray-300 h-auto">

            </div>
            <div className="mx-3 my-3">
                <p>Vous pouvez consulter et modifier vos coordonnées bancaires actuelles ici</p>
                <div className="border my-4">
                    <p className="mx-3 my-3 font-bold text-gray-600"> Réception des paiements de Runbnb</p>
                    <p className="mx-3 my-3">Nous utiliserons ces coordonnées bancaires pour vous transferer vos paiements</p>
                </div>
                <div className="border mb-4">
                    <p className="mx-3 my-3 font-bold text-gray-600"> Coordonnées bancaires</p>
                    <label className="flex mx-3 my-3">
                        <p className="mx-3 my-3 font-medium text-gray-600 w-1/2">IBAN</p>
                        <p className="mx-3 my-3">FR245368795215254813</p>
                    </label>
                    <label className="flex mx-3 my-3">
                        <p className="mx-3 my-3 font-medium text-gray-600 w-1/2">Nom du titulaire du compte</p>
                        <p className="mx-3 my-3">JEAN MARC-ROUSSEAU</p>
                    </label>
                    <center>
                        <button className="border rounded text-white flex items-center justify-center mx-3 my-3 px-5 py-2">
                        Modifier les coordonnées bancaires
                        </button>
                    </center>
                </div>
            </div>
        </div>
    )
}
