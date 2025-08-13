'use client';

import { useState } from 'react';
import { Badge, Table, ToggleSwitch } from 'flowbite-react';
import { APROBADO, ENESPERA, SAVERECARGAS, dataListTransacc, dataPayList, initDataListTransacc, stateAlert, typeResponseRegisterRR } from '@/types/data_types';
import AlertGo from '@/component/alert';
// import { idOptios } from '@/component/admin/grid_aprobation'; // Update the path to the correct location
import AdditionalContent from '@/component/confrim';

let record: dataListTransacc = initDataListTransacc
export default function GridDDataRecarga ({ data, listFormPay, callShow }: { data: dataListTransacc[], listFormPay: dataPayList[], callShow: (e: number) => {} }) {
    const [viewalert, setviewAlert] = useState<stateAlert>({ state: false, info: '' })
    const [viewconfirm, setviewconfirm] = useState<stateAlert>({ state: false, info: '' })

    const [filterData, setfilterData] = useState<dataListTransacc[]>(data)


    const safeData = (dataRecarga: dataListTransacc) => {

        fetch(`/api/register?itype=${SAVERECARGAS}`, { method: 'POST', body: JSON.stringify(dataRecarga) })
            .then((res) => res.json())
            .then((data: typeResponseRegisterRR) => {
                const { state, updateList } = data
                if (state) {
                    setfilterData(updateList as dataListTransacc[])
                } else {
                    const { err, txterro } = data
                    if (err)
                        setviewAlert({ state: true, info: txterro })
                }
            }
            )
    }

    const handlenDataform = (id: number, value: string | boolean | number) => {

        const r = filterData.find(o => o.id === id)
        if (r) {
            record = { ...r }
            record.noapro = value ? APROBADO : ENESPERA
            const textoDialogo = value ? 'Procesar esta Recarga' : 'Retirar la recarga'
            setviewconfirm({ state: true, info: `Esta seguro de ${textoDialogo}?` })
        }

    }
    const stateConfirm = (stateConfirm: boolean, button: number) => {
        setviewconfirm({ state: stateConfirm, info: '' })
        if (button === 1) {
            safeData(record)
        }
    }
    const IconFormatPay = ({ fpy }: { fpy: number }) => {
        const f = listFormPay.find(o => o.formatpay === fpy)
        const t = f ? f.textformatpay : ''
        return <Badge color="warning" >{t}</Badge>
    }

    return (
        <>
            <AlertGo show={viewalert.state} cb={async (e) => setviewAlert({ state: e, info: '' })} title="Información!" text={viewalert.info} />
            <AdditionalContent show={viewconfirm.state} cb={async (e, s) => stateConfirm(e, s)} title="Confirmación!" text={viewconfirm.info} />
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>
                        <span className="sr-only">
                            Pago
                        </span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Aprobación No.
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Monto
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Fecha Transacción
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Usuario
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Referencia
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Banco
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Movil Tel.
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Procesar
                    </Table.HeadCell>

                </Table.Head>
                <Table.Body className="divide-y">
                    {filterData.map((d) =>
                        <Table.Row key={`TDC-${d.id}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>

                                <IconFormatPay fpy={d.formatpay} />
                                {/* <a
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                                // onClick={() => handlenProcess(d.id)}
                                >
                                    <p>
                                        Procesar
                                    </p>
                                </a> */}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {d.noapro}
                            </Table.Cell>
                            <Table.Cell>
                                ${d.monto}
                            </Table.Cell>
                            <Table.Cell>
                                {d.date_confirm}
                            </Table.Cell>
                            <Table.Cell>
                                {d.user_name}
                            </Table.Cell>
                            <Table.Cell>
                                {d.name_confirm}
                            </Table.Cell>
                            <Table.Cell>
                                {d.text_bancon}
                            </Table.Cell>
                            <Table.Cell>
                                {d.phone}
                            </Table.Cell>

                            <Table.Cell>
                                <ToggleSwitch
                                    label="Abrobar"
                                    checked={d.noapro === APROBADO}
                                    onChange={function (checked: boolean): void {
                                        handlenDataform(d.id, checked)
                                    }}
                                />
                            </Table.Cell>

                        </Table.Row>
                    )}

                </Table.Body>
            </Table>
        </>
    )
}


