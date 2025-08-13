"use client"
import { dataFormShow } from "@/types/data_types";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";


export default function FormConfirmZelle ({ monto, callConfirmdata }: { monto: number, callConfirmdata: (e: dataFormShow) => {} }) {
    const [thisDate, setthisDate] = useState<any>()
    const [records, setRecords] = useState<dataFormShow>({ idu: 0, formatpay: 0, bank_config: undefined, code_confirm: "", date_transac: "", monto: monto, name_confirm: "" })
    const [stateBg, setstateBg] = useState<string>(' border-gray-300')

    const handlenDataform = (type: number, data: any) => {
        let field: string = "name_confirm"
        if (type === 1) {
            field = "code_confirm"
        }
        if (type === 2) {
            field = "name_confirm"
        }
        if (type === 3) {
            field = "date_transac"
            setthisDate(data)
            const newRecord = { ...records, [field]: data.startDate }
            setRecords(newRecord)
            setstateBg(' border-gray-300')
            return
        }
        const newRecord = { ...records, [field]: data }
        setRecords(newRecord)
    }
    const handleConfirm = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (records.date_transac === "") {
            setstateBg('bg-red-200 border-red-800 ')
            return false
        }
        callConfirmdata(records)
    }


    return (

        <form onSubmit={handleConfirm} className="grid gap-4 mb-4 sm:grid-cols-2 ">
            <div>
                <label htmlFor="num_confirm" className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero de Confirmación</label>
                <input required onChange={({ target: { value } }) => handlenDataform(1, value)} type="text" name="num_confirm" id="num_confirm" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Numero de confirmación" />
            </div>
            <div>
                <label htmlFor="name_consumer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de la cuenta Zelle</label>
                <input required onChange={({ target: { value } }) => handlenDataform(2, value)} type="text" name="name_consumer" id="name_consumer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="A nombre de" />
            </div>
            <div>
                <label htmlFor="get-date-transaccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de la transacción</label>
                <Datepicker
                    inputClassName={`${stateBg}  w-full border rounded-md focus:ring-0 font-normal  dark:bg-green-900 dark:placeholder:text-green-100`}
                    onChange={(d) => handlenDataform(3, d)}
                    useRange={false}
                    asSingle={true} value={thisDate} displayFormat={"DD/MM/YYYY"} i18n="en" primaryColor="blue" />
            </div>
            <div>
                <label htmlFor="monto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monto</label>
                <input disabled value={monto} type="text" name="monto" id="monto" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Monto" />
            </div>
            <button type="submit" className="text-white h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Siguiente : Procesar Pago
            </button>


        </form>
    )
}