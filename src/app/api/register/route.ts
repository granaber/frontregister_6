import { NextResponse } from 'next/server'
import { SQLQuery, SQLQueryInsert, SQLQueryUpdate } from '@/db'

import { ListBonosClient, ListDataRecargas, ListDataRetiros } from '../list/route'
import {
  ENESPERA,
  TIMEZONE,
  dataAccess,
  dataAccessfecth,
  dataConfirmOtherPay,
  dataListRetiros,
  dataListTransacc,
  dataSettingGeneral,
  dataUser,
  formStatusCode,
  infoTypeOptions,
  listBonus,
  listClientWithBono,
  parameterAprobClient,
  registerDataWithoutPay,
  responseAccess,
  responseAprobClient,
  typeResponseRegisterBonus,
  typeResponseRegisterRR
} from '@/types/data_types'
import GetEnv, { getMode } from '@/getenv'

const [SAVEBONUS, NEWBONUS, SAVECLIENTBONUS, NEWCLIENTBONUS, SAVERECARGAS, UPDATERETIROS] = [
  'save_bonus',
  'new_bonus',
  'update_client_bonus',
  'new_client_bonus',
  'save_recargas',
  'update_retiros'
]

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const igetType = searchParams.get('itype')

  if (igetType === 'send_general_data') {
    const igetId = searchParams.get('idu')
    const data = await GetDataRecord({ idu: Number(igetId) })

    return NextResponse.json(data)
  }
  if (igetType === 'send_data_usertemp') {
    const igetId = searchParams.get('idu')
    const data = await GetDataUserTemp({ idu: Number(igetId) })

    return NextResponse.json(data)
  }

  return NextResponse.json({ id: -1 })
}

