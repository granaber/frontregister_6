'use client';

import { initListClientWithBono, listBonus, listClientWithBono, listUserAvalible, process } from '@/types/data_types';
import { Modal } from 'flowbite-react'
import { useEffect, useState } from 'react';
import FormDataClient from './formdata_client';


export default function ModalForClient ({ data, dataListBonus, listClients, open, setopen }: { data: listClientWithBono, listClients: listUserAvalible[], dataListBonus: listBonus[], open: string, setopen: (e: process, d: listClientWithBono) => {} }) {
    const [openModal, setOpenModal] = useState<string | undefined>(open);
    const props = { openModal, setOpenModal };
    const [dataClientBonus, setdataClientBonus] = useState<listClientWithBono>(initListClientWithBono)



    const changeCallbackState = (e: process, d: listClientWithBono) => {
        props.setOpenModal(undefined)
        setdataClientBonus(() => initListClientWithBono)
        setopen(e, d)
    }


    useEffect(() => {
        setOpenModal(open)
        setdataClientBonus(data)
        console.log('INICIAR MODAL', data)
    }, [open, data])

    return (
        <>
            <Modal show={props.openModal === 'default'} popup onClose={() => changeCallbackState('cancel', dataClientBonus)}>
                <Modal.Header>Bono</Modal.Header>
                <Modal.Body>
                    <FormDataClient
                        data={dataClientBonus}
                        dataListBonus={dataListBonus}
                        listClients={listClients}
                        changeCallbackState={async (e, d) => changeCallbackState(e, d)} />
                </Modal.Body>

            </Modal >
        </>
    )
}


