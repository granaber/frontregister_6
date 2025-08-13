'use client'

import { Alert } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi'
import { BiLike, BiDislike } from 'react-icons/bi'

export default function AdditionalContent ({ title, text, show, cb }: { title: string, text: string, show: boolean, cb: (e: boolean, s: number) => {} }) {
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        if (show) {
            setShowAlert(true)
        }
    }, [show])

    const handle = (e: number) => {
        setShowAlert(false)
        cb(false, e)
    }
    return (
        showAlert ?
            <Alert className='absolute z-10 top-[10%] left-[35%]' additionalContent={<ContentAlert text={text} cb={handle} />} color="warning" icon={HiInformationCircle}>
                <span>
                    <p>
                        <span className="font-medium">{title}</span>
                    </p>
                </span>
            </Alert>
            : <></>
    )
}

const ContentAlert = ({ text, cb }: { text: string, cb: (e: number) => void }) => {
    return (
        <div>
            <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
                {text}
            </div>
            <div className="flex">
                <button
                    onClick={() => cb(1)}
                    type="button"
                    className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
                >
                    <BiLike className='text-lg mr-1' />
                    Aceptar
                </button>
                <button
                    onClick={() => cb(2)}

                    type="button"
                    className="rounded-lg border  border-cyan-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-cyan-700 hover:bg-cyan-800 hover:text-white focus:ring-4 focus:ring-cyan-300 dark:border-cyan-800 dark:text-cyan-800 dark:hover:text-white"
                >
                    <BiDislike className='text-lg mr-1 inline-block' />
                    Cancelar
                </button>
            </div>
        </div>
    )
}
