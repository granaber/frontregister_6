"use client";
import { useContext, useEffect, useState } from "react";
import FormEndTDC from "./form_end_pay/form_end_tdc";
import FormEndZELLE from "./form_end_pay/form_end_zelle";
import { typeOp } from "@/types/data_types";
import FormEndPagoMovil from "./form_end_pay/form_end_pagomovil";
import FormEndTransferencia from "./form_end_pay/form_end_transferencia";
import { Context } from "@/context";
import FormEndBinance from "./form_end_pay/form_end_binance";
import FormEndNone from "./form_end_pay/form_end_without_pay";

export default function SetFourPay ({ data, type }: { data: string, type: typeOp }) {
    const [form, setForm] = useState(<></>)
    const { data_confirm } = useContext(Context)


    useEffect(() => {
        const { idu } = data_confirm
        const listForm = {
            TDC: <FormEndTDC idfac={data} />,
            ZELLE: <FormEndZELLE idu={idu} />,
            BINANCE: <FormEndBinance idu={idu} />,
            PAGOMOVIL: <FormEndPagoMovil idu={idu} />,
            TRANSFER: <FormEndTransferencia idu={idu} />,
            NONE: <FormEndNone idu={idu} />
        }
        console.log({ type })
        setForm(listForm[type])

    }, [type])

    return (
        <>
            {form}

        </>
    )
}


