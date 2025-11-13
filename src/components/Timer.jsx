import { useEffect, useState } from "react";

function Timer( {name} ) {
    const [second,setSecond] = useState(0)
    const [running,setRunning] = useState(false) 

    useEffect( () => {
        let interval = null
        if(running) {
            interval = setInterval( () => {
                setSecond(count => count + 1)
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [running])


    const toTimeString = (s) => {
        const MINUTE_SECONDS = 60
        const HOUR_SECONDS = 60 * MINUTE_SECONDS
        const DAY_SECONDS = 24 * HOUR_SECONDS

        const day = Math.floor(s / DAY_SECONDS)
        const hr = Math.floor((s % DAY_SECONDS) / HOUR_SECONDS)
        const min = Math.floor((s % DAY_SECONDS) / MINUTE_SECONDS)
        const sec = s % MINUTE_SECONDS

        if (day > 0) {
            return `${day}d ${hr}h ${min}m ${sec}s`
        } else if (hr > 0) {
            return `${hr}h ${min}m ${sec}s`
        } else if (min > 0) {
            return `${min}m ${sec}s`
        } else {
            return `${sec}s`
        }

    }

    const resetClicked = () => {
        setSecond(0)
        setRunning(false)
    }

    const runClicked = () => {
        setRunning(!running)
    }

    return ( 
        // container
        <div className="border border-black border-2 rounded-4 mx-auto p-3 mt-3 bg-secondary-subtle"
        style={ {width: '100%', minWidth: '300px'} }>

            {/* body */}
            <h1 className="text-primary text-center"> {name || 'TIMER'} </h1>

            {/* times */}
            <div className="border border-black border-2 rounded-3 text-end p-2 fs-4 bg-white"> {toTimeString(second)} </div>

            {/* button */}
            <div className="d-flex justify-content-between gap-3 mt-3">

                <button className="btn btn-danger" onClick={ () => {resetClicked()}}> 
                    <i className="bi bi-arrow-counterclockwise"></i> &nbsp; Reset
                </button>

                <button className={"btn " + (running ? "btn-warning" : "btn-success")} onClick={ () => {runClicked()}}> 
                <i className={running ? "bi bi-pause" : "bi bi-play"}></i> &nbsp; {running ? 'Pause' : 'Run'}
                </button>

            </div>
        </div>
     );
}

export default Timer; 