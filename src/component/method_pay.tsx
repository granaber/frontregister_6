"use client"
import MasterCardSvg from "./svg/mastercard";
import PagoMovilSvg from "./svg/pagomovil";
import TranferSvg from "./svg/transfer";
import VisaSvg from "./svg/visa";
import ZelleSvg from "./svg/zelle";
import BinanceSvg from './svg/binance'
import { typeOp } from "@/types/data_types";
import AlertGo from "./alert";
import { useState } from "react";




export default function MethodPay ({ montoSelect, callBackSelect }: { montoSelect: number, callBackSelect: (options: typeOp) => {} }) {
    const [viewalert, setviewAlert] = useState(false)

    const setSelect = (op: typeOp) => {
        if (montoSelect === 0) {
            setviewAlert(true)
            return
        }
        callBackSelect(op)
    }

    return (<>
        <AlertGo show={viewalert} cb={async (e) => setviewAlert(e)} title="Información!" text="Debe Seleccionar el Monto a recargar" />
        <div className="mx-2 ">
            <h3 className="ml-2 mb-1 mt-3 font-semibold text-gray-900 dark:text-white">Metodos de Pagos</h3>
            <ul className="grid w-full gap-2 md:grid-rows-1">
                <li>
                    <input onClick={() => setSelect("TDC")} type="radio" id="tdc" name="typepay" value="tdc" className="hidden peer" />
                    <label htmlFor="tdc" className="inline-flex items-center justify-between w-full py-1 px-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-blue-200 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <VisaSvg className="inline-block mr-3" />
                            <MasterCardSvg className="inline-block" />
                        </div>
                        <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" ><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </label>
                </li>
                <li>
                    <input onClick={() => setSelect("ZELLE")} type="radio" id="zelle" name="typepay" value="zelle" className="hidden peer" />
                    <label htmlFor="zelle" className="inline-flex items-center justify-between w-full  py-1 px-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-blue-200 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <ZelleSvg className="w-[50px] h-[50px]" />
                        </div>
                        <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" ><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </label>
                </li>
                <li>
                    <input onClick={() => setSelect("BINANCE")} type="radio" id="binance" name="typepay" value="binance" className="hidden peer" />
                    <label htmlFor="binance" className="inline-flex items-center justify-between w-full  py-2 px-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500  peer-checked:bg-blue-200 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <BinanceSvg className="w-[40px] h-[40px]  inline-block mr-3" /> <h4 className="inline-block">Binance</h4>
                        </div>
                        <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" ><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </label>
                </li>
                <li>
                    <input onClick={() => setSelect("PAGOMOVIL")} type="radio" id="pagomovil" name="typepay" value="pagomovil" className="hidden peer" />
                    <label htmlFor="pagomovil" className="inline-flex items-center justify-between w-full  py-1 px-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-blue-200 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <PagoMovilSvg className="inline-block mr-3" />
                        </div>
                        <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" ><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </label>
                </li>
                <li>
                    <input onClick={() => setSelect("TRANSFER")} type="radio" id="transfer" name="typepay" value="transfer" className="hidden peer" />
                    <label htmlFor="transfer" className="inline-flex items-center justify-between w-full  py-1 px-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-blue-200 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <TranferSvg />
                        </div>
                        <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" ><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </label>
                </li>
            </ul>
        </div>

    </>

    )
}