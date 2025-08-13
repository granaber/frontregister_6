import { useState } from "react";
import IconCopy from "./svg/iconcop_copy";
import ToastDone from "./toast";

export default function BoxToMonto ({ monto }: { monto: Number }) {
    const [text, settext] = useState('')

    return (
        <>
            <div className="mt-4 border rounded-md p-1 w-full">
                <label htmlFor="tdc" className="inline-block mb-1  mr-2 text-base  font-medium text-sky-900 dark:text-white">Monto  </label>
                <h3 className="inline" >{monto.toString()} <button onClick={() => settext(monto.toString())}><IconCopy className="my-2 inline-block" /></button></h3>
            </div>
            <ToastDone textcpy={text} />
        </>
    )
}