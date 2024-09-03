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
    
    const [iconesEstagio, setIconesEstagio] = useState([
        { id: 1, sigla: 'SE', nome:'Solicitar Estágio' },
        { id: 2, sigla: 'ES', nome:'Enviar Solicitação' },
        { id: 3, sigla: 'CS', nome:'Cancelar Solicitação'},
        { id: 4, sigla: 'PP', nome:'Prorrogação de período' },
        { id: 5, sigla: 'EO', nome:'Não Obrigatório para Obrigatório' },
        { id: 6, sigla: 'RT', nome:'Rescisão do termo' },
        { id: 7, sigla: 'RE', nome:'Relatório de estágio' },
        { id: 8, sigla: 'FA', nome:'Ficha de avaliação' },
        { id: 9, sigla: 'FE', nome:'Finalização do Estágio' },

        
    ]);


    return (
        <AppContext.Provider
            value={{iconesAluno,
                    iconesEstagio,
                }}
        >
            {children}
        </AppContext.Provider>
    );
};
