const SETMONTOS: number[] = [10, 20, 50, 100]

export default function AmountsForPay ({ setMonto }: { setMonto: (e: number) => {} }) {
    return (
        <>
            <h3 className="ml-2 mb-1 mt-1 font-semibold text-gray-900 dark:text-white">Seleccione el monto a recargar</h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-gray-300  sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                {
                    SETMONTOS.map((o, i) =>
                        <li key={`m-${o}`} className="w-full dark:border-gray-600">
                            <div className="flex items-center pl-2">
                                <input onClick={() => setMonto(o)} id="horizontal-list-radio-license" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="horizontal-list-radio-license" className="w-full py-1 sm:py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${o} </label>
                            </div>
                        </li>
                    )
                }



            </ul>
        </>
    )
}