export async function POST (request: Request) {
  const { searchParams } = new URL(request.url)
  const igetType = searchParams.get('itype')

  if (igetType === 'send_credential') {
    const idata = await request.json()
    const { user_name } = idata
    const resp = await SendCredential({ user_name })
    return NextResponse.json({ ...resp })
  }
  if (igetType === 'inuser') {
    const idata = await request.json()
    const resp = await AccessLogin({ data: idata })
    return NextResponse.json({ ...resp })
  }
  if (igetType === 'temp_data') {
    const idatatemp = await request.json()
    const [id, codebono] = await PostDataRecordForTemp({ data: idatatemp })
    return NextResponse.json({ id })
  }
  if (igetType === 'other_pay') {
    const idata = await request.json()
    const id = await SaveDataOtherPay({ data: idata })
    return NextResponse.json({ idu: id })
  }
  if (igetType === 'aproba_client') {
    const idata = await request.json()
    const resp = await AprobaClient({ data: idata })
    return NextResponse.json({ ...resp })
  }
  if (igetType === SAVEBONUS) {
    const idata = await request.json()
    const resp = await setBonuRecord({ data: idata })
    return NextResponse.json({ ...resp })
  }
  if (igetType === NEWBONUS) {
    const idata = await request.json()
    const resp = await setNewBonuRecord({ data: idata })
    return NextResponse.json({ ...resp })
  }
  if (igetType === SAVECLIENTBONUS) {
    const idata = await request.json()
    const resp = await setUpdateClienteBonus({ data: idata })
    return NextResponse.json({ ...resp })
  }
  if (igetType === NEWCLIENTBONUS) {
    const idata = await request.json()
    const resp = await setNewClienteBonus({ data: idata })
    return NextResponse.json({ ...resp })
  }
  if (igetType === SAVERECARGAS) {
    const idata = await request.json()
    const resp = await setRecarga({ data: idata })
    return NextResponse.json({ ...resp })
  }
  //UPDATERETIROS
  if (igetType === UPDATERETIROS) {
    const idata = await request.json()
    const resp = await setRetiro({ data: idata })
    return NextResponse.json({ ...resp })
  }
  return NextResponse.json({ id: -1 })
}
async function getDataUser (user: string): Promise<{ idc: string }> {
  const result = await SQLQuery('Select * from _tusu Where usuario=?', [user])
  if (result.length !== 0) {
    return { idc: result[0].Asociado }
  }
  return { idc: '-1' }
}
async function setRetiro ({ data }: { data: dataListRetiros }): Promise<typeResponseRegisterRR> {
  const { idc } = await getDataUser(data.user_name)
  if (idc === '-1') {
    return { state: false, id: 0, err: true, txterro: 'No existe este usuario!' }
  }
  const { err, msg } = await handleSendCredit({ idc, monto: -1 * data.monto })
  if (err) {
    return { state: false, id: 0, err: true, txterro: msg }
  }
  const [, state] = await SQLQueryUpdate(`Update _transac_portal_retiros set dateprocesado=?,procesado=1  where id=?`, [
    data.noapro,
    data.id
  ])
  if (state) {
    const listUpdate = await ListDataRetiros()
    return { state, id: data.id, err: false, txterro: '', updateList: listUpdate }
  }
  return { state: false, id: 0, err: true, txterro: 'Hubo un error en la actualización de la recargar!' }
}
async function setRecarga ({ data }: { data: dataListTransacc }): Promise<typeResponseRegisterRR> {
  const { idc } = await getDataUser(data.user_name)
  if (idc === '-1') {
    return { state: false, id: 0, err: true, txterro: 'No existe este usuario!' }
  }
  const { err, msg } = await handleSendCredit({ idc, monto: data.noapro === ENESPERA ? -1 * data.monto : data.monto })
  if (err) {
    return { state: false, id: 0, err: true, txterro: msg }
  }
  const [, state] = await SQLQueryUpdate(`Update _transac_portal_register set status=?  where id=?`, [
    data.noapro,
    data.id
  ])
  if (state) {
    const listUpdate = await ListDataRecargas()
    return { state, id: data.id, err: false, txterro: '', updateList: listUpdate }
  }
  return { state: false, id: 0, err: true, txterro: 'Hubo un error en la actualización de la recargar!' }
}
async function setNewClienteBonus ({ data }: { data: listClientWithBono }): Promise<typeResponseRegisterBonus> {
  const field = `(transacc,IDC,monto,saldo,tipo,codebono,lastSerial)`
  const value = ['', data.IDC, data.monto, data.saldo, 1, data.idcodigo, 0]
  try {
    const [id, state] = await SQLQueryInsert(`Insert _tbbono ${field} values (${value.map((_) => '?').join()})`, value)
    console.log({ id, state })
    if (state) {
      await handleSendUpdateDataCredit({ idc: data.IDC })

      const listUpdate = await ListBonosClient()
      return { state, id, err: false, txterro: '', updateList: listUpdate }
    }
    return { state, id, err: false, txterro: '' }
  } catch (error) {
    console.log(error)
    return { state: false, id: 0, err: true, txterro: 'Un error asignado el Bono a cliente' }
  }

  return { state: false, id: 0, err: true, txterro: 'Codigo de Bono Existe, intente con otra etiqueta!' }
}
async function setUpdateClienteBonus ({ data }: { data: listClientWithBono }): Promise<typeResponseRegisterBonus> {
  const [, state] = await SQLQueryUpdate(`Update _tbbono set IDC=?,saldo=?,codebono=?  where id=?`, [
    data.IDC,
    data.saldo,
    data.idcodigo,
    data.id
  ])
  if (state) await handleSendUpdateDataCredit({ idc: data.IDC })
  return { state, id: data.id, err: false, txterro: '' }
}
async function setNewBonuRecord ({ data }: { data: listBonus }): Promise<typeResponseRegisterBonus> {
  const field = `(codigo,monto,cant_avalible,active)`
  const value = [data.codigo_bono, data.monto, data.cantidad, data.active]
  try {
    const [id, state] = await SQLQueryInsert(
      `Insert _transac_portal_listbono ${field} values (${value.map((_) => '?').join()})`,
      value
    )

    return { state, id, err: false, txterro: '' }
  } catch (error) {
    console.log(error)
  }

  return { state: false, id: 0, err: true, txterro: 'Codigo de Bono Existe, intente con otra etiqueta!' }
}
async function setBonuRecord ({ data }: { data: listBonus }): Promise<typeResponseRegisterBonus> {
  //     CREATE TABLE `_transac_portal_listbono` (
  //   `codebono` int(11) unsigned NOT NULL AUTO_INCREMENT,
  //   `codigo` varchar(12) DEFAULT NULL,
  //   `monto` float DEFAULT NULL,
  //   `cant_avalible` int(11) DEFAULT NULL,
  //   `active` int(11) DEFAULT NULL,
  //   PRIMARY KEY (`codebono`),
  //   UNIQUE KEY `codigo` (`codigo`)
  // ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  console.log(data)

  const [, state] = await SQLQueryUpdate(
    `Update _transac_portal_listbono set codigo=?,monto=?,cant_avalible=?,active=?  where codebono=?`,
    [data.codigo_bono, data.monto, data.cantidad, data.active, data.id]
  )

  return { state, id: data.id, err: false, txterro: '' }
}

