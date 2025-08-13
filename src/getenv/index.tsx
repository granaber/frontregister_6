import { PRODUCTION, DEPLOY, mode } from '@/types/data_types'

interface envdata {
    USERNAME: string
    PASSWORD: string
    DB_HOST: string
    PORT: Number
    DATA_BASE: string
    TOKENAPI: string
}
export default function GetEnv (): envdata {


    const T_PORT = process.env[`DB_PORT`]

    const USERNAME = process.env[`USERNAME`]
    const PASSWORD = process.env[`PASSWORD`]
    const DB_HOST = process.env[`DB_HOST`]
    const DB_PORT = Number(typeof T_PORT === 'undefined' ? 3306 : T_PORT)
    const DATA_BASE = process.env[`DATA_BASE`]
    const TOKENAPI = process.env[`TOKENAPICREDIT`]


    const envdata: envdata = {
        USERNAME: USERNAME ?? 'root',
        PASSWORD: PASSWORD ?? 'root',
        DB_HOST: DB_HOST ?? 'localhost',
        DATA_BASE: DATA_BASE ?? 'default',
        TOKENAPI: TOKENAPI ?? 'nt',
        PORT: DB_PORT
    }
    return envdata
}

interface getModereturn {
    MODE: mode
}
export const getMode = (): getModereturn => {
    const { MODE } = process.env
    console.log({ MODE })
    return { MODE: typeof MODE === 'undefined' ? 'dev' : 'production' }
}
