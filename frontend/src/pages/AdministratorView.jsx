import { useContext } from "react"
import { ClientContext } from "../hooks/contexts"


export const AdministratorView = () => {

    const socket = useContext(ClientContext)

    return(
        <h1>Hola</h1>
    )
}