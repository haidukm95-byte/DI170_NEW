import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function Product() { 
    const { product_id } = useParams();
    const navigate = useNavigate();
    useEffect(() => { 
        setTimeout(() => { 
            navigate('/home')
        }, 5 * 1000)
    })

    return (
        <div>
            <h2>Product #{product_id}</h2>
            <Link to="/shop">Continue Shopping</Link>
            <button onclick={()=>navigate('/')}>Go Back to Homepage</button>
        </div>
    )
}