"use client"
import { useEffect, useState, useContext } from "react";
import { keyTypeForm } from "@/types/data_types";
import VisaSvg from "./svg/visa";
import MasterCardSvg from "./svg/mastercard";
import PCIsvg from "./svg/pci";
import { Context } from "@/context";

const items = `Servicio de recarga-`

export default function FormForTDC ({ monto, callProcessPay }: { monto: number, callProcessPay: (e: keyTypeForm) => {} }) {
    const { dataU } = useContext(Context)

    const [tItems, settItems] = useState<String>(`${items}${monto}`)

    useEffect(() => {
        settItems(`${items}${monto}`)
    }, [monto])

    const redirect = () => {
        fetch(`/api/register?itype=temp_data`, { method: "POST", body: JSON.stringify(dataU) })
            .then((res) => res.json())
            .then((data) => {
                const { id } = data
                const url = `http://localhost:5200/apipay.php?rq=PAY&items=${tItems}&code=${id}`//`https://betgambler.net/apipay.php?rq=PAY&items=${tItems}&code=${id}`
                window.location.replace(url)
            })
    }

    return (
        <form className="mx-2 mt-1">
            <section className="bg-gray-400 w-full h-[20em]  my-5 rounded-lg">
                <div className="w-full h-[3em] text-center bg-slate-600 rounded-t-lg mb-10">
                    <h3 className="text-orange-100 pt-2"> Descripción del pago</h3>
                </div>
                <section className="flex flex-row justify-between px-10 py-4  bg-slate-400">
                    <h4 className="text-base text-yellow-50">Servicio de recarga</h4>
                    <h4 className="text-base text-yellow-50">Importe ${monto}</h4>
                </section>
                <section className="flex flex-row gap-4 justify-center mt-10 ">
                    <VisaSvg className="mt-8" />
                    <MasterCardSvg className="mt-8" />
                    <PCIsvg className="mt-1" />
                </section>

            </section>

            <div className="flex flex-row justify-between">
                <a onClick={redirect} className="w-full cursor-pointer text-1xl text-white  bg-orange-700 hover:bg-orange-700 focus:ring-2 focus:outline-none focus:ring-orange-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Pagar</a>
            </div>
        </form>
    )
}