'use client';

import { Table } from 'flowbite-react';
import { BsCircle, BsCheckCircle } from 'react-icons/bs'
import { dataListTransacc, infoTypeOptions, typeOp } from '@/types/data_types';
import { useEffect, useState } from 'react';

export default function GridDataOtherPay ({ data, typefrm, callShow }: { data: dataListTransacc[], typefrm: typeOp, callShow: (e: number, frm: number) => {} }) {

    const [filterData, setfilterData] = useState<dataListTransacc[]>([])

    useEffect(() => {
        const { frm } = infoTypeOptions[typefrm]
        const d = data.filter(o =>
            o.formatpay === frm
        )
        setfilterData(d)

    }, [data])
    const handlenProcess = ({ id, frm }: { id: number, frm: number }) => {
        callShow(id, frm)
    }

    return (
        <Table hoverable>
            <Table.Head>
                <Table.HeadCell>
                    <span className="sr-only">
                        Procesar
                    </span>
                </Table.HeadCell>
                <Table.HeadCell>
                    Estatus
                </Table.HeadCell>
                <Table.HeadCell>
                    Referencia
                </Table.HeadCell>
                <Table.HeadCell>
                    Monto
                </Table.HeadCell>
                <Table.HeadCell>
                    Fecha
                </Table.HeadCell>
                <Table.HeadCell>
                    Usuario
                </Table.HeadCell>
                <Table.HeadCell>
                    Correo
                </Table.HeadCell>
                <Table.HeadCell>
                    Movil Tel.
                </Table.HeadCell>
                <Table.HeadCell>
                    Registo Completado
                </Table.HeadCell>
                <Table.HeadCell>
                    Error
                </Table.HeadCell>

            </Table.Head>
            <Table.Body className="divide-y">
                {filterData.map((d) =>
                    <Table.Row key={`OthPay-${d.id}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                            <a
                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                                onClick={() => handlenProcess({ id: d.id, frm: d.formatpay })}
                            >
                                <p>
                                    Procesar
                                </p>
                            </a>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {d.noapro}
                        </Table.Cell>
                        <Table.Cell>
                            {d.code_confirm}
                        </Table.Cell>
                        <Table.Cell>
                            {d.monto}
                        </Table.Cell>
                        <Table.Cell>
                            {d.date_confirm}
                        </Table.Cell>
                        <Table.Cell>
                            {d.user_name}
                        </Table.Cell>
                        <Table.Cell>
                            {d.email}
                        </Table.Cell>
                        <Table.Cell>
                            {d.phone}
                        </Table.Cell>
                        <Table.Cell>
                            {d.status ? <BsCheckCircle /> : <BsCircle />}
                        </Table.Cell>
                        <Table.Cell>
                            {d.error ? `${d.code_error}-${d.text_error}` : ''}
                        </Table.Cell>

                    </Table.Row>
                )}

            </Table.Body>
        </Table>
    )
}


