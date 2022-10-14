import React, { useEffect, useState } from "react";
// import { Web3Storage } from "web3.storage";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import { createContext } from "react";


export const APIcontext = createContext()

function StorageWeb3(props) {
    const [client, setClient] = useState([])

    useEffect(() => {
        async function Storage3() {

            const client = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN })
            setClient(client);
        }
        Storage3()
    }, [])
    
    return (
        <APIcontext.Provider value={{ client: client, ...props }}>
            {props.children}
        </APIcontext.Provider>
    )

}


export default StorageWeb3;