async function SendCredential ({ user_name }: { user_name: string }): Promise<responseAprobClient> {
  const mode = getMode()
  const Url = mode.MODE === 'production' ? 'https://pay.betgambler.net' : 'http://localhost:5200'
  const response = await fetch(`${Url}/apipay.php?rq=CREDENTIAL_SEND&user_name=${user_name}`)
  if (!response.ok) {
    return { error: true, textErr: 'Hubo un error grabado la información suministrada!(1)' }
  }
  const data = await response.json()
  console.log({ data })
  return { error: data.error, textErr: data.error ? data.mensageStates : '' }
}
async function AccessLogin ({ data }: { data: dataAccessfecth }): Promise<responseAccess> {
  const { u: id_user, p: pwd_user, t: token_user } = data

  const result = await SQLQuery(`SELECT * FROM _tusu where Usuario=? and Tipo = 2`, [id_user])

  if (result.length !== 0) {
    const { clave, IDusu } = result[0]
    if (token_user !== 0) {
      const d = await getTocket(IDusu, token_user)
      return {
        access: !d.error,
        err: d.error,
        texterr: d.textErr
      }
    }
    const getpwd = `${clave}${getTime()}`
    // && await getTocket(Number(IDusu)) === Number(token_user)
    // console.log({getpwd,pwd_user})
    if (getpwd === pwd_user) {
      const d = await setToket(IDusu)
      return {
        access: !d.error,
        err: d.error,
        texterr: d.textErr
      }
    }
  }

  return {
    access: false,
    err: false,
    texterr: 'Credenciales erradas'
  }
}
async function setToket (IDusu: number): Promise<responseAprobClient> {
  const Url = 'https://pay.betgambler.net'

  const response = await fetch(`${Url}/apipay.php?rq=REQUEST_TOKET&IDusu=${IDusu}`)
  if (!response.ok) {
    return { error: true, textErr: 'Hubo un error grabado la información suministrada!(1)' }
  }
  const data = await response.json()
  console.log({ data })
  return { error: data.err, textErr: data.message }
}
async function getTocket (IDusu: number, Tk: number): Promise<responseAprobClient> {
  const Url = 'https://pay.betgambler.net'

  const response = await fetch(`${Url}/apipay.php?rq=RESPONSE_TOKET&IDusu=${IDusu}&Tk=${Tk}`)
  if (!response.ok) {
    return { error: true, textErr: 'Hubo un error grabado la información suministrada!(1)' }
  }
  const data = await response.json()
  console.log({ data })
  return { error: data.message !== 'Ok', textErr: data.message }
}
function getTime (): string {
  const date = new Date()
  const veDate = date.toLocaleString('es-ES', { timeZone: TIMEZONE })
  const [, h] = veDate.split(',')
  const [thour, tminute] = h.split(':')
  const hour = Number(thour)
  const minute = Number(tminute)
  const Hours = hour <= 12 ? hour : hour - 12

  const gh: string = `${Hours <= 9 ? '0' : ''}${Hours}`
  const gm: string = `${minute <= 9 ? '0' : ''}${minute}`

  return `${gh}${gm}`
}

