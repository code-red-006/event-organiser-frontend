import { createContext, useState } from "react";

export const EventContext = createContext(null);

function Events({children}){
    const [eventData, setEventData] = useState(null);
    return (
        <EventContext.Provider value={{eventData, setEventData}} >
            {children}
        </EventContext.Provider>
    )
}

export default Events