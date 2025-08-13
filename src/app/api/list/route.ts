import { NextResponse } from 'next/server'
import { SQLQuery } from '@/db'
import {
  CODE_ACTIVE_USER,
  TYPE_CLIENT_END,
  dataCodePhone,
  dataListBank,
  dataListRetiros,
  dataListTransacc,
  dataPayList,
  dataUser,
  listBonus,
  listClientWithBono,
  listTransaccionBonus,
  listUserAvalible,
  respondeDataCheckUser
} from '@/types/data_types'
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'
import { CountryCode } from 'libphonenumber-js/types'
import { handleCreateUserDefault, handleListCredit, PostDataRecordForTemp } from '../register/route'

const [BANK, CHECKUSER, LISTPAY, LISTTRANSA, LISTBONOCLIENT, LISTBONO, LIST_USER, LIST_RECARGAS, LIST_RETIROS, LIST_TRANSACC_BONUS] = [
  'bank',
  'checkuser',
  'list_pay',
  'list_trans',
  'list_client_bonus',
  'list_bonus',
  'list_users',
  'list_recarga',
  'list_retiros',
  'list_transacc_bonus'
]
export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const igetType = searchParams.get('type')

  if (typeof igetType === 'undefined' || igetType === '') {
    return NextResponse.json({})
  }
  if (igetType === BANK) {
    const data = await GetListBank()
    return NextResponse.json(data)
  }
  if (igetType === CHECKUSER) {
    const name_user = searchParams.get('name_user') || ''
    const pwd_user = searchParams.get('pwd_user') || ''
    const phone_user = searchParams.get('phone_user') || ''
    const code_user = searchParams.get('code_user') || 0
    const code_bono = searchParams.get('code_bono') || ''
    const email_user = searchParams.get('email_user') || ''


    const data = await CheckNameUser({ name_user })
    if (data.iserror) return NextResponse.json(data)

    const datapwd = CheckPWD({ pwd_user })
    if (datapwd.iserror) return NextResponse.json(datapwd)

    const datapho = CheckPhone({ phone_user, code_user: Number(code_user) })
    if (datapho.iserror) return NextResponse.json(datapho)

    // const databono = await CheckCodeBono({ code_bono })
    // return NextResponse.json(databono)
    // const [idusu_temp] = await PostDataRecordForTemp({ data: user_data })
    //

    const datau: dataUser = {
      id: -1,
      email_user,
      name_user,
      pwd_user,
      tel_user: phone_user,
      code_user: Number(code_user),
      code_bono: undefined
    }

    const [idusu_temp] = await PostDataRecordForTemp({ data: datau })
    const resp = idusu_temp === -1 ? { iserror: true, errortext: 'Error al guardar el usuario!', id: -1 } : { iserror: false, errortext: "", id: idusu_temp }
    if (resp.iserror) {
      return NextResponse.json(resp)
    }
    const create_idc = await handleCreateUserDefault({ idusu_temp })
    if (create_idc.err) {
      return NextResponse.json({ iserror: true, errortext: create_idc.msj, id: -1 })
    }
    return NextResponse.json({ iserror: false, errortext: 'ok', id: idusu_temp })

  }
  if (igetType === LISTPAY) {
    const data = await ListThisPay()

    return NextResponse.json(data)
  }
  if (igetType === LISTTRANSA) {
    const data = await ListTransaccionPay()
    try {
      return NextResponse.json(data)
    } catch (err) {
      return NextResponse.json({ error: true, err })
    }
  }
  if (igetType === LISTBONOCLIENT) {
    const data = await ListBonosClient()
    try {
      return NextResponse.json(data)
    } catch (err) {
      return NextResponse.json({ error: true, err })
    }
  }
  if (igetType === LISTBONO) {
    const data = await ListBonos()
    try {
      return NextResponse.json(data)
    } catch (err) {
      return NextResponse.json({ error: true, err })
    }
  }

  if (igetType === LIST_TRANSACC_BONUS) {
    const page = searchParams.get('page')
    const data = await LisTransaccBonos(Number(page))
    try {
      return NextResponse.json(data)
    } catch (err) {
      return NextResponse.json({ error: true, err })
    }
  }


  if (igetType === LIST_USER) {
    const data = await GetlistUserAvalible()
    console.log({ data })
    try {
      return NextResponse.json(data)
    } catch (err) {
      return NextResponse.json({ error: true, err })
    }
  }
  if (igetType === LIST_RECARGAS) {
    const data = await ListDataRecargas()
    try {
      return NextResponse.json(data)
    } catch (err) {
      return NextResponse.json({ error: true, err })
    }
  }
  if (igetType === LIST_RETIROS) {
    const data = await ListDataRetiros()
    try {
      return NextResponse.json(data)
    } catch (err) {
      return NextResponse.json({ error: true, err })
    }
  }

  return NextResponse.json({})
}
export async function ListDataRetiros (): Promise<dataListRetiros[]> {
  const { list: listSaldos } = await handleListCredit()
  const result = await SQLQuery(
    'Select _transac_portal_retiros.*,_transac_portal_sbbancos.Descripcion,_tusu.Usuario,_tusu.Asociado from _transac_portal_retiros,_transac_portal_sbbancos,_tusu where _transac_portal_retiros.idusu_temp = _tusu.IDusu and  _transac_portal_retiros.idban=_transac_portal_sbbancos.idban Order by _transac_portal_retiros.id DESC ',
    []
  )

  return result.map(
    (o: {
      id: number
      idusu_temp: number
      Usuario: string
      dateprocesado: string
      formatpay: number
      datecreater: string
      monto: number
      passport: string
      Descripcion: string
      tosend: string
      procesado: number
      Asociado: string
    }): dataListRetiros => {
      const findSaldos = listSaldos.find((e) => e.idc === o.Asociado)
      const saldo = findSaldos ? findSaldos.saldo : 0

      const f = new Date(Number(o.datecreater) * 1000)
      const h = f.getHours() <= 12 ? f.getHours() : f.getHours() - 12
      const p = f.getHours() < 12 ? 'am' : 'pm'
      const date_confirm = `${f.getDate()}/${f.getMonth()}/${f.getFullYear()} ${h}:${f.getMinutes()}${p}`
      return {
        id: o.id,
        IDusu: o.idusu_temp,
        user_name: o.Usuario,
        noapro: o.dateprocesado,
        formatpay: o.formatpay,
        date_confirm,
        monto: o.monto,
        saldo,
        passport: o.passport,
        text_bank: o.Descripcion,
        phone_email: o.tosend,
        procesado: o.procesado === 1
      }
    }
  )
}
export async function ListDataRecargas (): Promise<dataListTransacc[]> {
  const list: dataListTransacc[] = []

  const result_2 = await SQLQuery(
    'Select _transac_portal_register.*,_tusu.`Usuario` as user,_transac_portal_sbbancos.`Descripcion` from _transac_portal_register,_tusu,_transac_portal_sbbancos where _transac_portal_register.idusu_temp=_tusu.IDusu and _transac_portal_register.idban=_transac_portal_sbbancos.idban and _transac_portal_register.reportepago=1 order by _transac_portal_register.id DESC',
    []
  )

  result_2.forEach(
    (r: {
      id: number
      idusu_temp: number
      datecreater: string
      formatpay: number
      status: string
      email: string
      code_confirm: string
      name_confirm: string
      date_confirm: string
      monto: number
      errortext: string
      idban: number
      user: string
      phone: string
      reportepago: number
      Descripcion: string
    }) => {
      list.push({
        code_confirm: r.code_confirm,
        date_confirm: r.date_confirm,
        email: r.email,
        formatpay: r.formatpay,
        id: r.id,
        id_factura: r.id,
        monto: r.monto,
        name_confirm: r.name_confirm,
        noapro: r.status,
        phone: r.phone,
        status: r.reportepago,
        text_bancon: r.Descripcion,
        user_name: r.user,
        error: r.errortext !== '',
        code_error: r.errortext === '' ? '' : 'ERR',
        text_error: r.errortext
      })
    }
  )

  return list
}
async function ListBonos (): Promise<listBonus[]> {
  const result = await SQLQuery('select * from _transac_portal_listbono where 1', [])
  const data: listBonus[] = result.map(
    (o: { codebono: number; codigo: string; monto: number; cant_avalible: number; active: boolean }) => {
      return {
        id: o.codebono,
        codigo_bono: o.codigo,
        monto: o.monto,
        cantidad: o.cant_avalible,
        active: o.active
      }
    }
  )
  return data
}