async function AprobaClient ({ data }: { data: parameterAprobClient }): Promise<responseAprobClient> {
  const mode = getMode()
  const Url = mode.MODE === 'production' ? 'https://pay.betgambler.net' : 'http://localhost:5200'
  const { id_factura } = data
  const response = await fetch(`${Url}/apipay.php?rq=CREATE_CLIENT&id_factura=${id_factura}&idb=6`)
  if (!response.ok) {
    return { error: true, textErr: 'Hubo un error grabado la información suministrada!(1)' }
  }
  console.log({ response })
  changeStatusRegister({ data })
  return { error: false, textErr: true ? '' : 'Hubo un error con en el Back' }
}
async function changeStatusRegister ({ data }: { data: parameterAprobClient }): Promise<boolean> {
  const confirmRegister = formStatusCode.APROBADO
  const update = await SQLQueryUpdate(`Update _transac_portal_register set status=? where id=?`, [
    confirmRegister,
    data.id_factura
  ])
  console.log({ update })
  return true
}
async function SaveDataOtherPay ({ data }: { data: dataConfirmOtherPay }): Promise<number> {
  const { data_confirm, user_data } = data
  const [idusu_temp] = await PostDataRecordForTemp({ data: user_data })
  if (idusu_temp === -1) return -1

  const date_transac = typeof data_confirm.date_transac === 'undefined' ? 'NA' : data_confirm.date_transac
  const name_confirm = typeof data_confirm.name_confirm === 'undefined' ? 'NA' : data_confirm.name_confirm
  const bank_code = typeof data_confirm.bank_code === 'undefined' ? 0 : data_confirm.bank_code
  const CONSTENESPERA = formStatusCode.ENESPERA

  const datecreater = Math.round(Date.now() / 1000).toString()
  const field =
    '(idusu_temp,datecreater,formatpay,status,email,phone,code_confirm,name_confirm,date_confirm,monto,errortext,idban,reportepago)'
  const value = [
    idusu_temp,
    datecreater,
    data_confirm.formatpay,
    CONSTENESPERA,
    user_data.email_user,
    user_data.tel_user,
    data_confirm.code_confirm,
    name_confirm,
    date_transac,
    data_confirm.monto,
    '',
    bank_code,
    0
  ]

  const [id, state] = await SQLQueryInsert(
    `Insert _transac_portal_register ${field} values (${value.map((_) => '?').join()})`,
    value
  )
  return state ? id : -1
}

