import { createContext, useState } from "react";

export const ProgramContext = createContext(null)

function Program({children}){
    const [programDetails, setProgramDetails] = useState(null);

    return(
        <>
        <ProgramContext.Provider value={{programDetails, setProgramDetails}}>
            {children}
        </ProgramContext.Provider>
        </>
    )
}

export default Program;