
import { Alert } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function AlertGo ({ title, text, show, cb }: { title: string, text: string, show: boolean, cb: (e: boolean) => {} }) {
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        if (show) {
            setShowAlert(true)
        }
    }, [show])

    useEffect(() => {

        const ti = setTimeout(() => {
            setShowAlert(false)
            cb(false)
        }, 4000)

        return () => clearTimeout(ti)

    }, [showAlert])
    return (
        showAlert ?
            <Alert
                className='fixed top-16 left-1/3'
                color="warning"
                icon={IoIosInformationCircleOutline}
            >
                <span>
                    <p>
                        <span className="font-medium mr-2">
                            {title}
                        </span>
                        <p className='text-sky-800'>
                            {text}

                        </p>
                    </p>
                </span>
            </Alert>
            : <></>
    )
}