'use client';

import { Button, Table } from 'flowbite-react';
import { FcCancel } from 'react-icons/fc'
import { BsCheckCircle } from 'react-icons/bs';
import { LIST_USER, NEWCLIENTBONUS, NEWRECORD, SAVECLIENTBONUS, initListClientWithBono, listBonus, listClientWithBono, listUserAvalible, process, stateAlert, typeResponseRegisterBonus } from '@/types/data_types';
import { useEffect, useState } from 'react';
import ModalForClient from './form_client';
import AlertGo from '@/component/alert';


export default function GridDataBonoClient ({ data, dataListBonus, callShow }: { data: listClientWithBono[], dataListBonus: listBonus[], callShow: (e: number) => {} }) {
    const [viewalert, setviewAlert] = useState<stateAlert>({ state: false, info: '' })
    const [listuser, setlistuser] = useState<listUserAvalible[]>([])
    const [filterData, setfilterData] = useState<listClientWithBono[]>(data)
    const [openModal, setOpenModal] = useState<string>('close')
    const [record, setrecord] = useState<listClientWithBono>(initListClientWithBono)

    const getDataUser = () => {
        fetch(`/api/list?type=${LIST_USER}`, { method: 'GET' })
            .then((res) => res.json())
            .then((data: listUserAvalible[]) => {
                console.log('getDataUser', { data })
                setlistuser(data)
            }
            )
    }
    const safeData = (dataClientBonus: listClientWithBono) => {
        const itype = dataClientBonus.id === NEWRECORD ? NEWCLIENTBONUS : SAVECLIENTBONUS
        fetch(`/api/register?itype=${itype}`, { method: 'POST', body: JSON.stringify(dataClientBonus) })
            .then((res) => res.json())
            .then((data: typeResponseRegisterBonus) => {
                const { state, id, updateList } = data
                if (state) {
                    if (dataClientBonus.id === NEWRECORD) {
                        setfilterData(updateList as listClientWithBono[])
                    } else {
                        const newFilterData = filterData.filter(o => o.id !== id)
                        newFilterData.push(dataClientBonus)
                        setfilterData(newFilterData)
                    }
                } else {
                    const { err, txterro } = data
                    if (err)
                        setviewAlert({ state: true, info: txterro })
                }
            }
            )
    }
    const handleDataBonus = ({ state, data }: { state: process, data: listClientWithBono }) => {
        if (state === 'save') {
            safeData(data)
        }
        setOpenModal('close')
    }
    const showData = (id_check: number) => {
        if (id_check === NEWRECORD) {
            console.log({ id_check })
            const newInitClient: listClientWithBono = { ...initListClientWithBono, checkhast: Date.now() }
            setrecord(() => newInitClient)
        } else {
            const find = filterData.find(({ id }) => id === id_check)
            if (find) {
                setrecord(find)
            } else {
                const newInitClient: listClientWithBono = { ...initListClientWithBono, checkhast: Date.now() }
                setrecord(newInitClient)
            }
        }
        setOpenModal('default')
    }
    useEffect(() => {
        getDataUser()
    }, [])

    return (
        <>
            <AlertGo show={viewalert.state} cb={async (e) => setviewAlert({ state: e, info: '' })} title="Información!" text={viewalert.info} />

            <section className='my-5'>
                <Button onClick={() => showData(NEWRECORD)}>
                    Asignar Bono a clientes
                </Button>
            </section>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>
                        <span className="sr-only">
                            Procesar
                        </span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Aprobación No.
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Monto
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Saldo
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Usuario
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Codigo Bono
                    </Table.HeadCell>
                    <Table.HeadCell>
                        ID Cliente
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Estatus
                    </Table.HeadCell>

                </Table.Head>
                <Table.Body className="divide-y">
                    {filterData.map((d) =>
                        <Table.Row key={`TDC-${d.id}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                                ${d.monto}
                            </Table.Cell>
                            <Table.Cell>
                                {d.saldo}
                            </Table.Cell>
                            <Table.Cell>
                                {d.user_name}
                            </Table.Cell>
                            <Table.Cell>
                                {d.codigo_bono}
                            </Table.Cell>
                            <Table.Cell>
                                {d.IDC}
                            </Table.Cell>
                            <Table.Cell>
                                {d.saldo === 0 ? <FcCancel /> : <BsCheckCircle className='text-lime-400' />}
                            </Table.Cell>

                        </Table.Row>
                    )}

                </Table.Body>
            </Table>
            <ModalForClient
                open={openModal}
                setopen={async (e, d) => handleDataBonus({ state: e, data: d })}
                data={record}
                listClients={listuser}
                dataListBonus={dataListBonus} />

        </>
    )
}


