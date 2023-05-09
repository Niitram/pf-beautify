import { Link } from "react-router-dom"

function Nav() {
    return (
        <nav>
            <Link to={`/home`}>Home</Link>
            <Link to={`/about`}>about</Link>
            <Link to={`/products`}>products</Link>
            <Link to={`/services`}>services</Link>
            <Link to={`/detailUser`}>detailUser</Link>
            <Link to={`/dashboardAdmin`}>dashboardAdmin</Link>
            <Link to={`/cart`}>cart</Link>
        </nav>
    )
}

export default Nav