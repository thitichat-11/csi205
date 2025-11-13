// react dependencies

// user components

// stylesheets
// import './App.css'
import Value from '../components/Value'
import Adder from '../components/Adder'
import { useState } from 'react'
import Timer from '../components/Timer'
import Temperatures from '../components/Temperatures'
import GreenImg from '../img/greenver.jpg'

const Components = () => {
    const [counter, setCounter] = useState(0)

    return ( 
        <div className='border border-black border-2 mt-5 rounded-3 mx-auto p-4'
        style={ {          
          maxWidth: '1300px',
          backgroundImage: `url(${GreenImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>

            <h1 className='text-center fw-bold mt-5'> REACT COMPONENTS </h1>

                                {/* แนวตั้ง / แนวนอน */}
        <div className='d-flex align-items-center justify-content-center mt-3' style={{gap: '15px'}}>

            <div className='d-flex flex-column' style={{ textAlign: 'center' }}>
                <Value name={'COUNTER'} value={counter} setValue={setCounter} />
                <Timer />
            </div>

            <div>
                <Adder name={'ADD'} />
            </div>
               
        </div>
                <Temperatures />

      <h2 className='text-center fw-bold mt-4 mb-5'>67164494 นางสาวฐิติฉัตร ศิริบุตร</h2>
        </div>
     );
}
 
export default Components;