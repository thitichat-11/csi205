import { useState } from "react"
import Value from "./Value"


const Temperatures = () => {
    //  getter / setter ไว้เปลี่ยนค่า
    const [celsius,setCelsius] = useState(25)
    const [fahrenheit,setFahrenheit] = useState(77)
    const [kelvin,setKelvin] = useState(298.15)


    // ฟังก์ชันอัพเดตทั้งหมดแค่ประกาศเฉยๆ จะถูกเรียกใช้งานตอนที่เรียกตรง footer
    
    const updateFromCelsius = (c) => {
        setCelsius(c)
        setFahrenheit(c * 9/5 + 32)
        setKelvin(c + 273.15)
    }

    const updateFromFahrenheit = (f) => {
        // f คือค่าที่จะถูกส่งเข้ามาเวลาเรียกใช้ฟังก์ชันนี้
        const c = (f - 32) * 5/9
        setCelsius(c)
        setFahrenheit(f)
        setKelvin(c + 273.15)
    }

    const updateFromKelvin = (k) => {
        const parsed = parseFloat(k) // แปลงสตริงเป็นเลขทศนิยม
        if (isNaN(parsed) || parsed < 0) return // ป้องกันค่าติดลบ เพราะ kelvin มันติดลบไม่ได้ ถ้าตรงตามเงื่อนไขให้ return คือหยุดฟังก์ชันเลย

        const c = parsed - 273.15
        setKelvin(parsed)
        setCelsius(c)
        setFahrenheit(c * 9/5 + 32)
    }
    

    return (
        
        // container
        <div className="border border-black border-2 rounded-4 mx-auto p-3 mt-3 bg-white"
        style={ {maxWidth: '80%',width: '100%'} }>

            {/* header */}
            <h1 className="text-center text-primary"> TEMPERATURES </h1>

            {/* body */}
            <div className="d-flex justify-content-around mt-3">
                <span className="btn btn-primary fw-semibold"> {celsius.toFixed(2)} °C </span>
                <span className="btn btn-primary fw-semibold"> {fahrenheit.toFixed(2)} °F </span>
                <span className="btn btn-primary fw-semibold"> {kelvin.toFixed(2)} K </span>
            </div>

            {/* footer */}
            <div className="d-flex justify-content-between gap-3">
                <Value name={'CELSIUS'} value={celsius} setValue={updateFromCelsius} type="real" />
                <Value name={'FAHRENHEIT'} value={fahrenheit} setValue={updateFromFahrenheit} type="real" />
                <Value name={'KELVIN'} value={kelvin} setValue={updateFromKelvin} type="real"  />
            </div>

        </div>
    )
}
export default Temperatures