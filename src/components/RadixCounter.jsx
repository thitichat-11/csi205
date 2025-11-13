import { useState } from "react"

const RadixCounter = () => {

    // getter , setter
    const [value,setValue] = useState(0)


    const minusClicked = () => {
        console.log('-')
        if (value <= 0) setValue(4095)
        else setValue( (p) => p - 1)

        // เขียนแบบนี้ได้เหมือนกัน
        // value <= 0 ? setValue(4095) : setValue( (p) => p - 1)

        // เขียนแบบนี้ได้เหมือนกัน
        // setValue(value - 1)
        // p ก็เหมือน value ซึ่งคือค่าเก่า - 1 เพื่อกลายเป็นค่าใหม่ > setValue
        // setValue( (p) => { return p - 1 })
    }

    const resetClicked = () => {
        console.log('reset')
        setValue(0)
    }

    const plusClicked = () => {
        console.log('+')
        if (value >= 4095) setValue(0)
        else setValue( (p) => p + 1)
    }



    return (
        // container
        <div className="border border-2 border-black rounded-4 m-auto p-3 mt-3 " style={ {width: 'fit-content'} }>

            {/* title */}
            <h1 className="text-center fw-bold">RADIX COUNTER</h1>


            {/* body */}
            <div className="d-flex justify-content-between text-center gap-3 mt-3">

                {/* เลขฐาน 16 */}
                <div>
                    <div className="fs-4 fw-bold">[HEX]</div>
                    <div className="fs-5 font-monospace">
                        {value.toString(16).toUpperCase().padStart(3, '0')}
                    </div>
                </div>

                {/* เลขฐาน 10 */}
                <div>
                    <div className="fs-4 fw-bold">[DEC]</div>
                    <div className="fs-5 font-monospace text-primary fw-bold">

                        {/* ถ้าหลักตัวเลขเราไม่ถึง 4 ตัว มันจะเติมเลข 0 ให้เรา */}
                        {value.toString().padStart(4, '0')}

                    </div>
                </div>

                {/* เลขฐาน 8 */}
                <div>
                    <div className="fs-4 fw-bold">[OCT]</div>
                    <div className="fs-5 font-monospace">
                        {value.toString(8).padStart(4, '0')}
                    </div>
                </div>
                
                {/* เลขฐาน 2 */}
                <div>
                    <div className="fs-4 fw-bold">[BIN]</div>
                    <div className="fs-5 font-monospace">
                        {value.toString(2).padStart(12, '0')}
                    </div>
                </div>

            </div>


            {/* button */}
            <div className="d-flex justify-content-around mt-3">

                <button className="btn btn-danger px-4" 
                onClick={ () => {minusClicked()} }
                >&minus;
                </button>

                <button className="btn btn-secondary px-5" 
                onClick={ () => {resetClicked()}}>
                    RESET
                    </button>

                <button className="btn btn-success px-4" 
                onClick={ () => {plusClicked()} }>
                    +
                    </button>
            </div>

        </div>
    )
}

export default RadixCounter