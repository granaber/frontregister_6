"use client"
import { useEffect, useState } from "react";
import FormForTDC from "./form_for_tdc";
import FormForZelle from "./form_for_zelle";
import FormForBinance from "./form_for_binance";
import FormForPagoMovil from "./form_for_pagomovil";
import FormForTransfer from "./form_for_transfer";
import { typeOp, keyTypeForm } from "@/types/data_types";



export default function SubFormPay ({ options, monto, callProcessPay }: { options: typeOp, monto: number, callProcessPay: (e: keyTypeForm) => {} }) {
    const [useMonto, setuseMonto] = useState<number>(monto)
    const [form, setForm] = useState(<></>)
    useEffect(() => {
        setuseMonto(monto)
    }, [monto])

    useEffect(() => {
        const listForm = {
            TDC: <FormForTDC monto={monto} callProcessPay={async (e) => { callProcessPay(e) }} />,
            ZELLE: <FormForZelle monto={useMonto} callProcessPay={async (e) => callProcessPay(e)} />,
            BINANCE: <FormForBinance monto={useMonto} callProcessPay={async (e) => callProcessPay(e)} />,
            PAGOMOVIL: <FormForPagoMovil monto={useMonto} callProcessPay={async (e) => callProcessPay(e)} />,
            TRANSFER: <FormForTransfer monto={useMonto} callProcessPay={async (e) => callProcessPay(e)} />,
            NONE: <></>
        }
        setForm(listForm[options])

    }, [options, useMonto])

    return form
}