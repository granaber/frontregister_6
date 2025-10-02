import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import "flag-icons/css/flag-icons.min.css";
import { countryAvalible } from '@/types/data_types'

export default function SelectCountry ({ getBtn }: { getBtn: (e: string, mnd: number, flag: string) => {} }) {
    const [dataCountry, SetdataCountry] = useState<countryAvalible[]>([])
    useEffect(() => {
        const getCountry = async () => {
            const r = await fetch('/api/list?type=country')
            const data = await r.json()
            SetdataCountry(data)
        }
        getCountry()
    }, [])
    return (
        <div className='w-full h-[42em] flex flex-col  items-center  z-10 absolute  bg-slate-600/50 backdrop-blur-sm  rounded-lg p-5'>
            <h1 className='text-2xl font-bold text-gray-700'>Selecciona tu país</h1>
            <div className='w-full md:h-5/6 h-full overflow-y-auto flex md:flex-row flex-col justify-center items-center gap-2 md:gap-14 px-5'>
                {dataCountry.map((e, i) => (

                    <div key={`keyimga-${e.id}`} className="md:h-100  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className='md:h-20 h-10 flex justify-center items-center mt-5 md:mt-0'>
                            <span className={`fi ${e.flag}  text-4xl  md:text-7xl`} ></span>
                        </div>
                        <div className="px-5 pb-5">
                            <div className="flex justify-center items-center">
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-whiten md:block hidden">{e.name}</h5>
                            </div>
                            <div className="flex items-center   flex-col  mt-2.5 mb-5">

                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ">{e.code}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <a href="#" onClick={() => getBtn('hidden', e.mnd, e.flag)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Seleccionar</a>
                            </div>
                        </div>
                    </div>

                    // <div key={i} className={`w-full cursor-pointer hover:bg-gray-100 flex flex-row justify-start items-center gap-5 p-3 rounded-md  bg-white border border-gray-200'`}>
                    //     {/* <Image src={e.flag} alt={e.name} width={32} height={32} className='rounded-sm shadow-md' /> */}

                    // </div>
                ))}
            </div>
        </div >
    )
} 