export async function PostDataRecordForTemp ({ data }: { data: dataUser }): Promise<[number, number]> {
  const { email_user, name_user, pwd_user, tel_user, code_bono } = data

  const result = await SQLQuery('Select * from _transac_portal_tempdata where user=?', [name_user])
  if (result.length === 0) {
    const [id, state] = await SQLQueryInsert(
      'Insert _transac_portal_tempdata  (user,pwd,email,tel,register_complet)  values (?,?,?,?,0)',
      [name_user, pwd_user, email_user, tel_user]
    )
    if (typeof code_bono !== 'undefined') {
      const idcode = await SetDataCodeBono({ code_bono, name_user, id_temp: id })

      return state ? [id, idcode] : [-1, -1]
    }
    return state ? [id, 0] : [-1, -1]
  }

  return [result[0].id, 0]
}
async function getIDusu ({ name_user }: { name_user: string }): Promise<number> {
  const resultUser = await SQLQuery('Select * from _tusu Where Usuario=?', [name_user])
  return resultUser.length === 0 ? -1 : resultUser[0].IDusu
}
async function SetDataCodeBono ({
  id_temp,
  code_bono,
  name_user
}: {
  id_temp: number
  code_bono: string
  name_user: string
}): Promise<number> {
  if (code_bono !== '') {
    const IDusu = await getIDusu({ name_user })

    const result = await SQLQuery('Select * from _transac_portal_listbono Where codigo=?', [code_bono])
    const get_code_bono = result.length === 0 ? -1 : result[0].codebono
    const [idcode, state] = await SQLQueryInsert(
      'Insert _transac_portal_asign_bonos  (IDusu,id_temp,codebono)  values (?,?,?)',
      [IDusu, id_temp, get_code_bono]
    )
    return state ? idcode : -1
  }
  return 0
}
async function GetCodeBono ({ name_user }: { name_user: string }): Promise<{ code_bono: string; montobono: number }> {
  const IDusu = await getIDusu({ name_user })

  const result = await SQLQuery(
    'Select * from _transac_portal_listbono,_transac_portal_asign_bonos Where _transac_portal_listbono.codebono=_transac_portal_asign_bonos.codebono and  _transac_portal_asign_bonos.IDusu=?',
    [IDusu]
  )

  const { codigo, monto } = result.length !== 0 ? result[0] : { codigo: '', monto: 0 }

  return { code_bono: codigo, montobono: monto }
}
async function GetDataUserTemp ({ idu }: { idu: number }): Promise<registerDataWithoutPay> {
  const result = await SQLQuery('Select * from _transac_portal_tempdata where id=?', [idu])
  if (result.length !== 0) {
    const mode = getMode()
    const Url = mode.MODE === 'production' ? 'https://pay.betgambler.net' : 'http://localhost:5200'
    const response = await fetch(`${Url}/apipay.php?rq=CREATE_CLIENT_WITHOUTPAY&id=${result[0].id}`)
    let activo = 0
    let codeBono = ''
    if (response.ok) {
      const result = await SQLQuery('Select * from _transac_portal_tempdata where id=?', [idu])
      activo = result.length === 0 ? 0 : result[0].register_complet
      const { code_bono, montobono } = await GetCodeBono({ name_user: result[0].user })
      codeBono = code_bono !== '' ? `${code_bono}($${montobono})` : ''
    }
    const stateRegister = activo

    return {
      code_user: 0,
      email_user: result[0].email,
      name_user: result[0].user,
      pwd_user: '',
      status: stateRegister ? 'APROBADO' : 'NOAPROBADO',
      tel_user: result[0].tel,
      code_bono: codeBono,
      id: result[0].id
    }
  }
  return {
    code_user: 0,
    email_user: '',
    name_user: '',
    pwd_user: '',
    status: 'NOAPROBADO',
    tel_user: '',
    code_bono: '',
    id: -1
  }
}
async function GetDataRecord ({ idu }: { idu: number }): Promise<dataSettingGeneral> {
  const returnData: dataSettingGeneral = {
    errortext: '-',
    status: 'ENESPERA',
    idUser: 0,
    email: '',
    formatpay: 0,
    txtformatpay: '',
    phone: '+(000)-000-000000',
    name_confirm: '',
    code_confirm: ''
  }

  if (idu !== 0 && typeof idu === 'number') {
    const result = await SQLQuery(
      'Select _transac_portal_register.*,_transac_portal_sbbancos.Descripcion from _transac_portal_register,_transac_portal_sbbancos Where _transac_portal_register.idban=_transac_portal_sbbancos.idban and  id=?',
      [idu]
    )
    if (result.length !== 0) {
      const {
        datecreater,
        formatpay,
        status,
        email,
        phone,
        code_confirm,
        name_confirm,
        monto,
        date_confirm,
        idban,
        Descripcion,
        errortext
      } = result[0]

      returnData.status = status
      returnData.email = email
      returnData.formatpay = formatpay
      returnData.txtformatpay = handlenFormatPay(formatpay)
      returnData.phone = phone
      returnData.code_confirm = code_confirm
      returnData.name_confirm = name_confirm
      returnData.errortext = errortext
      returnData.nane_bank = Descripcion
    }
  }

  return returnData
}

