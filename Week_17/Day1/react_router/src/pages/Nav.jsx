import React from "react"
import { Routes } from "react-router-dom"

export default function Nav(){
return(
<header>
        <nav style={{ display: "flex", gap: "10px" }}>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/shop">Shop</Link>
        </nav>
    </header>
    )
}