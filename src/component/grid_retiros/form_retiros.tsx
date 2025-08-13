'use client';

import { dataListRetiros, process } from '@/types/data_types';
import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react';

const FormData = ({ data, changeCallbackState }: { data: dataListRetiros, changeCallbackState: (e: process, d: dataListRetiros) => {} }) => {
    const [dataRetiros, setdataRetiros] = useState<dataListRetiros>(data)

    const handlenDataform = (type: number, value: string | boolean | number) => {
        let field: string = "noapro"
        if (type === 1) {
            field = "noapro"
        }

        const ndata = type !== 1
            ? Number(value)
            : value.toString()


        setdataRetiros({ ...dataRetiros, [field]: ndata })
    }
    const handleNext = (e: React.SyntheticEvent) => {
        e.preventDefault()
    }

    useEffect(() => {
        setdataRetiros({ ...data, noapro: "" })
    }, [data])
    return (
        <form onSubmit={handleNext} className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="monto"
                        value="Monto a Retirar"
                    />
                </div>
                <TextInput
                    key="BONOKEY-1"
                    placeholder=""
                    value={dataRetiros?.monto}
                    type="text"
                    disabled
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="txtFormatPay"
                        value="Forma del Retiro"
                    />
                </div>
                <TextInput
                    id="txtFormatPay"
                    placeholder='Forma del Retiro'
                    type="text"
                    value={dataRetiros?.textformatpay}
                    disabled

                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="user_name"
                        value="Nombre del Usuario"
                    />
                </div>
                <TextInput
                    id="user_name"
                    placeholder='Nombre del Usuario'
                    type="text"
                    value={dataRetiros?.user_name}
                    disabled
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="noapro"
                        value="Documento de aprobación"
                    />
                </div>
                <TextInput
                    id="noapro"
                    placeholder='Documento de Aprobación del Retiro'
                    type="text"
                    value={dataRetiros?.noapro}
                    onChange={({ target: { value } }) => handlenDataform(1, value)}
                    autoComplete='off'
                    autoFocus
                />
            </div>
            <Modal.Footer>
                <Button type="button" onClick={() => changeCallbackState('save', dataRetiros)}>Grabar Bono</Button>
                <Button type="button" color="gray" onClick={() => changeCallbackState('cancel', dataRetiros)}>
                    Cancelar
                </Button>
            </Modal.Footer>

        </form>
    )
}
export default function ModalForRetiros ({ data, open, setopen }: { data: dataListRetiros, open: string, setopen: (e: process, d: dataListRetiros) => {} }) {
    const [openModal, setOpenModal] = useState<string | undefined>(open);
    const props = { openModal, setOpenModal };
    const [dataBonus, setdataBonus] = useState<dataListRetiros>(data)



    const changeCallbackState = (e: process, d: dataListRetiros) => {
        props.setOpenModal(undefined)
        setopen(e, d)
    }


    useEffect(() => {
        setOpenModal(open)
        setdataBonus(data)
    }, [open, data])

    return (
        <>
            <Modal show={props.openModal === 'default'} popup onClose={() => changeCallbackState('cancel', dataBonus)}>
                <Modal.Header>Retiros</Modal.Header>
                <Modal.Body>
                    <FormData data={dataBonus} changeCallbackState={async (e, d) => changeCallbackState(e, d)} />
                </Modal.Body>

            </Modal >
        </>
    )
}


