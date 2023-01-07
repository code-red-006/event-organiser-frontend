import { createContext, useState } from "react";

export const SingleProgramContext = createContext(null)

function Single({children}){
    const [singleProgramDetails, setSingleProgramDetails] = useState(null);

    return(
        <>
        <SingleProgramContext.Provider value={{singleProgramDetails, setSingleProgramDetails}}>
            {children}
        </SingleProgramContext.Provider>
        </>
    )
}

export default Single