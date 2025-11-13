import './Carts.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Carts = ({ carts, setCarts }) => {
    return (
        <div className="carts-container p-4 m-4">
            <div className='carts-items-container'>
                {carts.map((cart) => {
                    return (
                        <Card style={{ width: '18rem' }} key={cart.id}>
                            <Card.Img variant="top" src={cart.thumbnailUrl} />
                            <Card.Body>
                                <Card.Title>
                                    <b>
                                        {cart.title}
                                    </b>
                                </Card.Title>
                                <Card.Text>${cart.price.toFixed(2)}</Card.Text>

                                <Button variant="outline-danger"
                                    onClick={() => {
                                        setCarts(carts.filter((c) => {
                                            return c.id !== cart.id
                                        }))
                                    }}>
                                    Remove from Carts
                                </Button>

                            </Card.Body>
                        </Card>
                    )
                })}

            </div>

            <div className='mt-6'>
                <h4>Items: <Button variant='outline-danger'>{carts.length}</Button> &nbsp;

                items - Total Price: &nbsp;<Button variant='outline-info'>
                ${carts.reduce((prev, cart) => {
                return prev + cart.price 
                }, 0).toFixed(2)}
                </Button>

                </h4>
            </div>

            <div className='mt-3'>
                <Button variant='outline-success'>Checkout &nbsp; <i className="bi bi-credit-card"></i></Button>
            </div>
        </div>
    )
}

export default Carts