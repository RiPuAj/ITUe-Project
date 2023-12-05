import { createContext } from "react"
import { useSocket } from "./useSocketClient"

export const ClientContext = createContext()

export const ClientProvider = ({children}) =>{

    const socket = useSocket()

    return(
        <ClientContext.Provider value={socket}>
            {children}
        </ClientContext.Provider>
    )
}