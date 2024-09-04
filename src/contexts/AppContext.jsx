/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppContextProvider = (props) => {
    const { children } = props;
    const [iconesAluno, setIconesAluno] = useState([
        { id: 1, sigla: 'E', nome:'Estagio', link: '/projeto-modalidade-fatec-campinas-aluno/estagio' },
        { id: 2, sigla: 'IC', nome:'Iniciação Cientifica', link: '/estagio' },
        { id: 3, sigla: 'EP', nome:'Equivalencia Profissional' , link: '/estagio'},
        { id: 4, sigla: 'MA', nome:'Meus Avisos', link: '/estagio' },
        { id: 5, sigla: 'MD', nome:'Meus dados',  link: '/estagio' },
        { id: 6, sigla: 'T', nome:'Tutorial',  link: '/estagio' },

        
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

    const [tabelaAluno, setTabelaAluno] = useState([
        { id: 1, nomeColuna:'Nome do aluno', dadoColuna:'Aluno' },
        { id: 2, nomeColuna:'Email',  dadoColuna:'aluno@fatec.br' },
        { id: 3, nomeColuna:'Ra',  dadoColuna:'1000016816561' },
        { id: 4, nomeColuna:'Curso',  dadoColuna:'GTI' },
        { id: 5, nomeColuna:'Status',  dadoColuna:'Sem solicitação' },
        { id: 6, nomeColuna:'Modalidade',  dadoColuna:'Sem definição' },  
    ]);
    return (
        <AppContext.Provider
            value={{iconesAluno,
                    iconesEstagio,
                    tabelaAluno,
                }}
        >
            {children}
        </AppContext.Provider>
    );
};
