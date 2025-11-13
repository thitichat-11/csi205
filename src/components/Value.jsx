import { useEffect, useState } from "react"

// destructor แล้วตรงคำว่า name คือต้องตรงกับตัวที่ใส่ในหน้า app.jsx เป็นการใส่ props
const Value = ( { name, type, init, value, setValue } ) => {

    // state
    // const [value,setValue] = useState(0)

    // เมื่อค่า init เปลี่ยน ให้ setValue ใหม่ (ถ้ามีการส่ง init)
    useEffect(() => {
        if (init !== undefined) {
            setValue(init);
        }
    }, [init]);

    const handleChange = (delta) => {
    // กัน NaN และกรณี value ยังไม่ได้ค่า
    const current = typeof value === "number" ? value : 0;
    const newValue = current + delta;
    setValue(newValue);
    };


    return (
        // container
        <div className="border border-black border-2 rounded-3 mx-auto mt-3 p-3 bg-secondary-subtle"
        style={ {width: '100%', minWidth: '300px'} }>

            {/* body */}
            {/* ตรงนี้คือถ้าไม่มีการส่งค่า name ให้ส่งเป็น VALUE ไปแทน */}
            <h1 className="text-primary text-center"> {name || 'VALUE'} </h1>

            {/* button */}
            <div className="d-flex justify-content-between gap-3">

                {/* ปุ่มลบ */}
                {/* ตรงนี้พอกด setValue มันก็ไปเพิ่ม / ลดค่าใน ฟังก์ชัน update ของ Temperatures */}
                <button className="btn btn-danger px-4" 
                onClick={() => handleChange(-1)}>
                    &minus;
                </button>

                <span className="fw-bold fs-2"> 
                    {/* ถ้า type เท่ากับคำว่า real ให้เป็นเลขทศนิยม 2 ตำแหน่ง ถ้าไม่จริงให้เป็นจำนวนเต็ม */}
                    { type === 'real' ? value.toFixed(2) : Math.floor(value || 0)} 
                </span>

                {/* ปุ่มบวก */}
                <button className="btn btn-success px-4" 
                onClick={() => handleChange(1)}> 
                + 
                </button>
            </div>

        </div>
    )

}

export default Value