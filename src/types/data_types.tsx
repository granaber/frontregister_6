import { CountryCode } from "libphonenumber-js/types"

export const [PRODUCTION, DEPLOY] = ['production', 'dev']
export type mode = 'production' | 'dev'
export type process = 'save' | 'cancel'
export const NEWRECORD = -1
export const TIMEZONE = 'America/Caracas'
export enum typeoptions {
    TDC,
    ZELLE,
    BINANCE,
    PAGOMOVIL,
    TRANSFER,
    NONE
}
export const [SAVEBONUS, NEWBONUS, SAVECLIENTBONUS, NEWCLIENTBONUS, SAVERECARGAS, UPDATERETIROS] = ['save_bonus', 'new_bonus', 'update_client_bonus', 'new_client_bonus', 'save_recargas', 'update_retiros']

export const [BANK, CHECKUSER, LISTPAY, LISTTRANSA, LISTBONOCLIENT, LISTBONO, LIST_USER] = ['bank', 'checkuser', 'list_pay', 'list_trans', 'list_client_bonus', 'list_bonus', 'list_users']
export const LIST_TRANSACC_BONUS = 'list_transacc_bonus'
export type typeOp = keyof typeof typeoptions
type objecTypeOptions = {
    auto: Boolean
    texto: String
    frm: number
    typeOf: typeOp
}
type typeInfoOptions = {
    [index in typeOp]: objecTypeOptions
}

export const infoTypeOptions: typeInfoOptions = {
    TDC: { auto: true, texto: 'Tarjeta de Credito', frm: 2, typeOf: "TDC" },
    ZELLE: { auto: false, texto: 'via Zelle', frm: 3, typeOf: "ZELLE" },
    BINANCE: { auto: false, texto: 'via Binance', frm: 4, typeOf: "BINANCE" },
    PAGOMOVIL: { auto: false, texto: 'via Pago Movil', frm: 5, typeOf: "PAGOMOVIL" },
    TRANSFER: { auto: false, texto: 'via Transferencia', frm: 6, typeOf: "TRANSFER" },
    NONE: { auto: false, texto: 'None', frm: 0, typeOf: "NONE" },
}

export enum typeforms {
    DATAUSER,
    ENDFORM,
    x
}
export type keyTypeForm = keyof typeof typeforms
type typeFormsPortal = {
    [index in string]: keyTypeForm
}

export const formPortal: typeFormsPortal = {
    "1": "DATAUSER",
    "4": "ENDFORM",
}




export const textButton = {
    DATAUSER: ['', ''],
    DATAPAY: ['Retrocede: Datos de Usuario', 'Avanza: Crear Acceso/Usuario'],
    REGISTER: ['Retrocede: Montos/Metodos de Pagos', ''],
    ENDFORM: ['', 'Finalizar'],
    x: ['', '']
}

export type dataConfirmTDC = {
    noapro: string
    idfactura: number
    monto: number
    fecha: string
    status: boolean
    errortext: string
}
export const [APROBADO, ENESPERA] = ["APROBADO", "ENESPERA"]
export type statusConfirm = "NOAPROBADO" | "APROBADO" | "ENESPERA"
type listFormText = {
    [index in statusConfirm]: string
}
export const formStatus: listFormText = {
    'APROBADO': 'ESTA APROBADO',
    'ENESPERA': 'EN ESPERA ',
    'NOAPROBADO': 'PAGO NO APROBADO'
}
type listKeyFormCode = {
    [index in statusConfirm]: statusConfirm
}
export const formStatusCode: listKeyFormCode = {
    APROBADO: "APROBADO",
    ENESPERA: "ENESPERA",
    NOAPROBADO: "NOAPROBADO"
}
export type dataSettingGeneral = {
    status: statusConfirm,
    code_confirm: string,
    name_confirm: string,
    idUser: number,
    email: string,
    phone: string,
    formatpay: number,
    txtformatpay: string,
    errortext: string,
    idbank?: number,
    nane_bank?: string,
}
export type dataFormShow = {
    idu: number,
    code_confirm: string,
    name_confirm: string | undefined,
    bank_code?: number,
    bank_config: string | undefined,
    date_transac: string | undefined,
    formatpay: number,
    monto: number

}
export type dataListBank = {
    id: number,
    description: string
}
export type statusConfirmDatos = "APRORBADO" | "RECHAZADO"

