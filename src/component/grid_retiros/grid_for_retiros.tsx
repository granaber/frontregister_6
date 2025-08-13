'use client';

import { useState } from 'react';
import { Badge, Table } from 'flowbite-react';
import { UPDATERETIROS, dataListRetiros, dataPayList, process, stateAlert, typeResponseRegisterRR } from '@/types/data_types';
import AlertGo from '@/component/alert';
// import { idOptios } from '@/app/admin/grid_aprobation';
import ModalForRetiros from './form_retiros';

export default function GridDDataRetiros ({ data, listFormPay, callShow }: { data: dataListRetiros[], listFormPay: dataPayList[], callShow: (e: number) => {} }) {
    const [viewalert, setviewAlert] = useState<stateAlert>({ state: false, info: '' })
    const [filterData, setfilterData] = useState<dataListRetiros[]>(data)
    const [openModal, setOpenModal] = useState<string>('close')
    const [record, setrecord] = useState<dataListRetiros>()

    const showData = (id_check: number) => {
        const find = filterData.find(({ id }) => id === id_check)
        if (find) {
            const textformatpay = getTextFormatPay({ fpy: find.formatpay })
            setrecord({ ...find, textformatpay, checkhast: Date.now() })
            setOpenModal('default')
        }
    }
    const safeData = (dataBonus: dataListRetiros) => {

        console.log({ dataBonus })
        fetch(`/api/register?itype=${UPDATERETIROS}`, { method: 'POST', body: JSON.stringify(dataBonus) })
            .then((res) => res.json())
            .then((data: typeResponseRegisterRR) => {
                const { state, updateList } = data
                if (state) {
                    setfilterData(updateList as dataListRetiros[])
                } else {
                    const { err, txterro } = data
                    if (err)
                        setviewAlert({ state: true, info: txterro })
                }
            }
            )
    }
    const handleDataBonus = ({ state, data }: { state: process, data: dataListRetiros }) => {
        if (state === 'save') {
            safeData(data)
        }
        setOpenModal('close')
    }
    const getTextFormatPay = ({ fpy }: { fpy: number }) => {
        const f = listFormPay.find(o => o.formatpay === fpy)
        const t = f ? f.textformatpay : ''
        return t
    }
    const IconFormatPay = ({ fpy }: { fpy: number }) => {
        const f = listFormPay.find(o => o.formatpay === fpy)
        const t = f ? f.textformatpay : ''
        return <Badge color="failure"  >{t}</Badge>
    }

    return (
        <>
            <AlertGo show={viewalert.state} cb={async (e) => setviewAlert({ state: e, info: '' })} title="Información!" text={viewalert.info} />

            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>
                        <span className="sr-only">
                            Pago
                        </span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Usuario
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Monto Solicitado
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Saldo
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Banco
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Documento
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Movil/Correo
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Fecha
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Aprobación
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Procesar
                    </Table.HeadCell>

                </Table.Head>
                <Table.Body className="divide-y">
                    {filterData.map((d) =>
                        <Table.Row key={`RET-${d.id}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>

                                <IconFormatPay fpy={d.formatpay} />

                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {d.user_name}
                            </Table.Cell>
                            <Table.Cell>
                                ${d.monto}
                            </Table.Cell>
                            <Table.Cell>
                                ${d.saldo}
                            </Table.Cell>
                            <Table.Cell>
                                {d.text_bank}
                            </Table.Cell>
                            <Table.Cell>
                                {d.passport}
                            </Table.Cell>
                            <Table.Cell>
                                {d.phone_email}
                            </Table.Cell>
                            <Table.Cell>
                                {d.date_confirm}
                            </Table.Cell>
                            <Table.Cell>
                                {d.noapro}
                            </Table.Cell>

                            <Table.Cell>
                                {!d.procesado ?
                                    <a
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                                        onClick={() => showData(d.id)}

                                    >
                                        <p>
                                            Procesar
                                        </p>
                                    </a>
                                    : <></>}
                            </Table.Cell>

                        </Table.Row>
                    )}

                </Table.Body>
            </Table>
            <ModalForRetiros open={openModal} setopen={async (e, d) => handleDataBonus({ state: e, data: d })} data={record!} />
        </>
    )
}


