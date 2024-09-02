/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppContextProvider = (props) => {
    const { children } = props;
    const [iconesAluno, setIconesAluno] = useState([
        { id: 1, sigla: 'E', nome:'Estagio' },
        { id: 2, sigla: 'IC', nome:'Iniciação Cientifica' },
        { id: 3, sigla: 'EP', nome:'Equivalencia Profissional'},
        { id: 4, sigla: 'MA', nome:'Meus Avisos' },
        { id: 5, sigla: 'MD', nome:'Meus dados' },
        { id: 6, sigla: 'T', nome:'Tutorial' },

        
    ]);


    return (
        <AppContext.Provider
            value={{iconesAluno,}}
        >
            {children}
        </AppContext.Provider>
    );
};
