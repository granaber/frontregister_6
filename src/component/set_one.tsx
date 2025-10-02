import { useContext, useState } from "react"
import { dataCodePhone, dataUser, keyTypeForm, respondeDataCheckUser, stateAlert } from "@/types/data_types"
import { TextInput, Button, Select } from "flowbite-react"
import { Context } from "@/context"
import AlertGo from "./alert"

export default function SetOnePay ({ callNext }: { callNext: (e: keyTypeForm) => {} }) {
    const { dataU, setRegister } = useContext(Context)
    const [viewalert, setviewAlert] = useState<stateAlert>({ state: false, info: '' })

    const handlenDataform = (type: number, data: string) => {
        let field: string = "name_user"
        if (type === 1) {
            field = "name_user"
        }
        if (type === 2) {
            field = "email_user"
        }
        if (type === 3) {
            field = "pwd_user"
        }
        if (type === 4) {
            field = "tel_user"
        }
        if (type === 5) {
            field = "code_user"
        }
        if (type === 6) {
            field = "code_bono"
        }
        const ndata = type === 3
            ? data.replaceAll(" ", '')
            : type === 6
                ? data.toUpperCase()
                : data.replaceAll(" ", '').toLowerCase()
        const newRecord: dataUser = { ...dataU, [field]: ndata }

        setRegister(newRecord)
    }
    const handleNext = (e: React.SyntheticEvent) => {
        e.preventDefault()
        fetch(`/api/list?type=checkuser&email_user=${dataU.email_user}&name_user=${dataU.name_user}&pwd_user=${dataU.pwd_user}&phone_user=${dataU.tel_user}&code_user=${dataU.code_user}&code_bono=${dataU.code_bono?.toUpperCase()}&mnd=${dataU.mnd}`)
            .then((res) => res.json())
            .then((data: respondeDataCheckUser) => {

                const { iserror, errortext, id } = data
                if (iserror) {
                    setviewAlert({ state: iserror, info: errortext })
                    return false
                }
                const newDataU: dataUser = { ...dataU, id: id }
                console.log({ newDataU })
                setRegister(newDataU)

                //setDataRegisterConf

                callNext("ENDFORM")
            })

    }
    return (
        <>
            <AlertGo show={viewalert.state} cb={async (e) => setviewAlert({ state: e, info: '' })} title="Información!" text={viewalert.info} />

            <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Datos de Usuario</h3>
            <form onSubmit={handleNext} className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="name_user" >Nombre de usuario</label>
                    <TextInput required onChange={({ target: { value } }) => handlenDataform(1, value)} value={dataU.name_user} type="text" name="name_user" id="name_user" placeholder="username.example" />
                </div>
                <div>
                    <label htmlFor="email_user" >Email</label>
                    <TextInput required onChange={({ target: { value } }) => handlenDataform(2, value)} value={dataU.email_user} type="email" name="email_user" id="email_user" placeholder="correo@company.com" />
                </div>
                <div>
                    <label htmlFor="pwd_user" >Clave</label>
                    <TextInput required onChange={({ target: { value } }) => handlenDataform(3, value)} value={dataU.pwd_user} type="password" name="pwd_user" id="pwd_user" placeholder="•••••••••" />
                </div>
                <div>
                    <label htmlFor="tel_user" className="">No. Telefono Movil</label>
                    <div className="flex  flex-row">
                        <Select
                            className="basis-1/2 "
                            id="countries"
                            defaultValue={dataU.code_user}
                            onChange={({ target: { value } }) => handlenDataform(5, value)}
                            required
                        >
                            {
                                dataCodePhone.map(o =>
                                    <option key={`code-${o.code}`} value={o.value}>
                                        {o.code}{o.text}
                                    </option>
                                )
                            }

                        </Select>
                        <TextInput className="w-full" required onChange={({ target: { value } }) => handlenDataform(4, value)} value={dataU.tel_user}
                            type="tel" name="tel_user" id="tel_user" placeholder="4140000000" />
                    </div>
                </div>
                {/* <div>
                    <label htmlFor="code_bono" >Código para BONO</label>
                    <TextInput onChange={({ target: { value } }) => handlenDataform(6, value)} value={dataU.code_bono} type="text" name="code_bono" id="code_bono" placeholder="Codigo para Bono" />
                </div> */}
                <div className="pt-[25px]">
                    <Button type="submit" className="w-full" >
                        Siguiente: Registra tu usuario
                    </Button>
                </div>
            </form>
        </>
    )
}

