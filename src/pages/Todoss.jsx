import { useEffect, useState } from "react";
import { Badge, Button, Form, Table } from "react-bootstrap";
import { fetchTodos } from "../data/todos";


const Todos = () => {

  // ------------------------
  // | v
  // [fetchTodos] -> todosRaw -> [filters] -> todos

  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);

  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(3);
  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []); //load
  useEffect(() => {
    console.log(todosRaw);
    setTodos(todosRaw); // bypass filters
  }, [todosRaw]);
  useEffect(() => {
    console.log("onlyWaiting: " + onlyWaiting);
  }, [onlyWaiting]);
  useEffect(() => {
    console.log(`itempsPerPage: ${itemsPerPage}`);
  }, [itemsPerPage]);
  return (
    <>
      {/* filters */}
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            // label='Show only waiting'
            onChange={(e) => setOnlyWaiting(e.target.checked)}
          />
          <label htmlFor="custom-switch">
            Show only&nbsp;
            <Button variant="warning" style={{ pointerEvents: "none" }}>
              waiting&nbsp;<i className="bi bi-clock"></i>
            </Button>
          </label>
        </div>
        <Form.Select
          aria-label="Default select example"
          className="w-25"
          onChange={(e) => setItemsPerPage(e.target.value)}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </Form.Select>
      </div>
      {/* table */}
      <div className="mt-2">
        <Table striped hover>
          <thead className="table-dark">
            <tr>
              <th className="text-center" style={{ width: "4rem" }}>
                ID
              </th>
              <th className="text-center">Title</th>
              <th className="text-end" style={{ width: "12rem" }}>
                Completed&nbsp;
                <Button>
                  <i className="bi bi-plus"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td className="text-center">
                    <Badge bg="secondary">{todo.id}</Badge>
                  </td>
                  <td>{todo.title}</td>
                  <td className="text-end">
                    {todo.completed ? (
                      <Badge bg="success">
                        done&nbsp;<i className="bi bi-check"></i>
                      </Badge>
                    ) : (
                      <Button variant="warning">
                        waiting&nbsp;<i className="bi bi-clock"></i>
                      </Button>
                    )}
                    &nbsp;
                    <Button variant="danger">
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {/* page control */}
      <div className="text-center mt-2">
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(1)}
          disabled={curPage <= 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
          disabled={curPage <= 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage < numPages && setCurPage((p) => p + 1)}
          disabled={curPage >= numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => {
            setCurPage(numPages);
          }}
          disabled={curPage >= numPages}
        >
          Last
        </Button>
      </div>
    </>
  );
};
export default Todos;
