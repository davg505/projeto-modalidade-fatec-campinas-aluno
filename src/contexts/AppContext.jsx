/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppContextProvider = (props) => {
    const { children } = props;
    const [iconesAluno, setIconesAluno] = useState([
        { id: 1, sigla: 'E', nome:'Estagio', link: '/estagio' },
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

    const [tabelaEstagio, setTabelaEstagio] = useState([
        { id: 1, nomeColuna:'Status', dadoColuna:'Não solicitado' },
        { id: 2, nomeColuna:'Tipo de estágio',  dadoColuna:'Solicitado Obrigatório'},
        { id: 3, nomeColuna:'Modelo',  dadoColuna:'Remunerado' },
        { id: 4, nomeColuna:'Solicitação',  dadoColuna:'Não realizado' },
        { id: 5, nomeColuna:'Data da Solicitação',  dadoColuna:'2024-12-15' },
        { id: 6, nomeColuna:'Status do Termo',  dadoColuna:'Não enviado' },
        { id: 7, nomeColuna:'Prorrogação de período',  dadoColuna:'Não enviado' },
        { id: 8, nomeColuna:'Estágio não Obrigatório para Obrigatório',  dadoColuna:'Não enviado' },
        { id: 9, nomeColuna:'Rescisão do termo',  dadoColuna:'Não enviado' },
        { id: 10, nomeColuna:'Relatório de estágio supervisionado',  dadoColuna:'Não enviado' },
        { id: 11, nomeColuna:'Ficha de avaliação do superior imediato',  dadoColuna:'Não enviado' },

    ]);




    return (
        <AppContext.Provider
            value={{iconesAluno,
                    iconesEstagio,
                    tabelaAluno,
                    tabelaEstagio,
                }}
        >
            {children}
        </AppContext.Provider>
    );
};
