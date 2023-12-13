// Done by Javier Pulido

import { io } from "socket.io-client"
import { useEffect, useState } from "react"

const URL_SERVER = 'http://localhost:3000'

export const useSocket = () => {

    const [socket, setSocket] = useState()

    useEffect(() => {
        if(!socket){
            const newSocket = io(URL_SERVER)
            setSocket(newSocket)
        }
    }, [])


    return(
        socket
    )
}