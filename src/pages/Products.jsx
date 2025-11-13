import './Products.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Products = ({ products, carts, setCarts }) => {
    return (
        <div className="products-container p-4 m-4">
            <div className='products-items-container'>
                {products.map((product) => {
                    return (                       
                        <Card style={{ width: '18rem' }} key={product.id}>
                            <Card.Img variant="top" src={product.thumbnailUrl} />
                            <Card.Body>
                                <Card.Title>
                                    <b>
                                        {product.title}
                                    </b>
                                </Card.Title>
                                <Card.Text>${product.price.toFixed(2)}</Card.Text>

                                {carts.find( (cart) => {
                                    return cart.id === product.id
                                }) ? (<span className='badge bg-danger'>Added</span>) : 
                                (
                                    <Button variant="outline-primary" 
                                    onClick={ () => {
                                        setCarts([...carts, product])
                                    }}>
                                        Add to Carts
                                    </Button>
                                ) }


                            </Card.Body>
                        </Card>
                    )
                })}

            </div>
        </div>
    )
}

export default Products