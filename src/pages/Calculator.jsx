import React, { useState, useEffect } from 'react'

const Calculator = () => {
  // State variables
  const [screen, setScreen] = useState('0')
  const [firstOperand, setFirstOperand] = useState(0)
  const [secondOperand, setSecondOperand] = useState(0)
  const [lastOperator, setLastOperator] = useState('?')
  const [state, setState] = useState('S0') // S0: ready, S1: inputting number, S2: operator pressed
  const [lastOperandUsed, setLastOperandUsed] = useState(0)

  // เปลี่ยนสีปุ่ม 
  useEffect(() => {
    // สีของปุ่มจะเปลี่ยนตาม className ที่อิงกับ lastOperator
  }, [lastOperator])
  

    // operand
  const numberClicked = (number) => {
    if (state === 'S0') {
      setScreen(number.toString())
      setState('S1')
    } else if (state === 'S1') {
      if (screen.length < 9) {
        setScreen(screen + number.toString())
      }
    } else if (state === 'S2') {
      setScreen(number.toString())
      setState('S1')
    }
  }

    // + / -
  const operatorClicked = (operator) => {
    if (state === 'S1') {
      if (lastOperator !== '?' && state !== 'S2') {
        setSecondOperand(Number(screen))
        // หลังจาก setSecondOperand แล้ว เราควรคำนวณต่อทันที
        // แต่เพราะ setState เป็น async จึงคำนวณตรงนี้เลย
        const first = firstOperand
        const second = Number(screen)
        let result = 0
        if (lastOperator === '+') {
          result = first + second
        } else if (lastOperator === '-') {
          result = first - second
        }
        setScreen(result.toString())
        setFirstOperand(result)
      } else {
        setFirstOperand(Number(screen))
      }
      setLastOperator(operator)
      setState('S2')
    } else if (state === 'S0') {
      setLastOperator(operator)
    } else if (state === 'S2') {
      setLastOperator(operator)
    }
  }

      //   =
const equalClicked = () => {
  if (lastOperator === '?') return

  const current = Number(screen)
  let result = 0

  if (state === 'S1') {
    setLastOperandUsed(current)

    if (lastOperator === '+') {
      result = firstOperand + current
    } else if (lastOperator === '-') {
      result = firstOperand - current
    }

    setScreen(result.toString())
    setFirstOperand(result)
    setState('S0')
  } else if (state === 'S0') {
    // repeat previous
    if (lastOperator === '+') {
      result = firstOperand + lastOperandUsed
    } else if (lastOperator === '-') {
      result = firstOperand - lastOperandUsed
    }

    setScreen(result.toString())
    setFirstOperand(result)
  }
}

    // CE
  const ceClicked = () => {
    setScreen('0')
    setFirstOperand(0)
    setSecondOperand(0)
    setLastOperator('?')
    setLastOperandUsed(0)
    setState('S0')
  }

  // เชื่อมคีย์บอร์ด
  useEffect(() => {
    const checkKeyboard = (event) => {
      if (event.key >= '0' && event.key <= '9') {
        numberClicked(Number(event.key))
      } else if (event.key === '+') {
        operatorClicked('+')
      } else if (event.key === '-') {
        operatorClicked('-')
      } else if (event.key === '=' || event.key === 'Enter') {
        equalClicked()
      } else if (event.key === 'Escape') {
        ceClicked()
      }
    }
    window.addEventListener('keydown', checkKeyboard)
    return () => window.removeEventListener('keydown', checkKeyboard)
  })

  // ฟังก์ชันสำหรับกำหนดสีปุ่มเครื่องหมาย
  const getOperatorClass = (operator) => {
    if (lastOperator === operator) {
      return 'bg-orange-400 text-white rounded-lg w-9 h-9'
    }
    return 'bg-teal-400 text-white rounded-lg w-9 h-9'
  }

  return (
    <div className="mx-auto mt-5 p-3 w-fit border-2 border-black rounded-2xl">
      <div
        id="screen"
        className="text-right p-2 mb-4 rounded-lg border-2 border-gray-400 bg-cyan-100 text-3xl font-sans w-64"
      >
        {screen}
      </div>

      <div className="mb-2 flex justify-center gap-2">
        <button className="bg-teal-400 text-white rounded-lg w-9 h-9 mr-1 disabled:opacity-50" disabled>
          MC
        </button>
        <button className="bg-teal-400 text-white rounded-lg w-9 h-9 mr-1 disabled:opacity-50" disabled>
          MR
        </button>
        <button className="bg-teal-400 text-white rounded-lg w-9 h-9 mr-1 disabled:opacity-50" disabled>
          M+
        </button>
        <button className="bg-teal-400 text-white rounded-lg w-9 h-9 mr-1 disabled:opacity-50" disabled>
          M−
        </button>
        <button
          className="bg-pink-300 text-white rounded-lg w-9 h-9"
          onClick={ceClicked}
        >
          CE
        </button>
      </div>

      <div className="mb-2 flex justify-center gap-2">
        <button
          className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1"
          onClick={() => numberClicked(7)}
        >
          7
        </button>
        <button
          className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1"
          onClick={() => numberClicked(8)}
        >
          8
        </button>
        <button
          className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1"
          onClick={() => numberClicked(9)}
        >
          9
        </button>
        <button className="bg-teal-400 text-white rounded-lg w-9 h-9 mr-1 disabled:opacity-50" disabled>
          ÷
        </button>
        <button className="bg-teal-400 text-white rounded-lg w-9 h-9 disabled:opacity-50" disabled>
          √
        </button>
      </div>

      <div className="mb-2 flex justify-center gap-2">
        <button
          className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1"
          onClick={() => numberClicked(4)}
        >
          4
        </button>
        <button
          className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1"
          onClick={() => numberClicked(5)}
        >
          5
        </button>
        <button
          className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1"
          onClick={() => numberClicked(6)}
        >
          6
        </button>
        <button className="bg-teal-400 text-white rounded-lg w-9 h-9 mr-1 disabled:opacity-50" disabled>
          ×
        </button>
        <button className="bg-teal-400 text-white rounded-lg w-9 h-9 disabled:opacity-50" disabled>
          %
        </button>
      </div>

      <div className="mb-2 flex justify-center gap-2">
        <button
          className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1"
          onClick={() => numberClicked(1)}
        >
          1
        </button>
        <button
          className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1"
          onClick={() => numberClicked(2)}
        >
          2
        </button>
        <button
          className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1"
          onClick={() => numberClicked(3)}
        >
          3
        </button>
        <button
          id="minus"
          className={`${getOperatorClass('-')} mr-1`}
          onClick={() => operatorClicked('-')}
        >
          −
        </button>
        <button className="bg-teal-400 text-white rounded-lg w-9 h-9 disabled:opacity-50" disabled>
          1/X
        </button>
      </div>

      <div className="mb-2 flex justify-center gap-2">
        <button
          className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1"
          onClick={() => numberClicked(0)}
        >
          0
        </button>
        <button className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1 disabled:opacity-50" disabled>
          .
        </button>
        <button className="bg-purple-300 text-white rounded-lg w-9 h-9 mr-1 disabled:opacity-50" disabled>
          +/−
        </button>
        <button
          id="plus"
          className={`${getOperatorClass('+')} mr-1`}
          onClick={() => operatorClicked('+')}
        >
          +
        </button>
        <button
          className="bg-teal-400 text-white rounded-lg w-9 h-9"
          onClick={equalClicked}
        >
          =
        </button>
      </div>

      <div className="text-center mt-3 text-lg">
        67164494 นางสาวฐิติฉัตร ศิริบุตร
      </div>
    </div>
  )
}

export default Calculator