function handlenFormatPay (fpay: number): string {
  const searchP = Object.entries(infoTypeOptions).find((o) => {
    const { frm } = o[1]
    return Number(frm) === fpay
  })
  return typeof searchP === 'undefined' ? 'NONE' : searchP[0]
}

async function handleSendUpdateDataCredit ({ idc }: { idc: string }): Promise<boolean> {
  const mode = getMode()
  const { TOKENAPI } = GetEnv()
  const tokenAPICREDIT = TOKENAPI
  const Url = mode.MODE === 'production' ? 'https://credito.betgambler.net:3145' : 'http://localhost:3145'
  const response = await fetch(`${Url}/update/${idc}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAPICREDIT}`
    }
  })
  return response.ok
}
async function handleSendCredit ({
  idc,
  monto
}: {
  idc: string
  monto: number
}): Promise<{ err: boolean; msg: string; saldo: number }> {
  ///activarcredito/:idc/:monto
  const API = monto < 0 ? 'removecredito' : 'activarcredito'
  const mode = getMode()
  const { TOKENAPI } = GetEnv()
  const tokenAPICREDIT = TOKENAPI
  const Url = mode.MODE === 'production' ? 'https://credito.betgambler.net:3145' : 'http://localhost:3145'
  const response = await fetch(`${Url}/${API}/${idc}/${Math.abs(monto)}/0`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAPICREDIT}`
    }
  })
  if (response.ok) {
    const data = await response.json() //{ data: { err: false, msg: 'ok', saldo: 110 } }
    const { err, msg, saldo }: { err: boolean; msg: string; saldo: number } = data
    return { err, msg: msg.toString(), saldo: Number(saldo) }
  }
  return { err: true, msg: 'No se puede comunicar con el Servidor', saldo: -1 }
}
type listSaldos = {
  idc: string
  saldo: number
}
export async function handleListCredit (): Promise<{ err: boolean; list: listSaldos[] }> {
  //listsaldos
  const mode = getMode()
  const { TOKENAPI } = GetEnv()
  const tokenAPICREDIT = TOKENAPI
  const Url = mode.MODE === 'production' ? 'https://credito.betgambler.net:3145' : 'http://localhost:3145'
  const response = await fetch(`${Url}/listsaldos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAPICREDIT}`
    }
  })
  if (response.ok) {
    const data = await response.json() //{ data: { err: false, msg: 'ok', list:[] } }
    const { err, list }: { err: boolean; list: listSaldos[] } = data
    return { err, list }
  }
  return { err: true, list: [] }
}


export async function handleCreateUserDefault ({ idusu_temp }: { idusu_temp: number }): Promise<{ err: boolean, msj: string }> {
  //CREATE_USER_DEFAULT

  const mode = getMode()
  const Url = mode.MODE === 'production' ? 'https://pay.betgambler.net' : 'http://127.0.0.1:5200'
  console.log(`${Url}/apipay.php?rq=CREATE_USER_DEFAULT&idusutemp=${idusu_temp}&idb=6`)
  try {
    const response = await fetch(`${Url}/apipay.php?rq=CREATE_USER_DEFAULT&idusutemp=${idusu_temp}&idb=6`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (response.ok) {
      const data = await response.json() //{ data: { err: false, msg: 'ok', list:[] } }
      console.log({ data })

      const { status, message, idc }: { status: boolean; message: string; idc: string } = data
      return { err: !status, msj: message }
    }
    return { err: true, msj: "Hubo un error en la API" }
  } catch (error) {
    console.log(error)
    return { err: true, msj: "Hubo un error en la API" }
  }
}