import { useState } from "react"
import Value from "./Value"

const Adder = ( {name} ) => {
    // states
    const [a,setA] = useState(0)
    const [b,setB] = useState(0)

    return (

        // container
        <div className="border border-black border-2 rounded-4 mx-auto p-3 mb-5 bg-white"
        style={ {width: '100%', minWidth: '600px'} }>
            <h1 className="text-center text-primary"> {name || 'ADDER'} </h1>

            {/* body */}
            <div className="d-flex justify-content-between">

                <span className="badge bg-secondary fs-4"> A = {a} </span>
                <span className="badge bg-primary fs-4"> A + B = {a+b} </span>
                <span className="badge bg-secondary fs-4"> B = {b} </span>

            </div>

            <div className="d-flex justify-content-between gap-3">
                <Value name={'A'} value={a} setValue={setA} />
                <Value name={'B'} value={b} setValue={setB} />
            </div>
        </div>
    )
}

export default Adder