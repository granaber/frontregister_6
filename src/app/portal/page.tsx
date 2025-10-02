"use client"

import { useSearchParams } from 'next/navigation'
import ButtonToNext, { handlenPosition } from "@/component/button_to_next";
import Stepper from "@/component/stepper";
import SubFormMain from "@/component/sub_form_main";
import { keyTypeForm, textButton, formPortal, dataUser, registerDataWithoutPay } from "@/types/data_types";
import { useContext, useEffect, useState } from "react";
import { Context } from '@/context';
import SelectCountry from './select-country';


export default function Page () {
  const { dataU, setRegister, setDataRegisterConf } = useContext(Context)
  const [display, Setdisplay] = useState<string>('block')

  const [viewLoad, setviewLoad] = useState<string>('hidden')
  const [getSelect, SetgetSelect] = useState<keyTypeForm>('DATAUSER')
  const [getdataBtn, SetgetdataBtn] = useState<string[]>(textButton['DATAUSER'])
  const [dataParam, SetdataParam] = useState<string>('')
  const [getStep, setgetStep] = useState<number>(0)
  const [codeFlag, SetcodeFlag] = useState<string>('')

  const searchParams = useSearchParams()

  useEffect(() => {
    const getparam = searchParams.get('port')
    if (typeof getparam === 'string') {
      const getPortal = formPortal[getparam.toString()]

      const getdata = searchParams.get('data')
      if (typeof getdata === 'string') {
        SetdataParam(getdata)
      }
      SetgetSelect(getPortal)
    }
    setviewLoad('flex')
  }, [])
  const callRegisterUserWithoutPay = async (): Promise<number> => {

    try {
      const r = await fetch(`/api/register?itype=temp_data`, { method: "POST", body: JSON.stringify(dataU) })
      if (r.ok) {
        const data = await r.json()
        const { id } = data
        return id
      }
    } catch (error) {
      alert('No se pudo hacer el registro de su usuario!')
    }

    return -1


  }
  const callCreateRegisterUserWithoutPay = async (id: number): Promise<registerDataWithoutPay> => {

    const r = await fetch(`/api/register?itype=send_data_usertemp&idu=${id}`)
    const data = await r.json()
    return data


  }
  const setPossition = async (e: keyTypeForm, p: number) => {
    const tp = (p === -1) ? handlenPosition(e) : p
    if (e === 'ENDFORM' && p === 3) {
      const id = await callRegisterUserWithoutPay()
      const newDataU: dataUser = { ...dataU, id: id }
      setRegister(newDataU)
      const data: registerDataWithoutPay = await callCreateRegisterUserWithoutPay(id)
      console.log({ data })
      setDataRegisterConf(data)
    }
    SetgetSelect(e)
    setgetStep(tp)
  }
  const handlerGetdataBtn = (e: string, mnd: number, flag: string) => {
    console.log({ e, mnd })
    Setdisplay(e)
    SetcodeFlag(flag)
    const newDataU: dataUser = { ...dataU, mnd: mnd }
    console.log({ newDataU, mnd })
    setRegister(newDataU)
  }
  return (

    <main className={`${viewLoad}  h-full flex-col items-center justify-between px-24 py-4`}>
      <div className="w-[20em] h-[42em] pb-6 pt-8  px-8 left-0 top-0 flex flex-col   border-gray-300 bg-gradient-to-b to-stone-100 from-stone-400 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit   lg:w-[50em] lg:rounded-xl lg:border-b lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <h1 className="flex items-center justify-center mb-4 text-2xl font-extrabold text-amber-950 md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-black from-gray-700"> BetGamble </span> Registros.com</h1>
        <div className={`absolute w-full top-0 left-0 ${display}`} >
          <SelectCountry getBtn={async (e, mnd, code) => handlerGetdataBtn(e, mnd, code)} />
        </div>
        <div>
          <Stepper step={getStep} Flag={codeFlag} hc={async (e) => Setdisplay(e)} />
        </div>
        <div className='lg:h-5/6'>
          <SubFormMain options={getSelect} data={dataParam} getBtn={async (e) => SetgetdataBtn(e)} callProcessPay={async (e) => setPossition(e, -1)} />
        </div >
        <div className='flex justify-between'>
          <ButtonToNext btntext={getdataBtn} text=" Siguiente: Registro de pago" current={getSelect} cb={async (e, p) => setPossition(e, p)} />
        </div>
      </div>
    </main >
  )
}
