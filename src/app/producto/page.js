"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ListProductos(){
    const[productos,setProductos] = useState([])

    async function fetchProductos(){
        const response = await fetch("/api/producto")
        const body = await response.json()
        setProductos(body)
    }

    useEffect(() => {
        fetchProductos()
    },[])

    return(
        <div>
            <table border="1">
                <caption>Tabla de productos</caption>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                    <tbody>
                        {productos.map(producto => 
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td style= {producto.stock === 0 ? { backgroundColor: 'red'} : {}}>
                                    {producto.stock}
                                </td>
                                <td><button>Actualizar stock</button></td>
                            </tr>
                        )}
                    </tbody>
            </table>
            <br/>
            <Link href={"/producto/create"}>Agregar producto</Link>
        </div>
    )
}