async function LisTransaccBonos (page: number): Promise<listTransaccionBonus[]> {
  const data: listTransaccionBonus[] = []
  const result = await SQLQuery(`select * from _tconsecionario where 1 `, [])

  //limit 10 OFFSET ${page}

  const endrecord = (1 * page) * 10
  let countrecord = 0
  for (let r of result) {
    const result2 = await SQLQuery(`Select * from _tbbono where IDC='${r.IDC}' Order by id DESC`, [])
    const { id, transacc, monto, saldo, lastSerial, tipo } = result2.length !== 0 ? result2[0] : { id: -1, transacc: "", monto: -1, saldo: 0, lastSerial: 0, tipo: 0 }

    if (id !== -1) {
      const result2 = await SQLQuery(`Select * from _tusu where Asociado='${r.IDC}' `, [])
      const user_name = result2.length ? result2[0].Usuario : ""
      const ntran = Number(transacc)
      const d = epochDateHuman(ntran)

      const type_transscc = ["CASH BACK", "ASIGNACION BONO", "TICKET"]

      const realid = lastSerial === 0 && tipo === 1
        ? 1
        : lastSerial !== 0 ? 2 : tipo

      data.push({
        id,
        IDC: r.IDC,
        user_name,
        lastmonto: monto,
        lastserial: lastSerial,
        saldo,
        transacc: d,
        ntran,
        type_transscc: type_transscc[realid]
      })
      countrecord++
    }
  }

  data.sort((a, b) => b.ntran - a.ntran)

  console.log(data)


  return data
}


