import { useEffect, useState } from "react";
import { keyTypeForm, textButton, typeOp } from "@/types/data_types";
import SetOnePay from "./set_one";
import SetTwoPay from "./set_two";
import SetThreePay from "./set_three";
import SetFourPay from "./set_four";





export default function SubFormMain ({ options, data, getBtn, callProcessPay }: { options: keyTypeForm, data: string, getBtn: (e: string[]) => {}, callProcessPay: (e: keyTypeForm) => {} }) {

    const [form, setForm] = useState(<SetOnePay callNext={async (e) => setthisoptions(e)} />)
    const [typePay, settypePay] = useState<typeOp>("NONE")
    const [thisoptions, setthisoptions] = useState<keyTypeForm>(options)
    const [getMonto, setGetMonto] = useState<number>(0)

    useEffect(() => {
        const listForm = {
            DATAUSER: <SetOnePay callNext={async (e) => setthisoptions(e)} />,
            // DATAPAY: <SetTwoPay callBackSelectPay={async (e, monto) => { settypePay(e); setGetMonto(monto) }} callProcessPay={async (e) => { setthisoptions(e); callProcessPay(e); }} />,
            REGISTER: <SetThreePay type={typePay} monto={getMonto} callConfirnRegister={async (e) => handlenConfirm(e)} />,
            ENDFORM: <SetFourPay data={data} type={typePay} />,
            x: <></>
        }

        setForm(listForm[thisoptions])
        getBtn(textButton[thisoptions])

    }, [thisoptions, typePay, setthisoptions, settypePay])

    useEffect(() => {
        setthisoptions(options)
        if (data !== '') {
            settypePay("TDC")
        }
    }, [options])

    const handlenConfirm = (e: boolean) => {
        if (e) {
            setthisoptions('ENDFORM')
            callProcessPay("ENDFORM")
        }
    }

    return form

}


