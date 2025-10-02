"use client"
import { useContext, useEffect, useState } from "react";
import { Badge } from 'flowbite-react'
import { formStatus, registerDataWithoutPay } from "@/types/data_types";
import { Context } from "@/context";

export default function FormEndNone ({ idu }: { idu: number }) {
    const { dataU } = useContext(Context)

    console.log({ dataU })
    const [recordFront, setrecordFront] = useState<registerDataWithoutPay>({ status: "NOAPROBADO", code_user: -1, email_user: "@", name_user: "Generic", pwd_user: "xxxx", tel_user: "", code_bono: "NO TIENE", mnd: 1 })
    const callFunction = async () => {

        // fetch(`/api/register?itype=send_data_usertemp&idu=${dataU.id}`)
        //     .then((res) => res.json())
        //     .then((data: registerDataWithoutPay) => {
        setrecordFront({
            ...dataU,
            status: dataU.id === -1 ? "NOAPROBADO" : "APROBADO"
        })
        // })

    }
    useEffect(() => {
        callFunction()
    }, [])

    return (

        <div className="grid  gap-4 mb-4 sm:grid-cols-2">
            <div>
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Registro de  <span className="text-blue-600 dark:text-blue-500">Usuario</span> </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Nuestro sistema no alamacena ningunos de los datos colocados para el cobro de los servicios</p>
            </div>
            <div className="bg-gray-300 w-full h-[25em]  mb-4   rounded-lg">
                <div className='pt-5 pl-5 w-[7.5rem]'>
                    <Badge color={recordFront.status === "ENESPERA" ? "warning" : recordFront.status === "NOAPROBADO" ? "failure" : "success"} size="sm">
                        <p>{formStatus[recordFront.status]}</p>
                    </Badge>
                </div>
                <div className="grid gap-4 mb-4 px-5 pt-2 sm:grid-cols-2">
                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="noapro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de su Usuario</label>
                        <input value={recordFront.name_user} type="text" name="noapro" id="noapro" disabled className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="idfactura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                        <input value={recordFront.email_user} type="idfactura" name="idfactura" id="idfactura" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {recordFront.status === "APROBADO" || recordFront.status === "ENESPERA" ?
                        <>
                            {/* <div className="col-span-2">
                                <label htmlFor="codebono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codigo de Bono</label>
                                <input value={recordFront.code_bono === "" ? 'SIN CODIGO DE BONO' : recordFront.code_bono} type="text" name="codebono" id="codebono" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div> */}

                            <div className="col-span-2">
                                <label htmlFor="monto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Se enviara el mensaje de confirmación al numero </label>
                                <input value={recordFront.tel_user} type="text" name="monto" id="monto" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </>

                        : <div className="col-span-2">
                            <label htmlFor="fecha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mensaje</label>
                            <input value="Su acceso no fue Aprobado!" type="text" name="fecha" id="fecha" disabled className="bg-red-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Información mensaje" />
                        </div>}

                </div>
            </div>
        </div >
    )
}