import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = ({ products, carts, setToken }) => {
  return (
    <div className="d-flex justify-content-center gap-2">

      <Link to={"home"}>
        <Button variant="outline-warning">Home</Button>
      </Link>
      <Link to={"calculator"}>
        <Button variant="outline-success">Calculator</Button>
      </Link>
      <Link to={"animation"}>
        <Button variant="outline-info">Animation</Button>
      </Link>
      <Link to={"components"}>
        <Button variant="outline-danger">Components</Button>
      </Link>
      <Link to={"todos"}>
        <Button variant="outline-primary">Todos</Button>
      </Link>
      <Link to={"products"}>
        <Button variant="outline-warning">
          Products ({products.length})
        </Button>
      </Link>

      <Link to={"carts"}>
        <Button variant="outline-success" className="position-relative">
          Carts
          {carts.length > 0 && (
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {carts.length < 10 ? carts.length : '9+'}
              <span class="visually-hidden">unread messages</span>
            </span>
          )}
        </Button>
      </Link>

      <Link to={"logout"}>
          <Button variant="outline-danger"
          onClick={() => {setToken('')}}>
            Logout
          </Button>
      </Link>

    </div>
  );
};

export default AppNavbar;
