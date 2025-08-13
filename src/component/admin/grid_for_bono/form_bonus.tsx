'use client';

import { initListBonus, listBonus, process } from '@/types/data_types';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react';

const FormData = ({ data, changeCallbackState }: { data: listBonus, changeCallbackState: (e: process, d: listBonus) => {} }) => {
    const [dataBonus, setdataBonus] = useState<listBonus>(initListBonus)

    const handlenDataform = (type: number, value: string | boolean | number) => {
        let field: string = "codigo_bono"
        if (type === 1) {
            field = "codigo_bono"
        }
        if (type === 2) {
            field = "monto"
        }
        if (type === 3) {
            field = "cantidad"
        }
        if (type === 4) {
            field = "active"
        }

        const ndata = type !== 1
            ? Number(value)
            : value.toString().toUpperCase()
        const newdataform: listBonus = { ...dataBonus, [field]: ndata }

        setdataBonus(newdataform)
    }
    const handleNext = (e: React.SyntheticEvent) => {
        e.preventDefault()
    }

    useEffect(() => {
        setdataBonus(data)
    }, [data])
    return (
        <form onSubmit={handleNext} className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="code_bono"
                        value="Codigo Bono"
                    />
                </div>
                <TextInput
                    key="BONOKEY-1"
                    placeholder="BONONUEVO"
                    onChange={({ target: { value } }) => handlenDataform(1, value)}
                    value={dataBonus.codigo_bono}
                    type="text"

                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="monto"
                        value="Monto del Bono"
                    />
                </div>
                <TextInput
                    id="monto"
                    placeholder='Monto del Monto'
                    required
                    type="number"
                    onChange={({ target: { value } }) => handlenDataform(2, value)}
                    value={dataBonus.monto}
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="cantidadmax"
                        value="Cupo del Bono"
                    />
                </div>
                <TextInput
                    id="cantidadmax"
                    placeholder='Cantidad maxima de cupos para el bono'
                    required

                    type="number"
                    onChange={({ target: { value } }) => handlenDataform(3, value)}
                    value={dataBonus.cantidad}
                />
            </div>
            <div className="flex items-center gap-2 mt-6" >
                <Checkbox
                    id="agree_bono"
                    checked={dataBonus.active}

                    onChange={({ target: { checked } }) => handlenDataform(4, checked)}
                // onClick={(e) => console.log(e)}
                />
                <Label
                    className="flex"
                    htmlFor="agree_bono"
                >
                    <p>
                        Habilitar el Bono
                    </p>
                </Label>
            </div>
            <Modal.Footer>
                <Button type="button" onClick={() => changeCallbackState('save', dataBonus)}>Grabar Bono</Button>
                <Button type="button" color="gray" onClick={() => changeCallbackState('cancel', dataBonus)}>
                    Cancelar
                </Button>
            </Modal.Footer>

        </form>
    )
}
export default function ModalForBonus ({ data, open, setopen }: { data: listBonus, open: string, setopen: (e: process, d: listBonus) => {} }) {
    const [openModal, setOpenModal] = useState<string | undefined>(open);
    const props = { openModal, setOpenModal };
    const [dataBonus, setdataBonus] = useState<listBonus>(data)



    const changeCallbackState = (e: process, d: listBonus) => {
        props.setOpenModal(undefined)
        setdataBonus(initListBonus)
        setopen(e, d)
    }


    useEffect(() => {
        setOpenModal(open)
        setdataBonus(data)
    }, [open, data])

    return (
        <>
            <Modal show={props.openModal === 'default'} popup onClose={() => changeCallbackState('cancel', dataBonus)}>
                <Modal.Header>Bono</Modal.Header>
                <Modal.Body>
                    <FormData data={dataBonus} changeCallbackState={async (e, d) => changeCallbackState(e, d)} />
                </Modal.Body>

            </Modal >
        </>
    )
}


