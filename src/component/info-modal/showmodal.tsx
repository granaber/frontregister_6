'use client';

import { useState, useEffect, useContext } from 'react';
import { Context } from '@/context';
import { typeOp, infoTypeOptions, dataFormShow, statusConfirmDatos } from '@/types/data_types';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useUpdateData } from "@/useHook";

type MODE = "CLOSE" | "CORRECT"
export default function FormInfo ({ type, datafrom, getStates, setStates }: { type: typeOp, datafrom: dataFormShow, getStates: boolean, setStates: (e: boolean, s: statusConfirmDatos) => {} }) {
    const { data_confirm, setDataConfim } = useContext(Context)
    const { handleApiSaveData } = useUpdateData()
    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };

    const { texto, frm: formatpay } = infoTypeOptions[type]

    const handleShow = () => {
        props.setOpenModal('form-elements')
    }
    const handleOff = async (mode: MODE) => {
        props.setOpenModal(undefined)
        let captMode: MODE = mode
        if (mode === "CORRECT") {
            const { error, textErr, idu } = await handleApiSaveData()
            captMode = error ? 'CLOSE' : mode
            if (!error) {
                setDataConfim({ ...data_confirm, idu })
            }
        }
        const s: statusConfirmDatos = captMode === "CLOSE" ? "RECHAZADO" : "APRORBADO"
        setStates(false, s)
    }
    useEffect(() => {
        if (getStates) {
            handleShow()
        }
    }, [getStates])

    useEffect(() => {

        const f = datafrom.date_transac?.split("-").reverse().join("/")
        setDataConfim({ ...datafrom, date_transac: f, formatpay })

    }, [datafrom])

    return (
        <>
            {/* <Button className='absolute top-[206px] left-[340px]' onClick={() => props.setOpenModal('form-elements')}>Siguiente : Procesar Pago</Button> */}
            <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Pagos {texto}</h3>
                        {data_confirm.code_confirm !== 'not-referent' ?
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="code_confirm" value="Numero de Rerenfencia" />
                                </div>
                                <TextInput id="code_confirm" placeholder="Sin Referencia" disabled value={data_confirm.code_confirm} />
                            </div>
                            : <></>}
                        {typeof data_confirm.name_confirm !== 'undefined' ?
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name_confirm" value="A nombre de" />
                                </div>
                                <TextInput id="name_confirm" disabled value={data_confirm.name_confirm} />
                            </div>
                            : <></>}

                        {typeof data_confirm.bank_config !== 'undefined' ?
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="bank_config" value="Banco Emisor" />
                                </div>
                                <TextInput id="bank_config" disabled value={data_confirm.bank_config || ""} />
                            </div>
                            : <></>}

                        {typeof data_confirm.date_transac !== 'undefined' ?
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="date_transac" value="Fecha de la transacción" />
                                </div>
                                <TextInput id="date_transac" disabled value={data_confirm.date_transac || ""} />
                            </div>
                            : <></>}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="monto" value="Monto" />
                            </div>
                            <TextInput id="monto" disabled value={data_confirm.monto} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={async () => handleOff("CLOSE")}>CANCELAR</Button>
                    <Button color="gray" onClick={async () => handleOff("CORRECT")}>
                        TODO ES CORRECTO?
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