export type dataUser = {
    name_user: string,
    email_user: string,
    pwd_user: string,
    tel_user: string,
    code_user: number,
    code_bono?: string
    id?: number
    mnd: number
}
export type registerDataWithoutPay = dataUser & {
    status: statusConfirm
}
export type respondeDataCheckUser = {
    id: number
    iserror: boolean
    errortext: string
}

export type dataConfirmOtherPay = {
    user_data: dataUser,
    data_confirm: dataFormShow,
}

export type dataPayList = {
    id: number,
    formatpay: number,
    textformatpay: string,
    idm: number
}

export type dataListTransacc = {
    id: number,
    formatpay: number,
    monto: number,
    noapro: string,
    id_factura: number,
    status: number,
    email: string,
    phone: string,
    text_bancon: string,
    code_confirm: string,
    name_confirm: string,
    date_confirm: string,
    user_name: string,
    error: boolean,
    code_error: string,
    text_error: string
}

export const initDataListTransacc = {
    code_confirm: "",
    date_confirm: "",
    email: "",
    formatpay: 0,
    id: 0,
    id_factura: 0,
    monto: 0,
    name_confirm: "",
    noapro: "",
    phone: "",
    status: 0,
    text_bancon: '',
    user_name: "",
    error: false,
    code_error: "",
    text_error: ""
}
export type dataListRetiros = {
    id: number
    IDusu: number
    user_name: string
    noapro: string
    formatpay: number
    date_confirm: string
    monto: number
    saldo: number
    passport: string
    text_bank: string
    phone_email: string
    procesado: boolean
    textformatpay?: string
    checkhast?: number
}


export type parameterAprobClient = {
    id_factura: number
}
export type responseAprobClient = { error: boolean, textErr: string }

export type dataAccess = {
    id_user: string
    pwd_user: string
    token_user: number
}
export type dataAccessfecth = {
    u: string
    p: string
    t: number
}
export type responseAccess = {
    access: boolean
    err: boolean
    texterr: string
}
export type stateAlert = {
    state: boolean
    info: string
}
type CodePhone = { value: number, code: CountryCode, text: string }

export const dataCodePhone: CodePhone[] = [
    { value: 0, code: 'VE', text: '+58' },
    { value: 1, code: 'CO', text: '+57' },
    { value: 2, code: 'CH', text: '+56' },
    { value: 3, code: 'EC', text: '+593' },
    { value: 4, code: 'US', text: '+1' },
]


export type listClientWithBono = {
    id: number
    IDC: string
    user_name: string
    codigo_bono: string
    idcodigo: number
    monto: number
    saldo: number,
    checkhast?: number
}
export const initListClientWithBono: listClientWithBono = {
    id: NEWRECORD,
    IDC: NEWRECORD.toString(),
    user_name: NEWRECORD.toString(),
    codigo_bono: NEWRECORD.toString(),
    idcodigo: NEWRECORD,
    monto: 0,
    saldo: 0,
    checkhast: Date.now()
}

export type listBonus = {
    id: number
    codigo_bono: string
    monto: number
    cantidad: number
    active: boolean

}
export const initListBonus: listBonus = { active: false, cantidad: 0, codigo_bono: '', id: NEWRECORD, monto: 0 }
export type typeResponseRegisterBonus = { state: boolean, id: number, err: boolean, txterro: string, updateList?: listBonus[] | listClientWithBono[] | undefined }
export type typeResponseRegisterRR = { state: boolean, id: number, err: boolean, txterro: string, updateList?: dataListTransacc[] | dataListRetiros[] | undefined }

export type listUserAvalible = {
    IDusu: number
    Usuario: string
    IDC: string
    Tipo: number
    Nombre: string
    Estatus: number
}
export const [TYPE_CLIENT_END, USER_ACTIVE, USER_SUSPEND] = [3, 1, 2]
export const CODE_ACTIVE_USER = [, USER_ACTIVE, USER_SUSPEND]


export type listTransaccionBonus = {
    id: number
    IDC: string
    user_name: string
    lastmonto: number
    lastserial: number
    saldo: number
    transacc: string
    ntran: number
    type_transscc: string
}
export const initListTransaccBonus: listTransaccionBonus = {
    id: NEWRECORD,
    IDC: NEWRECORD.toString(),
    user_name: NEWRECORD.toString(),
    lastmonto: NEWRECORD,
    lastserial: NEWRECORD,
    saldo: NEWRECORD,
    transacc: NEWRECORD.toString(),
    ntran: NEWRECORD,
    type_transscc: NEWRECORD.toString()
}
export type countryAvalible = {
    id: number
    flag: string
    name: string
    code: string
    mnd: number
}