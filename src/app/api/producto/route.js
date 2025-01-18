import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eyaraedkwjgspknimmfb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YXJhZWRrd2pnc3BrbmltbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjI4MTgsImV4cCI6MjA1MjMzODgxOH0.6GEOM6YASqLMdFYTmNW7ceebdOKKxtVMQjUqlm8VWWg"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(){
    const{data: productos, error} = await supabase
    .from("producto")
    .select("id,nombre,precio,stock")
    
    return new Response(JSON.stringify(productos), {status: 200})
}

export async function POST(request){
    const body = await request.json()
    const producto = body.producto
    const{data: postData, error} = await supabase
    .from("producto")
    .insert(producto)

    return new Response(JSON.stringify({success: "Creado con éxito"}), {status: 201})
}

export async function PUT(request){
    const body = await request.json()
    const id = body.id
    const{data: updateData, error} = await supabase
    .from("producto")
    .update(body.update)
    .eq("id",id)

    return new Response(JSON.stringify({success: "Actualizado"}, {status:"200"}))
}