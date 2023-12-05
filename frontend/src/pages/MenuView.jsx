import { useContext } from "react"
import { useParams } from "react-router-dom"
import { ClientContext } from "../hooks/contexts"


export const MenuView = () => {
    
    const socket = useContext(ClientContext)
    console.log(socket)

    return(
        <h1>HOLA</h1>
    )
}