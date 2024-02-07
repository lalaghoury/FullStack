import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const AddDataProvider = ({ children }) => {
    const [addData, setAddData] = useState([]);

    return (
        <DataContext.Provider value={{ addData, setAddData }}>
            {children}
        </DataContext.Provider>
    );
};  

export const useAddData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
