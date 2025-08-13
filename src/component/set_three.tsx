"use client"
import { useEffect, useState } from "react";
import { typeOp, infoTypeOptions, statusConfirmDatos, dataFormShow } from "@/types/data_types";
import FormConfirmZelle from "./form_confirm_pay/form_confirm_zelle";
import FormConfirmPagoMovil from "./form_confirm_pay/form_confirm_pagomovil";
import FormConfirmTranferencia from "./form_confirm_pay/form_confirm_transferencia";
import FormConfirmTDC from "./form_confirm_pay/form_confirm_tdc";
import FormConfirmBinance from "./form_confirm_pay/form_confirm_binance";
import FormInfo from "./info-modal/showmodal";



export default function SetThreePay ({ type, monto, callConfirnRegister }: { type: typeOp, monto: number, callConfirnRegister: (e: boolean) => {} }) {
    const [stateModal, setStateModal] = useState<boolean>(false)
    const [getInfoForm, SetgetInfoForm] = useState<String>("NONE")
    const [idataForm, setidataForm] = useState<dataFormShow>({
        idu: -1,
        code_confirm: "",
        name_confirm: "",
        bank_config: undefined,
        date_transac: undefined,
        monto: 0,
        formatpay: 1
    })
    const [form, setForm] = useState(<></>)

    useEffect(() => {
        const listForm = {
            TDC: <FormConfirmTDC />,
            ZELLE: <FormConfirmZelle monto={monto} callConfirmdata={async (e) => handleData(e)} />,
            BINANCE: <FormConfirmBinance monto={monto} callConfirmdata={async (e) => handleData(e)} />,
            PAGOMOVIL: < FormConfirmPagoMovil monto={monto} callConfirmdata={async (e) => handleData(e)
            } />,
            TRANSFER: <FormConfirmTranferencia monto={monto} callConfirmdata={async (e) => handleData(e)} />,
            NONE: <></>
        }
        const { texto } = infoTypeOptions[type]
        SetgetInfoForm(texto)
        setForm(listForm[type])

    }, [type])
    const confirmThisModal = (e: boolean, s: statusConfirmDatos) => {
        setStateModal(e)
        if (s === "APRORBADO") {
            callConfirnRegister(true)
        }
    }
    const handleData = (d: dataFormShow) => {
        setidataForm(d)
        setStateModal(true)
    }
    return (
        <div className="h-3/4">
            <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Reporte de Pago {getInfoForm}</h3>

            {form}
            <FormInfo setStates={async (e, s) => confirmThisModal(e, s)} getStates={stateModal} type={type} datafrom={idataForm} />
        </div>
    )
}