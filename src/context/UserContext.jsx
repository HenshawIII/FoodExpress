import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(()=>sessionStorage.getItem("user")!=="undefined"||null?JSON.parse(sessionStorage.getItem("user")):null);
    console.log(user);
    return (
        <UserContext value={{user, setUser}}>
            {children}
        </UserContext>
    )
}
