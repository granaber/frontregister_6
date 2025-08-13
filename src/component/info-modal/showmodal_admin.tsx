'use client';

import { useState, useEffect, ReactEventHandler } from 'react';
import { dataListTransacc, parameterAprobClient, responseAprobClient, stateAlert } from '@/types/data_types';
import { Button, ToggleSwitch, Modal } from 'flowbite-react';
import { BsWhatsapp } from 'react-icons/bs'
import { BiUserCheck } from 'react-icons/bi'
import AlertGo from '../alert';

type MODE = "CLOSE" | "CORRECT"
export default function FormInfoAdmin ({ record, getStates, setStates, dispatch }: { record: dataListTransacc | undefined, getStates: boolean, setStates: (e: boolean) => {}, dispatch: () => {} }) {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const [aprobal, setaprobal] = useState<boolean>(false)
    const [viewalert, setviewAlert] = useState<stateAlert>({ state: false, info: '' })

    const [tusu, settusu] = useState<string>('')
    const props = { openModal, setOpenModal };


    const handleShow = () => {
        props.setOpenModal('form-elements')
    }
    const handleOff = async (mode: MODE) => {
        props.setOpenModal(undefined)
        setStates(false)
    }
    const handleAprobal = ({ e, id_factura }: { e: boolean, id_factura: number }) => {
        if (e) {
            distpachAproba({ id_factura })
        }
    }
    const distpachAproba = ({ id_factura }: { id_factura: number }) => {
        const p: parameterAprobClient = {
            id_factura
        }
        fetch(`/api/register?itype=aproba_client`, { method: 'POST', body: JSON.stringify(p) })
            .then((res) => res.json())
            .then((data: responseAprobClient) => {
                if (!data.error) {
                    setaprobal(true)
                    dispatch()
                } else {
                    setviewAlert({ state: true, info: data.textErr })
                }
            })

    }
    const distpachCredent = ({ user_name }: { user_name: string }) => {
        if (user_name === "") return
        const p: { user_name: string } = {
            user_name
        }
        fetch(`/api/register?itype=send_credential`, { method: 'POST', body: JSON.stringify(p) })
            .then((res) => res.json())
            .then((data: responseAprobClient) => {
                if (!data.error) {
                    setviewAlert({ state: true, info: "Credenciales enviadas!" })
                } else {
                    setviewAlert({ state: true, info: data.textErr })
                }
            })
    }
    useEffect(() => {
        if (getStates && typeof record !== 'undefined') {
            handleShow()
            const { user_name, status } = record
            settusu(user_name)
            setaprobal(status === 1)

        }
    }, [getStates])



    return (
        <>
            <AlertGo show={viewalert.state} cb={async (e) => setviewAlert({ state: e, info: '' })} title="Información!" text={viewalert.info} />

            <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header >
                    <h3 className="text-base font-medium text-gray-900 dark:text-white"></h3>
                </Modal.Header>

                <Modal.Body >
                    {record?.error ?
                        <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white">
                            Este registro emitio un error <span className="text-blue-600 dark:text-blue-500">{record?.text_error}</span>
                        </h3>
                        :
                        <section className='flex flex-col justify-center gap-4 w-full'>

                            <Button onClick={async () => distpachCredent({ user_name: record?.user_name || "" })} color="success" size="sm" >
                                <BsWhatsapp className="mr-2 h-5 w-5" />
                                <p>
                                    Enviar datos de accesso al {record?.phone}
                                </p>
                            </Button>
                            {record?.status ? <></> :
                                <Button color="gray" size="sm">
                                    <BiUserCheck className="mr-2 h-5 w-5" />
                                    <p>
                                        Crear usuario  {record?.user_name}
                                    </p>
                                </Button>
                            }
                            {record?.formatpay !== 2 ?
                                <ToggleSwitch
                                    disabled={aprobal}
                                    label={aprobal ? "Transaccion Aprobada" : "Aprobar"}
                                    onChange={(e) => handleAprobal({ e, id_factura: record?.id_factura ?? 0 })} checked={aprobal} /> : <></>}
                        </section>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={async () => handleOff("CLOSE")}>SALIR</Button>

                </Modal.Footer>
            </Modal >
        </>
    )
}


