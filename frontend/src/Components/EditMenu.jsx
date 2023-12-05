import { useContext, useEffect } from "react"
import { ClientContext } from "../hooks/contexts"
import { useParams } from "react-router-dom"

export const EditMenu = () => {

    const { id } = useParams()
    const socket = useContext(ClientContext)

    useEffect(() => {
        
    }, [])

    return(
        <h1>Edit Menu</h1>
    )
}