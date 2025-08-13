"use client"
import { useEffect, useRef, useState } from "react";
import AmountsForPay from "./amounts";
import MethodPay from "./method_pay";
import SubFormPay from "./sub_form_topay";
import { typeOp, keyTypeForm } from "@/types/data_types";

export default function SetTwoPay ({ callBackSelectPay, callProcessPay }: { callBackSelectPay: (e: typeOp, monto: number) => {}, callProcessPay: (e: keyTypeForm) => {} }) {
    const [getSelect, SetgetSelect] = useState<typeOp>('NONE')
    const [getMonto, setGetMonto] = useState<number>(0)
    const [processPay, setprocessPay] = useState<keyTypeForm>("x")
    const [applycss, setApplycss] = useState<String>("hidden sm:block")
    const divSelectForPay = useRef<HTMLDivElement>(null)
    useEffect(() => {
        callBackSelectPay(getSelect, getMonto)
        setApplycss('block')
    }, [getSelect])

    useEffect(() => {
        callProcessPay(processPay)
    }, [processPay, setprocessPay])
    useEffect(() => {
        if (divSelectForPay !== null)
            divSelectForPay?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [applycss])
    useEffect(() => {
        setApplycss("hidden sm:block")
    }, [])
    return (
        <>
            <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white  hidden sm:block">Montos / Metodo de Pagos</h3>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className="bg-gray-300 w-full  lg:h-[30em]  rounded-lg ">
                    <AmountsForPay setMonto={async (e) => setGetMonto(e)} />
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <MethodPay montoSelect={getMonto} callBackSelect={async (e) => { SetgetSelect(e) }} />
                </div>

                <div ref={divSelectForPay} className={`bg-gray-300 w-full  h-[30em] rounded-lg ${applycss}`}>
                    <SubFormPay options={getSelect} monto={getMonto} callProcessPay={async (e) => { setprocessPay(e) }} />
                </div>
            </div>

        </>
    )
}