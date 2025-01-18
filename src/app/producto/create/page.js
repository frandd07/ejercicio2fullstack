"use client"

import { useState } from "react"

export default function CreateProducto(){
    const[nombre,setNombre] = useState("")
    const[descripcion,setDescripcion] = useState("")
    const[precio,setPrecio] = useState("")
    const[stock,setStock] = useState("")

    async function crearProducto(e){
        e.preventDefault();

        if(nombre !== "" && precio !== "" && stock !== ""){
            if (stock < 0) {
                alert("El stock no puede ser negativo")
                return
            }

            if (precio < 0) {
                alert("El precio no puede ser negativo")
                return
            }
    
            const response = await fetch("/api/producto", {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    producto: {
                        nombre: nombre,
                        descripcion: descripcion.trim() === "" ? "NULL" : descripcion,
                        precio: precio,
                        stock: stock
                    }
                })
            })
    
            if(response.ok){
                alert("Producto creado")
                setNombre("")
                setDescripcion("")
                setPrecio("")
                setStock("")
            }else{
                alert("ERROR")
            }
        }else{
            alert("Completa los campos obligatorios (nombre, precio, stock)")
        }

       
    }

    return(
        <div>
            <h1>Añadir productos</h1>
            <form onSubmit={crearProducto}>
                <label>
                    Nombre 
                    <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    />
                </label>
                <br/>
                <label>
                    Descripcion
                    <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Precio
                    <input
                    type="number"
                    value={precio}
                    min={0}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                    />
                </label>
                <br/>
                <label>
                    Stock
                    <input
                    type="number"
                    value={stock}
                    min={0}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    />
                </label>
                <br/>
                <input type="submit" value="Crear"></input>
            </form>
        </div>
    )
}