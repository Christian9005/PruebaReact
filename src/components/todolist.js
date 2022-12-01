import { useEffect, useState } from "react";
import clientHttp from "../services/client";

export const ToDoList=()=>{
    const [titulo,setTitulo]= useState('');
    const [lista, setLista] = useState([]);
    const [post, setPost] = useState([]);
    useEffect(()=>{
        clientHttp.get(`/?id_author=14`)
        .then((response)=>{
            setLista(response.data.data)
        })
        
    },[]);

    const handlerOnchange=(event)=>{
        setTitulo(event.target.value);
    }
    
    const handlerClick=(event)=>{
        console.log(titulo);
        const body = {
            "description": titulo,
            "status": 1,
            "id_author": 14,
            "finish_at": "2022-06-03T21:47:23.000Z"
        };
        clientHttp.post(`/?id_author=14`,body)
        .then((response)=>{
            console.log(response.data);
            setPost(response.data)
        })

    }

    return(
        <div align='center'>
        <h1 style={{color:'#368EF5'}}>TODO LIST</h1>
        <input type='text' value={titulo} onChange={(e)=>handlerOnchange(e)}
            style={{
            padding: '15px 32px',
            fontSize: '15px',
            borderRadius:'6px',
            border: '2px solid #D6D3E3'
        }}></input>
        <button style={{backgroundColor:'#368EF5',
                            border: 'none',
                            borderRadius:'6px',
                            color:'white',
                            padding: '15px 32px',
                            fontSize: '15px'
                            }} 
                            onClick={(e)=>handlerClick(e)} >Agregar</button>
        <div align='center'>
            
                {lista.map((lis)=>
                <div  style={{backgroundColor:'#f1f0f7',padding: '10px 10px',heigth:'20px', width:'400px'}} 
                key={lis.id}>
                <input type='checkbox'></input>
                    {lis.description}
                <button style={{backgroundColor:'#368EF5',
                            border: 'none',
                            borderRadius:'6px',
                            color:'white',
                            padding: '15px 32px',
                            fontSize: '15px'
                            }}
                >Eliminar</button>
                </div>)}
            
        </div>
        </div>
        
    );
}