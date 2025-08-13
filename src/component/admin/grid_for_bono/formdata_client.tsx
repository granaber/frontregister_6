'use client';

import { NEWRECORD, listBonus, listClientWithBono, listUserAvalible, process } from "@/types/data_types"
import { Button, Checkbox, Label, Modal, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"

export default function FormDataClient ({ data, listClients, dataListBonus, changeCallbackState }: { data: listClientWithBono, listClients: listUserAvalible[], dataListBonus: listBonus[], changeCallbackState: (e: process, d: listClientWithBono) => {} }) {
    const [dataClientBonus, setdataClientBonus] = useState<listClientWithBono | null>(data)

    const handlenDataform = (type: number, value: string | boolean | number) => {
        let field: string = "codigo_bono"
        if (type === 1) {
            field = "IDC"
        }
        if (type === 2) {
            // field = "idcodigo"
            handleChangeThisBonus(Number(value))
            return
        }
        if (type === 3) {
            field = "saldo"
        }



        const ndata = type !== 1
            ? Number(value)
            : value.toString()

        const newdataform: listClientWithBono = { ...dataClientBonus, [field]: ndata } as listClientWithBono

        setdataClientBonus(newdataform)
    }
    const handleChangeThisBonus = (code_bonus: number) => {
        const dataB = dataListBonus.find(o => o.id === code_bonus)
        if (dataB) {
            const { monto } = dataB
            const newdataform: listClientWithBono = {
                ...dataClientBonus,
                monto,
                saldo: data.idcodigo !== code_bonus ? monto : data.saldo,
                idcodigo: code_bonus,
                codigo_bono: dataB.codigo_bono
            } as listClientWithBono
            setdataClientBonus(newdataform)
        }
    }
    const handleNext = (e: React.SyntheticEvent) => {
        e.preventDefault()
    }

    useEffect(() => {
        setdataClientBonus(data)
        console.log('FormData', data)
        return () => { }

    }, [data, setdataClientBonus])
    return (
        <form onSubmit={handleNext} className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="usuario_name"
                        value="Nombre de usuario"
                    />
                </div>
                <Select
                    id="usuario_name"
                    onChange={({ target: { value } }) => handlenDataform(1, value)}
                >
                    <option value={NEWRECORD.toString()} disabled selected={NEWRECORD === dataClientBonus?.idcodigo}>SELECCIONE EL USUARIO</option>
                    {listClients.map(o => {
                        return (
                            <option key={`user-${o.IDC}`} value={o.IDC} selected={o.Usuario === dataClientBonus?.user_name}>
                                {o.Usuario}
                            </option>
                        )
                    })}
                </Select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="codigo_bono"
                        value="Codigo de Bono Asignado"
                    />
                </div>
                <Select
                    id="codigo_bono"
                    onChange={({ target: { value } }) => handlenDataform(2, value)}

                >
                    <option value={NEWRECORD} disabled selected={NEWRECORD === dataClientBonus?.idcodigo}>SELECCIONE EL BONO</option>

                    {dataListBonus.map(o => {
                        return (
                            <option key={`bono-${o.id}`} value={o.id} selected={o.codigo_bono === dataClientBonus?.codigo_bono}>
                                {o.codigo_bono}
                            </option>
                        )
                    })}
                </Select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="monto"
                        value="Monto Asignado"
                    />
                </div>
                <TextInput
                    id="monto"
                    placeholder='Monto del Bono'
                    disabled
                    type="number"
                    // onChange={({ target: { value } }) => handlenDataform(3, value)}
                    value={dataClientBonus?.monto}
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="saldo"
                        value="Saldo Valido"
                    />
                </div>
                <TextInput
                    id="saldo"
                    placeholder='Saldo del cliente por Bono'
                    type="number"
                    onChange={({ target: { value } }) => handlenDataform(3, value)}
                    value={dataClientBonus?.saldo}
                />
            </div>
            <div className="flex items-center gap-2 mt-6" >
                <Checkbox
                    id="agree_bono"
                    checked={dataClientBonus?.saldo !== 0}
                    disabled
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
                <Button type="button" disabled={dataClientBonus?.idcodigo === NEWRECORD} onClick={() => changeCallbackState('save', dataClientBonus as listClientWithBono)}>Grabar Bono del cliente</Button>
                <Button type="button" color="gray" onClick={() => changeCallbackState('cancel', dataClientBonus as listClientWithBono)}>
                    Cancelar
                </Button>
            </Modal.Footer>

        </form>
    )
}