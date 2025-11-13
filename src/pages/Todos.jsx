import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { fetchTodos } from '../data/todos';
import { Button } from 'react-bootstrap';

const Todos = () => {
    // todosRaw -> [filters] -> tpdos

    // to do มาเป็น array อินนิเชียลเลยต้องใส่เป็น []
    const [todosRaw, setTodosRaw] = useState([])
    const [todos, setTodos] = useState([])

    const [onlyWaiting, setOnlyWaiting] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const [curPage, setCurPage] = useState(1)
    const [numPages, setNumPages] = useState(3)

    const newIdRef = useRef()
    const newTitleRef = useRef()

    useEffect(() => {
        setTodosRaw(fetchTodos())
    }, []) // load

    useEffect(() => {
        if (onlyWaiting) setTodos(todosRaw.filter( (todo) => !todo.completed // ดูจาก data ของเรา completed มันเป็น false ถึงจะคอมพลีท
             ))
         else setTodos(todosRaw)}, [todosRaw, onlyWaiting])


    useEffect(() => {
        setNumPages(Math.ceil(todos.length / itemsPerPage))
    }, [todos, itemsPerPage])

    useEffect(() => {
        if(numPages <= 0) setCurPage(0)
        else{
            if (curPage > numPages) setCurPage(numPages)
                else if (curPage <= 0) setCurPage(1)
        }

    }, [numPages])


    const waitingClicked = (id) => {
        console.log(id)

    const selectedTodo = todosRaw.find( (todo) => {
            return todo.id === id
        } )

        selectedTodo.completed = true;

        setTodosRaw([...todosRaw])
    }



    const deleteCliced = (id) => {
        const remainTodos = todosRaw.filter( (todo) => {
            return todo.id !== id
        })

        setTodosRaw(remainTodos)
    }


    const saveClicked = (id, title) => {
        console.log(id, title)

        if(title.trim() !== ""){
            const newTodo= {
                userId: 1,
                id: id,
                title: title,
                completed: false,
            }
            
            setTodosRaw([...todosRaw, newTodo])
        }
        newIdRef.current.value = ""
        newTitleRef.current.value = ""

        handleClose()
    }



    // handle modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


        

    return ( 
        <div className='mt-7'>

        {/* Modal */}
        <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>
            <Modal.Title><i className="bi bi-plus btn btn-primary" style={{width: '50px'}}></i>&nbsp;Add todo</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
           
            <Form>
                <Form.Group className="mb-3 d-flex align-items-center gap-1" controlId="exampleForm.ControlInput1">
                {/* margin end -2 + margin bottom -0 */}
                <Form.Label className='me-2 mb-0'>ID:</Form.Label>
                <Form.Control ref={newIdRef} className='bg-secondary text-white' style={{width: '50px'}}
                    value={todosRaw.reduce( (prev, todo) => {
                        return todo.id > prev ? todo.id : prev
                    },-1) +1}
                    disabled
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title:</Form.Label>
                <Form.Control ref={newTitleRef}
                    placeholder="ใส่ todo ใหม่ตรงนี้"
                    autoFocus
                />
                </Form.Group>
            </Form>

            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => saveClicked(Number(newIdRef.current.value), newTitleRef.current.value)}>
                Save
            </Button>
            </Modal.Footer>

        </Modal>

        {/* filters */}
        <div className='d-flex align-items-center justify-content-between m-3'>
            <div className='d-flex align-items-baseline'>                
                <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                // label="Show only waiting"
                
                
                // เช็คได้ว่า e เป็น true หริอ false
                onChange={(e) => {setOnlyWaiting(e.target.checked)}}
                />
                <label htmlFor="custom-switch">
                    Show only &nbsp;
                    <Button variant='warning' style={{pointerEvents: 'none'}}>
                        waiting&nbsp; <i className="bi bi-clock"></i>
                    </Button>
                </label>
            </div>
            <Form.Select aria-label="Default select example" className='w-25'
            // ค่าเปลี่ยนที่ value เลยเป็น .value
            onChange={(e) => {setItemsPerPage(e.target.value)}}>
                {/* <option>Open this select menu</option> */}
                <option value={5}>5 items per page</option>
                <option value={10}>10 items per page</option>
                <option value={50}>50 items per page</option>
                <option value={100}>100 items per page</option>
            </Form.Select>
        </div>

        {/* table */}
        <div className='mt-3'>
            <Table striped bordered hover>
                <thead className='table-dark'>
                    <tr className='text-center'>
                        <th style={{width: '4rem'}}>
                            ID
                        </th>
                        <th className='text-center'>
                            Title
                        </th>
                        <th className='text-end' style={{width: '12rem'}}>
                            Completed &nbsp; <Button onClick={() => handleShow()}><i className="bi bi-plus"></i></Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // start = (curPage - 1) * itemsPerPage
                        //  stop = curPage * itemsPerpage - 1
                        todos.filter( (todo, index) => {
                            return index >= (curPage - 1) * itemsPerPage
                            &&
                            index <= curPage * itemsPerPage -1
                        })
                    
                        .map((todo) => {
                        return (
                            <tr key={todo.id} style={{height: '3rem'}}>
                                <td className='text-center'><Badge bg="secondary">{todo.id}</Badge></td>
                                <td>{todo.title}</td>
                                <td className='text-end'>{todo.completed ? (
                                <Badge bg='success' className='p-2'>done <i className="bi bi-check"></i></Badge>
                                ) : (
                                <Button variant='warning' onClick={() => 
                                    {waitingClicked(todo.id)}}>
                                        waiting <i className="bi bi-clock"></i></Button> )
                                } &nbsp;
                                <Button variant='danger' onClick={() => 
                                {deleteCliced(todo.id)}}>
                                    <i className="bi bi-trash"></i></Button></td>
                            </tr> 
                        )
                    })}
                </tbody>
            </Table>
        </div>

        {/* page control */}
        <div className='text-center'>
            <Button variant='outline-primary' onClick={() => setCurPage(1)} disabled={curPage <= 1}> 
                First
            </Button>&nbsp;

            <Button variant='outline-primary'
            onClick={
                () => curPage > 1 && setCurPage((p) => p - 1)} disabled={curPage <= 1}>
                Previous
            </Button>&nbsp;

            <span>{curPage}&nbsp;/&nbsp;{numPages}</span>&nbsp;

            <Button variant='outline-primary' onClick={() => 
            curPage < numPages && setCurPage((p) => p + 1)} disabled={curPage >= numPages}>
                Next
            </Button>&nbsp;

            <Button variant='outline-primary' onClick={() => setCurPage(numPages)} disabled={curPage >= numPages}>
                Last
            </Button>
        </div>
    </div> )
}
 
export default Todos