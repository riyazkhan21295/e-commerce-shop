const CartTable = props => {
    return (
        <table className='checkout__table' onClick={event => props.onTableClick(event)}>
            <TableHead />
            <TableBody checkoutProducts={props.checkoutProducts} />
        </table>
    );
};

const TableHead = props => {
    const style = {
        fontWeight: 400,
    };

    return (
        <thead>
            <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>
                    Price (<span className='fas fa-rupee-sign' style={style}></span>)
                </th>
                <th>Quantity</th>
                <th>
                    Total Price (<span className='fas fa-rupee-sign' style={style}></span>)
                </th>
                <th></th>
            </tr>
        </thead>
    );
};

const TableBody = props => {
    let tbody = null;
    if (props.checkoutProducts.length === 0) {
        tbody = (
            <tr style={{ textAlign: 'center' }}>
                <td colSpan='6'>Cart is Empty</td>
            </tr>
        );
    } else {
        tbody = props.checkoutProducts.map((product, index) => {
            const { id, title, price, quantity } = product;

            return (
                <tr key={id} data-product-id={id}>
                    <td>{index + 1}</td>
                    <td>{title}</td>
                    <td className='checkout__table__td--amount'>{(+price).toFixed(2)}</td>
                    <td className='checkout__table__td--quantity'>
                        <span className='icon icon--decrement fas fa-minus'></span>
                        &nbsp;&nbsp;{quantity}&nbsp;&nbsp;
                        <span className='icon icon--increment fas fa-plus'></span>
                    </td>
                    <td className='checkout__table__td--amount'>{(price * quantity).toFixed(2)}</td>
                    <td className='checkout__table__td--remove-product'>
                        <span className='icon fas fa-trash-alt'></span>
                    </td>
                </tr>
            );
        });
    }

    return <tbody>{tbody}</tbody>;
};

export default CartTable;