export async function ListBonosClient (): Promise<listClientWithBono[]> {
  const result = await SQLQuery(
    'select _tbbono.*,_transac_portal_listbono.codigo,_tusu.Usuario from _tbbono,_transac_portal_listbono,_tusu where _transac_portal_listbono.codebono=_tbbono.codebono and _tbbono.IDC=_tusu.Asociado and _tusu.Tipo=3',
    []
  )
  const data: listClientWithBono[] = result.map(
    (o: {
      id: number
      IDC: string
      monto: number
      saldo: number
      codigo: string
      Usuario: string
      codebono: number
    }) => {
      const { id, IDC, monto, saldo, codigo, Usuario, codebono } = o
      return {
        id,
        IDC,
        user_name: Usuario,
        codigo_bono: codigo,
        idcodigo: codebono,
        monto,
        saldo
      }
    }
  )

  return data
}
const [STATUS, STATUS_RECARD] = ['STATUS', 'STATUS_RECARD']
async function ListTransaccionPay (): Promise<dataListTransacc[]> {
  const list: dataListTransacc[] = []
  //'Select _transac_portal_pay.*,_transac_portal_tempdata.`user`,_transac_portal_tempdata.email,_transac_portal_tempdata.tel,_transac_portal_tempdata.register_complet from _transac_portal_pay,_transac_portal_tempdata where _transac_portal_pay.idu=_transac_portal_tempdata.id order by _transac_portal_pay.id DESC'

  // (r:{id:number,IDFacturas:number,Toket:string,lasttime:string,monto:number,formatpay:number,error:number,code:string,texterr:string,fechadecobro:string,noapro:string,idu:number,user:string,email:string,tel:string,register_complet:number})
  const result = await SQLQuery(
    'Select _transac_portal_pay.* from _transac_portal_pay where 1 order by _transac_portal_pay.id DESC',
    []
  )

  result.forEach(
    async (r: {
      id: number
      IDFacturas: number
      Toket: string
      lasttime: string
      monto: number
      formatpay: number
      error: number
      code: string
      texterr: string
      fechadecobro: string
      noapro: string
      idu: number
      origin: string
    }) => {
      const idu = r.idu
      const originData = {
        STATUS: `Select _transac_portal_tempdata.user,_transac_portal_tempdata.email,_transac_portal_tempdata.tel,_transac_portal_tempdata.register_complet from _transac_portal_tempdata where id = ${idu}`,
        STATUS_RECARD: `select _tusu.Usuario as user,_tconsecionario.email,_tconsecionario.celular as tel,_tconsecionario.Estatus as register_complet from _tusu,_tconsecionario where  _tusu.IDusu=${idu} and _tusu.Asociado = _tconsecionario.IDC`
      }
      const sqlGet = r.origin === STATUS ? originData.STATUS : originData.STATUS_RECARD
      const result2 = await SQLQuery(sqlGet, [])
      const { user, email, tel, register_complet } =
        result2.length !== 0 ? result2[0] : { user: 0, email: '', tel: '', register_complet: 0 }
      console.log(r.fechadecobro)
      const date_confirm =
        r.fechadecobro === '' || r.fechadecobro === null || r.fechadecobro === 'NA'
          ? ''
          : r.fechadecobro.split(' ')[0].split('-').reverse().join('/')

      list.push({
        code_confirm: '',
        date_confirm,
        email: email,
        formatpay: r.formatpay,
        id: r.id,
        id_factura: r.IDFacturas,
        monto: r.monto,
        name_confirm: '',
        noapro: r.noapro,
        phone: tel,
        status: register_complet,
        text_bancon: '',
        user_name: user,
        error: r.error === 1,
        code_error: r.code,
        text_error: r.texterr
      })
    }
  )

  const result_2 = await SQLQuery(
    'Select _transac_portal_register.*,_transac_portal_tempdata.`user`,_transac_portal_tempdata.tel,_transac_portal_tempdata.register_complet,_transac_portal_sbbancos.`Descripcion` from _transac_portal_register,_transac_portal_tempdata,_transac_portal_sbbancos where _transac_portal_register.idusu_temp=_transac_portal_tempdata.id and _transac_portal_register.idban=_transac_portal_sbbancos.idban and _transac_portal_register.reportepago=0 order by _transac_portal_register.id DESC',
    []
  )

  result_2.forEach(
    (r: {
      id: number
      idusu_temp: number
      datecreater: string
      formatpay: number
      status: string
      email: string
      phone: string
      code_confirm: string
      name_confirm: string
      date_confirm: string
      monto: number
      errortext: string
      idban: number
      user: string
      tel: string
      register_complet: number
      Descripcion: string
    }) => {
      list.push({
        code_confirm: r.code_confirm,
        date_confirm: r.date_confirm,
        email: r.email,
        formatpay: r.formatpay,
        id: r.id,
        id_factura: r.id,
        monto: r.monto,
        name_confirm: r.name_confirm,
        noapro: r.status,
        phone: r.tel,
        status: r.register_complet,
        text_bancon: r.Descripcion,
        user_name: r.user,
        error: r.errortext !== '',
        code_error: r.errortext === '' ? '' : 'ERR',
        text_error: r.errortext
      })
    }
  )

  return list
}

