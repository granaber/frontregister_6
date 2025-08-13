
import { NextResponse } from "next/server";
import { SQLQuery } from "@/db"
import { dataConfirmTDC } from "@/types/data_types";

export  async function GET (request: Request) {
    const { searchParams } = new URL(request.url)
    const idFacture = searchParams.get('idFacture')

    const data = await GetDataTDC({ idFacture: Number(idFacture) })

    return NextResponse.json( data )
}
async function GetDataTDC ({ idFacture }: { idFacture: number }): Promise<dataConfirmTDC> {

    const returnData: dataConfirmTDC = {
        fecha: '',
        idfactura: idFacture,
        monto: 0,
        noapro: 'No Existe',
        status:false,
        errortext:'No Existe Factura'
    }

    if (idFacture !== 0 && typeof idFacture === 'number') {
        const result = await SQLQuery('Select * from _transac_portal_pay Where IDFacturas=?', [idFacture])
        if (result.length !== 0) {
            const { noapro, fechadecobro, monto,error,texterr } = result[0];
            if (error){
                returnData.status=false
                returnData.errortext=texterr
                returnData.noapro = "No Aprobado"
            }else{
                returnData.fecha = convertDateTime(fechadecobro)
                returnData.noapro = noapro
                returnData.errortext=""
                returnData.status=true
            }
            returnData.monto = monto



        }
    }

    return returnData;
}
function convertDateTime (dateIn: string): string {
    //2023-06-14 13:39:01
    const [fecha, horas] = dateIn.split(' ')
    const dateConvert = fecha.split('-').reverse().join('/')
    const [ho, mi, se] = horas.split(':').map(Number)

    const [cHora, amOpm] = ho > 12 ? [ho - 12, 'pm'] : [ho, 'am']

    return `${dateConvert} ${cHora <= 9 ? `0${cHora}` : cHora}:${mi <= 9 ? `0${mi}` : mi}:${se <= 9 ? `0${se}` : se} ${amOpm}`
}