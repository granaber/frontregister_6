'use client'
import { createContext, useState } from "react";
import { dataFormShow, dataUser, registerDataWithoutPay, statusConfirm } from "@/types/data_types";
interface contextDatauser {
    dataU: dataUser;
    setRegister: (d: dataUser) => void;
    data_confirm: dataFormShow;
    setDataConfim: (d: dataFormShow) => void;
    dataRegisterConf: registerDataWithoutPay
    setDataRegisterConf: (d: registerDataWithoutPay) => void
}

const defautlContextDataUser = {
    dataU: { id: -1, email_user: "", name_user: "", pwd_user: "", tel_user: "", code_user: 0, code_bono: "" },
    data_confirm: { idu: -1, code_confirm: '', name_confirm: undefined, bank_code: 0, bank_config: undefined, date_transac: undefined, monto: 0, formatpay: 1 },
    dataRegisterConf: {
        name_user: '',
        email_user: '',
        pwd_user: '',
        tel_user: '',
        code_user: 0,
        code_bono: '',
        id: - 1,
        status: 'ENESPERA' as statusConfirm
    },
    setRegister: () => { },
    setDataConfim: () => { },
    setDataRegisterConf: () => { }
}

export const Context = createContext<contextDatauser>(defautlContextDataUser)

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [dataU, setData] = useState<dataUser>(defautlContextDataUser.dataU)
    const [data_confirm, setConfirm] = useState<dataFormShow>(defautlContextDataUser.data_confirm)
    const [dataRegisterConf, setDataRegisterConfConfirm] = useState<registerDataWithoutPay>(defautlContextDataUser.dataRegisterConf)

    const setRegister = (d: dataUser) => {
        setData(d)
    }
    const setDataConfim = (d: dataFormShow) => {
        setConfirm(d)
    }
    const setDataRegisterConf = (d: registerDataWithoutPay) => {
        setDataRegisterConfConfirm(d)
    }
    return (
        <Context.Provider value={{ dataU, data_confirm, dataRegisterConf, setDataConfim, setRegister, setDataRegisterConf }}>
            {children}
        </Context.Provider >
    )
}