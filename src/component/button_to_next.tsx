import { keyTypeForm, typeforms, formPortal } from "@/types/data_types";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Button } from "flowbite-react";

const list = Object.keys(typeforms)
export const handlenPosition = (x: keyTypeForm): number => {
    const searchP = Object.entries(formPortal).find((o) => o[1] === x)
    const p = typeof searchP === 'undefined' ? 0 : Number(searchP[0])

    return p
}
export default function ButtonToNext ({ text, current, btntext, cb }: { text: string, current: keyTypeForm, btntext: string[], cb: (e: keyTypeForm, p: number) => {} }) {



    const setnextForm = (current: keyTypeForm) => {
        console.log({ current })
        let activeNxt = false
        for (const x of list) {
            if (activeNxt) {
                if (x !== 'x') {
                    const p = handlenPosition(x as keyTypeForm)
                    const pn = current === "DATAUSER" && p === 1 ? 4 : p
                    const xn: keyTypeForm = current === "DATAUSER" ? "ENDFORM" : x as keyTypeForm

                    cb(xn as keyTypeForm, pn)
                    return
                }
            }
            activeNxt = x === current

        }
        window.location.href = "https://betgambler.net"
        // cb("DATAUSER")

    }

    const setbackForm = (current: keyTypeForm) => {
        let activeNxt = false
        let beforeNxt: keyTypeForm = current
        let p = 1
        for (const x of list) {

            if (activeNxt) {
                const p = beforeNxt === "DATAUSER" ? 0 : handlenPosition(beforeNxt)
                cb(beforeNxt, p)
                return
            }
            activeNxt = x === current
            if (!activeNxt) {
                beforeNxt = x as keyTypeForm
                continue
            }

        }
        if (activeNxt) {
            cb("DATAUSER", 0)
        }
    }


    return (<>
        {btntext[0] !== '' ?
            <>
                <button type="submit" onClick={() => setbackForm(current)} className="text-white bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 mr-6  hidden sm:block">
                    {btntext[0]}
                </button>
                <Button type="submit" onClick={() => setbackForm(current)} className="text-white bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 block sm:hidden">
                    <HiOutlineArrowLeft className="h-6 w-6"></HiOutlineArrowLeft>
                </Button>
            </>
            : <></>
        }
        {btntext[1] !== '' ?
            <>
                <button type="submit" onClick={() => setnextForm(btntext[1] === 'Finalizar' ? "ENDFORM" : current)} className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[150px]  sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${btntext[1] === 'Finalizar' ? 'py-2.5 px-5' : 'sm:py-2.5 sm:px-5'}`}>
                    {btntext[1]}
                </button>

            </>
            : <></>
        }
    </>
    )
}