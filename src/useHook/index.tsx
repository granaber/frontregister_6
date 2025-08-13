import { Context } from "@/context"
import { dataConfirmOtherPay } from "@/types/data_types"
import { useContext } from "react"

export const useUpdateData = () => {

    const { dataU, data_confirm } = useContext(Context)
    const handleApiSaveData = async (): Promise<{ error: Boolean, textErr: String, idu: number }> => {
        const json_Data: dataConfirmOtherPay = {
            user_data: dataU,
            data_confirm
        }
        try {
            const response = await fetch(`/api/register?itype=other_pay`, { method: 'POST', body: JSON.stringify(json_Data) })
            if (!response.ok) {
                return { error: true, textErr: 'Hubo un error grabado la información suministrada!(1)', idu: -1 }
            }
            const data = await response.json()
            if (data.id !== -1) {
                return { error: false, textErr: '', idu: data.idu }

            }
            return { error: true, textErr: 'Hubo un error grabado la información suministrada!(3)', idu: -1 }

        } catch (error) {
            return { error: true, textErr: 'Hubo un error grabado la información suministrada!(2)', idu: -1 }
        }


    }

    return { handleApiSaveData }
}