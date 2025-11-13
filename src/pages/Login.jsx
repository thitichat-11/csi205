import { useRef, useState } from 'react'
import { verifyUser } from '../data/users'
import './Login.css'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'



const Login = ({ setToken, setRole }) => {


    const userRef = useRef()
    const passRef = useRef()

    
    // tooltip
    const [showUserTip, setShowUserTip] = useState(false)
    const [showPassTip, setShowPassTip] = useState(false)


    return (
        <div className="login-container text-center mt-10">

            <h1 className="text-3xl font-bold mb-6">WELCOME</h1>


            <h3 className="text-green-600 mb-8">LOG IN</h3>



            {/* user */}
            <div
                className="relative inline-block mb-4"
                onMouseEnter={() => setShowUserTip(true)}
                onMouseLeave={() => setShowUserTip(false)}>

                <InputGroup>
                    <InputGroup.Text id="username">
                        <i className="bi bi-person-fill"></i>
                    </InputGroup.Text>

                    <Form.Control
                        type="text"
                        placeholder="Username"
                        ref={userRef}
                        className="focus:ring-2 focus:ring-green-400"
                    />
                </InputGroup>


                {showUserTip && (
                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-700 text-white text-sm rounded px-2 py-1
                    transition-all duration-200 whitespace-nowrap">
                        Username: user
                    </span>
                )}

            </div>



            {/* pass */}
            <div className="relative inline-block mb-4"
                onMouseEnter={() => setShowPassTip(true)}
                onMouseLeave={() => setShowPassTip(false)}>

                <InputGroup>
                    <InputGroup.Text id="password">
                        <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>
                    
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        ref={passRef}
                    />
                </InputGroup>


                {showPassTip && (
                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-700 text-white text-sm rounded px-2 py-1
                    transition-all duration-200 whitespace-nowrap">
                        Password: pass
                    </span>
                )}

            </div>



            {/* ปุ่ม */}
            <button className="btn btn-success mt-4"
                onClick={() => {
                    const user = userRef.current.value.trim()
                    const pass = passRef.current.value.trim()
                    userRef.current.value = ''
                    passRef.current.value = ''

                    const userInfo = verifyUser(user, pass)
                    if (userInfo === null) {
                        alert('Wrong username or password')
                        userRef.current.focus()
                    } else {
                        setToken(userInfo.token)
                        setRole(userInfo.role)
                    }

                }}>
                Login
            </button>


        </div>
    )
}

export default Login