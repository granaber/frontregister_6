import { keyTypeForm } from "@/types/data_types";


export default function FormForTDC ({ monto, callProcessPay }: { monto: number, callProcessPay: (e: keyTypeForm) => {} }) {
    const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // callProcessPay("REGISTER")
    }
    return (
        <form onSubmit={handleSumit} className="mx-2 mt-1">
            <div className="mb-6 ">
                <label htmlFor="tdc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. de Tarjeta</label>
                <input type="number" id="tdc" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="#### #### #### ####" required />
            </div>
            <div className="mb-6">
                <label htmlFor="titular" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del Titular</label>
                <input type="text" id="titular" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Nombre del Titular" required />
            </div>
            <div className="flex flex-row gap-2">
                <div className="mb-6 basis-2/4">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Vencimiento</label>
                    <div className="flex flex-row gap-1">
                        <select id="mes" defaultValue={0} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" >Mes</option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select id="anno" defaultValue={0} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" >Año</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>

                </div>
                <div className="mb-6 basis-2/4">
                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codigo de Seguridad</label>
                    <input type="password" id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
            </div>

            <div className="flex flex-row justify-between">
                <button type="reset" className="text-white bg-slate-400 hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Cancelar</button>
                <button type="submit" className="w-[98.64px] text-white  bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pagar</button>
            </div>
        </form>
    )
}