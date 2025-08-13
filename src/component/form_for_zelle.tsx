'use client'
import { useEffect, useState } from "react";
import IconCopy from "./svg/iconcop_copy";
import ZelleSvg from "./svg/zelle";
import ToastDone from "./toast";
import BoxToMonto from "./box_to_monto";
import { keyTypeForm } from "@/types/data_types";
const ZELLE = 'importljstore@gmail.com'
const ANOMBRE = 'Import LJ Store LLC'

export default function FormForZelle ({ monto, callProcessPay }: { monto: number, callProcessPay: (e: keyTypeForm) => {} }) {
    const [text, settext] = useState('')

    const callCALLBACK = () => {
        // callProcessPay("REGISTER")
    }
    return (
        <div className="flex flex-col items-center mx-2 mt-1">
            <div className="">
                <ZelleSvg className="w-[100px] h-[100px]" />
            </div>
            <div className="mt-4 border rounded-md p-1 w-full">
                <label htmlFor="tdc" className="inline-block mb-1  mr-2 text-base  font-medium text-sky-900 dark:text-white">Cuenta Zelle: </label>
                <h3 className="inline" >{ZELLE} <button onClick={() => settext(ZELLE)}><IconCopy className="my-2 inline-block" /></button></h3>
            </div>

            <div className="mt-4 border rounded-md p-1 w-full">
                <label htmlFor="tdc" className="inline-block mb-1  mr-2 text-base  font-medium text-sky-900 dark:text-white">A nombre de: </label>
                <h3 className="inline" >{ANOMBRE} <button onClick={() => settext(ANOMBRE)}><IconCopy className="my-2 inline-block" /></button></h3>
            </div>
            <BoxToMonto monto={monto} />
            <div className="flex flex-row justify-between mt-10 w-full">
                <button type="button" onClick={callCALLBACK} className="w-full text-white  bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar Pago</button>
            </div>
            <ToastDone textcpy={text} />

        </div>
    )
}