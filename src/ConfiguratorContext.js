import React, { createContext, useContext, useState } from 'react';

const ConfiguratorContext = createContext();

export const ConfiguratorProvider = ({ children }) => {
    const [state, setState] = useState({
        hierarchies: [], // ?? []
        screens: [], // ?? []
    });

    return (
        <ConfiguratorContext.Provider value={{ state, setState }}>
            {children}
        </ConfiguratorContext.Provider>
    );
};

export const useConfigurator = () => useContext(ConfiguratorContext);
