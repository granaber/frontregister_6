'use client';

import { Button, Table } from 'flowbite-react';
import { FcCancel } from 'react-icons/fc'
import { BsCheckCircle } from 'react-icons/bs';
import { NEWBONUS, NEWRECORD, SAVEBONUS, infoTypeOptions, initListTransaccBonus, initListBonus, listBonus, listTransaccionBonus, process, stateAlert, typeResponseRegisterBonus } from '@/types/data_types';
import { useEffect, useState } from 'react';
import ModalForBonus from './form_bonus';
import AlertGo from '@/component/alert';

export default function GridDataTranssaccBono ({ data, callShow }: { data: listTransaccionBonus[], callShow: (e: number) => {} }) {
    const [viewalert, setviewAlert] = useState<stateAlert>({ state: false, info: '' })
    const [filterData, setfilterData] = useState<listTransaccionBonus[]>(data)
    const [openModal, setOpenModal] = useState<string>('close')
    const [record, setrecord] = useState<listTransaccionBonus>(initListTransaccBonus)
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
            setrecord(initListTransaccBonus)
        }
        setOpenModal('default')
    }
    // const safeData = (dataBonus: listBonus) => {
    //     const itype = dataBonus.id === NEWRECORD ? NEWBONUS : SAVEBONUS
    //     fetch(`/api/register?itype=${itype}`, { method: 'POST', body: JSON.stringify(dataBonus) })
    //         .then((res) => res.json())
    //         .then((data: typeResponseRegisterBonus) => {
    //             const { state, id } = data
    //             if (state) {
    //                 if (dataBonus.id === NEWRECORD) {
    //                     dataBonus.id = id
    //                 }
    //                 const newFilterData = filterData.filter(o => o.id !== id)
    //                 newFilterData.push(dataBonus)
    //                 setfilterData(newFilterData)
    //                 callShow(1)
    //             } else {
    //                 const { err, txterro } = data
    //                 if (err)
    //                     setviewAlert({ state: true, info: txterro })
    //             }
    //         }
    //         )
    // }
    // const handleDataBonus = ({ state, data }: { state: process, data: listBonus }) => {
    //     if (state === 'save') {
    //         safeData(data)
    //     }
    //     setOpenModal('close')
    // }

    return (
        <>
            <AlertGo show={viewalert.state} cb={async (e) => setviewAlert({ state: e, info: '' })} title="Información!" text={viewalert.info} />

            <Table hoverable>
                <Table.Head>

                    <Table.HeadCell>
                        Id
                    </Table.HeadCell>
                    <Table.HeadCell>
                        IDC
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Usuario
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Ultimo Monto
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Ultimo Serial
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Saldo de Bono
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Tipo de Transacc.
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Ultima Transacc.
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filterData.map((d) =>
                        <Table.Row key={`BONUS-${d.id}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {d.id}
                            </Table.Cell>
                            <Table.Cell>
                                {d.IDC}
                            </Table.Cell>
                            <Table.Cell>
                                {d.user_name}
                            </Table.Cell>
                            <Table.Cell>
                                {d.lastmonto}
                            </Table.Cell>
                            <Table.Cell>
                                {d.lastserial}
                            </Table.Cell>
                            <Table.Cell>
                                {d.saldo}
                            </Table.Cell>
                            <Table.Cell>
                                {d.type_transscc}
                            </Table.Cell>
                            <Table.Cell>
                                {d.transacc}
                            </Table.Cell>
                        </Table.Row>
                    )}

                </Table.Body>
            </Table>
        </>
    )
}


