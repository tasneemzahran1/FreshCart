import { createContext } from "react";

export let counterContext = createContext()
export default function CounterContextProvider(props) {





    return <counterContext.Provider value={{createContext}}>
        {props.children}
    </counterContext.Provider>
}