async function ListThisPay (): Promise<dataPayList[]> {
  const list: dataPayList[] = []

  const result = await SQLQuery('Select * from _transac_portal_formpay Order by id', [])
  if (result.length !== 0) {
    const list: dataPayList[] = result.map((r: { id: number; formatpay: number; text: string; idm: number }) => {
      const { id, formatpay, text, idm } = r
      return {
        id,
        formatpay,
        textformatpay: text,
        idm
      }
    })

    return list
  }

  return list
}
async function CheckCodeBono ({ code_bono }: { code_bono: string }): Promise<respondeDataCheckUser> {
  if (code_bono === '') {
    return { iserror: false, errortext: '', id: -1 }
  }
  const result = await SQLQuery('Select * from _transac_portal_listbono Where codigo=?', [code_bono])
  if (result.length !== 0) {
    const { active, cant_avalible } = result[0]
    if (active && cant_avalible !== 0) {
      return { iserror: false, errortext: '', id: -1 }
    }
  }
  return { iserror: true, errortext: `El Bono ${code_bono} no esta habilitado!`, id: -1 }
}
function CheckPhone ({ phone_user, code_user }: { phone_user: string; code_user: number }): respondeDataCheckUser {
  const findCountryCode = dataCodePhone.find((o) => o.value === code_user)
  const CountryCode: CountryCode = typeof findCountryCode !== 'undefined' ? findCountryCode.code : 'VE'
  const phoneNumber = parsePhoneNumber(phone_user, CountryCode)
  const isValidPhone = isValidPhoneNumber(phoneNumber.number, CountryCode)
  console.log({ isValidPhone, phone_user, phoneNumber })
  return {
    iserror: !isValidPhone,
    errortext: isValidPhone ? '' : `Este numero móvil no es valido para ${phoneNumber.country} `
    , id: -1
  }
}
function CheckPWD ({ pwd_user }: { pwd_user: string }): respondeDataCheckUser {
  const listPWDNOT = [
    'root',
    'admon',
    'super',
    'administrativo',
    '`',
    '/',
    '?',
    '<',
    '>',
    "'",
    '"',
    '(',
    ')',
    '*',
    '[',
    ']',
    '.',
    '&'
  ]

  const isCheck = listPWDNOT.map((o) => pwd_user.includes(o) || o.includes(pwd_user)).filter(Boolean)

  if (isCheck.length !== 0) {
    return { iserror: true, errortext: 'La Clave tiene caracteres no Permitidos!', id: -1 }
  }
  const MIN_CHARACTER = 5
  if (pwd_user.length < MIN_CHARACTER) {
    return { iserror: true, errortext: `La Clave debe tener ${MIN_CHARACTER} o mas letras o numeros!`, id: -1 }
  }

  return { iserror: false, errortext: '', id: -1 }
}
// CREATE TABLE `_tusu` (
//     `IDusu` int(10) unsigned NOT NULL DEFAULT 0,
//     `Estacion` int(11) NOT NULL DEFAULT 0,
//     `Descripcion` varchar(100) NOT NULL DEFAULT '',
//     `clave` varchar(15) NOT NULL DEFAULT '',
//     `Usuario` varchar(70) NOT NULL DEFAULT '',
//     `Asociado` varchar(45) NOT NULL DEFAULT '',
//     `Estatus` int(10) unsigned NOT NULL DEFAULT 0,
//     `Nombre` varchar(45) NOT NULL DEFAULT '',
//     `Acceso` text NOT NULL,
//     `Tipo` int(10) unsigned NOT NULL DEFAULT 0,
//     `bloqueado` int(10) unsigned NOT NULL DEFAULT 0,
//     `AccesoP` varchar(45) NOT NULL DEFAULT '''''',
//     `AGrupo` varchar(45) NOT NULL DEFAULT '0',
//     `lastactivity` varchar(100) NOT NULL,
//     `ABanca` int(11) NOT NULL DEFAULT 0,
//     `impremsg` int(11) NOT NULL DEFAULT 0,
//     `hashtime` varchar(50) NOT NULL DEFAULT '0',
//     PRIMARY KEY (`IDusu`),
//     UNIQUE KEY `Usuario` (`Usuario`),
//     KEY `Asociado` (`Asociado`),
//     CONSTRAINT `_tusu_ibfk_1` FOREIGN KEY (`Asociado`) REFERENCES `_tconsecionario` (`IDC`) ON DELETE CASCADE ON UPDATE CASCADE
//   ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

