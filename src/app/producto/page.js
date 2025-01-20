'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ListProductos() {
    const [productos, setProductos] = useState([])

    async function fetchProductos() {
        const response = await fetch("/api/producto")
        const body = await response.json()
        setProductos(body)
    }

    async function actualizarStock(id, operacion) {
        const productoIndex = productos.findIndex(p => p.id === id);
        const producto = productos[productoIndex];
        
        let nuevoStock;
        if (operacion === "sumar") {
            nuevoStock = producto.stock + 1;
        } else if (operacion === "restar" && producto.stock > 0) {
            nuevoStock = producto.stock - 1;
        } else {
            return alert("El stock no puede ser negativo");
        }

    
        const updatedProductos = [...productos];
        updatedProductos[productoIndex] = { ...producto, stock: nuevoStock };
        setProductos(updatedProductos);

        const response = await fetch("/api/producto", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                update: { stock: nuevoStock }
            })
        });

        if (!response.ok) {
            alert("Hubo un error al actualizar el stock");
        }
    }

    useEffect(() => {
        fetchProductos()
    }, [])

    return (
        <div>
            <table border="1">
                <caption>Tabla de productos</caption>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Actualizar Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto =>
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.precio}</td>
                            <td style={producto.stock === 0 ? { backgroundColor: 'red' } : {}}>
                                {producto.stock}
                            </td>
                            <td>
                                <button onClick={() => actualizarStock(producto.id, "sumar")}>+</button>
                                <button onClick={() => actualizarStock(producto.id, "restar")}>-</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br />
            <Link href={"/producto/create"}>Agregar producto</Link>
        </div>
    )
}
