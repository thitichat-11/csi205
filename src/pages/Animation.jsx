import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'

// import รูปภาพจาก src/img (❗ ใช้ได้เฉพาะถ้ารูปอยู่ใน src เท่านั้น)
import fieldImg from '../img/field.jpeg'
import basketballImg from '../img/basketball.png'
import footballImg from '../img/football.png'
import volleyballImg from '../img/volleyball.png'
import babyImg from '../img/student.webp'
import pinkypieImg from '../img/pinkypie.jpg'

const Animation = () => {
  const fieldWidth = 650
  const fieldHeight = 400
  const diameter = 100

  const maxLeft = fieldWidth - diameter - 2
  const maxTop = fieldHeight - diameter - 2
  const vx = 5
  const vy = 5

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [goRight, setGoRight] = useState(true)
  const [goDown, setGoDown] = useState(true)
  const [running, setRunning] = useState(false)
  const [ballImage, setBallImage] = useState(null) // รันเว็บมาให้มันขึ้นเป็นบอลของ null ไว้ก่อน

  const toggleRun = () => {
    setRunning(prev => !prev)
  }

  const updatePosition = () => {
    setX(prevX => {
      if (goRight) {
        const newX = prevX + vx
        if (newX >= maxLeft) {
          setGoRight(false)
          return maxLeft
        }
        return newX
      } else {
        const newX = prevX - vx
        if (newX <= 0) {
          setGoRight(true)
          return 0
        }
        return newX
      }
    })

    setY(prevY => {
      if (goDown) {
        const newY = prevY + vy
        if (newY >= maxTop) {
          setGoDown(false)
          return maxTop
        }
        return newY
      } else {
        const newY = prevY - vy
        if (newY <= 0) {
          setGoDown(true)
          return 0
        }
        return newY
      }
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        updatePosition()
      }
    }, 25)

    return () => clearInterval(interval)
  }, [running, goRight, goDown])

  // เปลี่ยนบอล (undefined = ยังไม่เลือก, null = None)
  const changeBall = (img) => {
    if (img === 'none') {
      setBallImage(null) // None คือสีฟ้าอ่อน
    } else {
      setBallImage(img)
    }
  }

  // เช็คปุ่ม active
  const isActive = (img) => {
    if (ballImage === undefined) return false // ยังไม่เลือกอะไรเลย ปุ่มไม่ active
    if (img === 'none') return ballImage === null
    return ballImage === img
  }

  return (
    <div className="border border-black rounded-md mx-auto mt-4 p-4 w-fit">
      <div
        className="position-relative border border-black rounded-md overflow-hidden"
        style={{
          width: `${fieldWidth}px`,
          height: `${fieldHeight}px`,
          backgroundImage: `url(${fieldImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="position-absolute rounded-circle"
          style={{
            width: `${diameter}px`,
            height: `${diameter}px`,
            left: `${x}px`,
            top: `${y}px`,
            backgroundImage: ballImage && ballImage !== null ? `url(${ballImage})` : 'none',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor:
              ballImage === null ? '#e4edf5ff' : 'transparent',
          }}
        ></div>
      </div>

      <div className="d-flex flex-wrap gap-2 mt-4">
        <Button
          variant={running ? 'warning' : 'success'}
          onClick={toggleRun}
        >
          <i className={`bi ${running ? 'bi-pause' : 'bi-play'}`} />{' '}
          {running ? 'PAUSE' : 'RUN'}
        </Button>

        <Button
          variant={isActive('none') ? 'secondary' : 'outline-secondary'}
          onClick={() => changeBall('none')}
        >
          None
        </Button>

        <Button
          variant={isActive(basketballImg) ? 'primary' : 'outline-primary'}
          onClick={() => changeBall(basketballImg)}
        >
          Basketball
        </Button>

        <Button
          variant={isActive(footballImg) ? 'primary' : 'outline-primary'}
          onClick={() => changeBall(footballImg)}
        >
          Football
        </Button>

        <Button
          variant={isActive(volleyballImg) ? 'primary' : 'outline-primary'}
          onClick={() => changeBall(volleyballImg)}
        >
          Volleyball
        </Button>

        <Button
          variant={isActive(babyImg) ? 'primary' : 'outline-primary'}
          onClick={() => changeBall(babyImg)}
        >
          Human
        </Button>

        <Button
          variant={isActive(pinkypieImg) ? 'primary' : 'outline-primary'}
          onClick={() => changeBall(pinkypieImg)}
        >
          Cartoon
        </Button>
      </div>
    </div>
  )
}

export default Animation