async function GetlistUserAvalible (): Promise<listUserAvalible[]> {
  const result = await SQLQuery('Select * from _tusu Where Tipo=? and IDusu!=3', [TYPE_CLIENT_END])
  return result.map((o: { IDusu: number; Usuario: string; Asociado: string; Estatus: number; Nombre: string }) => {
    return {
      IDusu: o.IDusu,
      Usuario: o.Nombre,
      IDC: o.Asociado,
      Tipo: TYPE_CLIENT_END,
      Nombre: o.Nombre,
      Estatus: CODE_ACTIVE_USER[o.Estatus]
    }
  })
}
async function CheckNameUser ({ name_user }: { name_user: string }): Promise<respondeDataCheckUser> {
  const listuserNOT = [
    'root',
    'admon',
    'super',
    'administrativo',
    '$',
    '@',
    '!',
    '`',
    '/',
    '?',
    '<',
    '>',
    '#',
    '%',
    "'",
    '"',
    '(',
    ')',
    '*',
    '[',
    ']'
  ]

  const m_name_user = name_user.toLowerCase()

  const isCheck = listuserNOT.map((o) => m_name_user.includes(o) || o.includes(m_name_user)).filter(Boolean)

  if (isCheck.length !== 0) {
    return { iserror: true, errortext: 'Nombre de usuario No permitido!', id: -1 }
  }

  const MIN_CHARACTER = 5
  if (m_name_user.length < MIN_CHARACTER) {
    return { iserror: true, errortext: `El usuario debe tener ${MIN_CHARACTER} o mas letras!`, id: -1 }
  }
  if (m_name_user === '') return { iserror: true, errortext: 'Nombre de Usuario esta en Blanco!', id: -1 }

  const result = await SQLQuery('Select * from _tusu Where usuario=?', [m_name_user])
  if (result.length === 0) {
    const result = await SQLQuery('Select * from _transac_portal_tempdata Where user=?', [m_name_user])
    const iserror = result.length !== 0
    return { iserror, errortext: iserror ? 'Este usuario existe!' : '', id: -1 }
  }
  const iserror = result.length !== 0
  return { iserror, errortext: iserror ? 'Este usuario existe!' : '', id: -1 }
}
async function GetListBank (): Promise<dataListBank[]> {
  const returnData: dataListBank[] = []
  const result = await SQLQuery('Select * from _transac_portal_sbbancos Where 1 Order by Descripcion', [])
  if (result.length !== 0) {
    for (let r of result) {
      const { idban, Descripcion } = r
      returnData.push({ id: Number(idban), description: Descripcion })
    }
  }
  return returnData
}


function epochDateHuman (t: number): string {

  const f = new Date(Number(t) * 1000)
  const h = f.getHours() <= 12 ? f.getHours() : f.getHours() - 12
  const p = f.getHours() < 12 ? 'am' : 'pm'
  return `${f.getDate()}/${f.getMonth() + 1}/${f.getFullYear()} ${h}:${f.getMinutes()}${p}`

}