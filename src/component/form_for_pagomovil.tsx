'use client'
import { useEffect, useState } from "react";
import PagoMovilSvg from './svg/pagomovil'
import IconCopy from "./svg/iconcop_copy";
import ToastDone from "./toast";
import BoxToMonto from "./box_to_monto";
import { keyTypeForm } from "@/types/data_types";
const [CODE, TELEFONO] = ['414', '6771134']
const [PRE, IDENTIFICACION] = ['J', '2980199203']
const BANCO = 'BANESCO'

export default function FormForPagoMovil ({ monto, callProcessPay }: { monto: number, callProcessPay: (e: keyTypeForm) => {} }) {
    const [text, settext] = useState('')

    const callCALLBACK = () => {
        // callProcessPay("REGISTER")
    }

    return (
        <div className="flex flex-col items-center mx-2 mt-1">
            <div className="mt-4">
                <PagoMovilSvg className="inline-block" />
            </div>
            <div className="mt-4 border rounded-md p-1 w-full">
                <label htmlFor="tdc" className="inline-block mb-1  mr-2 text-base  font-medium text-sky-900 dark:text-white">Teléfono Móvil</label>
                <h3 className="text-base font-bold text-gray-900 dark:text-white inline">{CODE}</h3>-
                <h3 className="inline" >{TELEFONO} <button onClick={() => settext(TELEFONO)}><IconCopy className="my-2 inline-block" /></button></h3>
            </div>
            <div className="mt-4 border rounded-md p-1 w-full">
                <label htmlFor="tdc" className="inline-block mb-1  mr-2 text-base  font-medium text-sky-900 dark:text-white">Identificación </label>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white inline">{PRE}</h3>-
                <h3 className="inline" >{IDENTIFICACION} <button onClick={() => settext(IDENTIFICACION)}><IconCopy className="my-2 inline-block" /></button></h3>
            </div>
            <div className="mt-4 border rounded-md p-1 w-full">
                <label htmlFor="tdc" className="inline-block mb-1  mr-2 text-base  font-medium text-sky-900 dark:text-white">Banco </label>
                <h3 className="inline" >{BANCO} </h3>
            </div>
            <BoxToMonto monto={monto} />
            <div className="flex flex-row justify-between mt-10 w-full">
                <button type="button" onClick={callCALLBACK} className="w-full text-white  bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar Pago</button>
            </div>
            <ToastDone textcpy={text} />
        </div>
    )
}