import { Sequelize, QueryTypes } from 'sequelize'
import GetEnv from '../getenv/index'

let sequel: Sequelize
export default async function Connect (): Promise<Sequelize> {
    const { USERNAME, PASSWORD, DATA_BASE, DB_HOST, PORT } = GetEnv()
    sequel = await new Sequelize(DATA_BASE, USERNAME, PASSWORD, {
        host: DB_HOST,
        port: Number(PORT),
        dialect: 'mysql',
        dialectModule: require('mysql2'),
        logging: console.log
    })

    return sequel
}

export const SQLQuery = async (query: string, values: any[]): Promise<any> => {
    const sequel = await Connect()
    const result = await sequel.query(query, {
        replacements: values,
        type: QueryTypes.SELECT
    })
    return result
}
export const SQLQueryInsert = async (query: string, values: any[]): Promise<any> => {
    const sequel = await Connect()
    const [results, metadata] = await sequel.query(query, {
        replacements: values,
        type: QueryTypes.INSERT
    })
    return [results, metadata]
}
export const SQLQueryUpdate = async (query: string, values: any[]): Promise<any> => {
    const sequel = await Connect()
    const result = await sequel.query(query, {
        replacements: values,
        type: QueryTypes.UPDATE
    })
    return result
}