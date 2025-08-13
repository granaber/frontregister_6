"use client"
import { useEffect, useState } from "react";
import { Badge } from 'flowbite-react'
import { dataConfirmTDC, typeOp } from "@/types/data_types";

export default function FormEndTDC ({ idfac }: { idfac: string }) {
    const [recordFront, setrecordFront] = useState<dataConfirmTDC>({ fecha: '', idfactura: 0, monto: 0, noapro: '', status: true, errortext: '' })
    const callFunction = (idFacture: number) => {

        fetch(`/api?idFacture=${idFacture}`)
            .then((res) => res.json())
            .then((data) => {
                setrecordFront({
                    ...data
                })
            })
    }
    useEffect(() => {
        const idFacture = Number(idfac)
        callFunction(idFacture)
    }, [idfac])

    return (

        <div className="grid  gap-4 mb-4 sm:grid-cols-2">
            <div>
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Pago Procesando por <span className="text-blue-600 dark:text-blue-500">Tarjeta de Credito</span> </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Nuestro sistema no alamacena ningunos de los datos colocados para el cobro de los servicios</p>
            </div>
            <div className="bg-gray-300 w-full h-[25em]  mb-4   rounded-lg">
                <div className='pt-5 pl-5 w-[6.5rem]'>
                    <Badge color={recordFront.status ? "success" : "failure"} size="sm">
                        <p>{recordFront.status ? "Aprobado" : "Rechazado"}</p>
                    </Badge>
                </div>
                <div className="grid gap-4 mb-4 px-5 pt-2 sm:grid-cols-2">
                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="noapro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero de Aprobación</label>
                        <input value={recordFront.noapro} type="text" name="noapro" id="noapro" disabled className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="idfactura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No de Transacción</label>
                        <input value={recordFront.idfactura} type="idfactura" name="idfactura" id="idfactura" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="monto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monto</label>
                        <input value={recordFront.monto} type="text" name="monto" id="monto" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {recordFront.status ?
                        <div className="col-span-2 lg:col-span-1">
                            <label htmlFor="fecha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Cobro</label>
                            <input value={recordFront.fecha} type="text" name="fecha" id="fecha" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="11/11/11 11:11" />
                        </div>
                        : <div className="col-span-2">
                            <label htmlFor="fecha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mensaje</label>
                            <input value={recordFront.errortext} type="text" name="fecha" id="fecha" disabled className="bg-red-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Información mensaje" />
                        </div>}

                </div>
            </div>
        </div >
    )
}