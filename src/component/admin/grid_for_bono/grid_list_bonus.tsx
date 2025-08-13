'use client';

import { Button, Table } from 'flowbite-react';
import { FcCancel } from 'react-icons/fc'
import { BsCheckCircle } from 'react-icons/bs';
import { NEWBONUS, NEWRECORD, SAVEBONUS, infoTypeOptions, initListBonus, listBonus, process, stateAlert, typeResponseRegisterBonus } from '@/types/data_types';
import { useEffect, useState } from 'react';
import ModalForBonus from './form_bonus';
import AlertGo from '@/component/alert';

export default function GridDataBono ({ data, callShow }: { data: listBonus[], callShow: (e: number) => {} }) {
    const [viewalert, setviewAlert] = useState<stateAlert>({ state: false, info: '' })
    const [filterData, setfilterData] = useState<listBonus[]>(data)
    const [openModal, setOpenModal] = useState<string>('close')
    const [record, setrecord] = useState<listBonus>(initListBonus)
    // useEffect(() => {
    //     const { frm } = infoTypeOptions['TDC']
    //     const d = data.filter(o =>
    //         o.formatpay === frm
    //     )
    //     setfilterData(d)

    // }, [data])
    // const handlenProcess = (id: number) => {
    //     callShow(id)
    // }

    const showData = (id_check: number) => {
        const find = filterData.find(({ id }) => id === id_check)
        if (find) {
            setrecord(find)
        } else {
            setrecord(initListBonus)
        }
        setOpenModal('default')
    }
    const safeData = (dataBonus: listBonus) => {
        const itype = dataBonus.id === NEWRECORD ? NEWBONUS : SAVEBONUS
        fetch(`/api/register?itype=${itype}`, { method: 'POST', body: JSON.stringify(dataBonus) })
            .then((res) => res.json())
            .then((data: typeResponseRegisterBonus) => {
                const { state, id } = data
                if (state) {
                    if (dataBonus.id === NEWRECORD) {
                        dataBonus.id = id
                    }
                    const newFilterData = filterData.filter(o => o.id !== id)
                    newFilterData.push(dataBonus)
                    setfilterData(newFilterData)
                    callShow(1)
                } else {
                    const { err, txterro } = data
                    if (err)
                        setviewAlert({ state: true, info: txterro })
                }
            }
            )
    }
    const handleDataBonus = ({ state, data }: { state: process, data: listBonus }) => {
        if (state === 'save') {
            safeData(data)
        }
        setOpenModal('close')
    }

    return (
        <>
            <AlertGo show={viewalert.state} cb={async (e) => setviewAlert({ state: e, info: '' })} title="Información!" text={viewalert.info} />

            <Button color="warning" className='my-5' onClick={() => showData(-1)}>
                Agregar Nuevo Bono
            </Button>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>
                        <span className="sr-only" >
                            Procesar
                        </span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Id
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Codigo Bono
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Monto
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Cantidad Disponible
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Estatus
                    </Table.HeadCell>

                </Table.Head>
                <Table.Body className="divide-y">
                    {filterData.map((d) =>
                        <Table.Row key={`BONUS-${d.id}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <a
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                                    onClick={() => showData(d.id)}
                                >
                                    <p>
                                        Procesar
                                    </p>
                                </a>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {d.id}
                            </Table.Cell>
                            <Table.Cell>
                                {d.codigo_bono}
                            </Table.Cell>
                            <Table.Cell>
                                {d.monto}
                            </Table.Cell>
                            <Table.Cell>
                                {d.cantidad}
                            </Table.Cell>
                            <Table.Cell>
                                {d.active ? <BsCheckCircle className='text-lime-400' /> : <FcCancel />}
                            </Table.Cell>

                        </Table.Row>
                    )}

                </Table.Body>
            </Table>
            <ModalForBonus open={openModal} setopen={async (e, d) => handleDataBonus({ state: e, data: d })} data={record} />
        </>
    )
}


