/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { Api } from '../services/Api';

export const AppContext = createContext({});



export const AppContextProvider = (props) => {
    const { children } = props;

    const [tabelaAluno, setTabelaAluno] = useState([]);

    const [tabelaEstagio, setTabelaEstagio] = useState([]);

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
        { id: 2, sigla: 'ES', nome:'Editar Solicitação'},
        { id: 3, sigla: 'CS', nome:'Cancelar Solicitação'},
        { id: 4, sigla: 'PP', nome:'Prorrogação de período' },
        { id: 5, sigla: 'EO', nome:'Não Obrigatório para Obrigatório' },
        { id: 6, sigla: 'RT', nome:'Rescisão do termo' },
        { id: 7, sigla: 'RE', nome:'Relatório de estágio' },
        { id: 8, sigla: 'FA', nome:'Ficha de avaliação' },
        { id: 9, sigla: 'FE', nome:'Finalização do Estágio' },
    
    ]);
    
    // Editar Solicitacao Estagio
    const editarSolicitacaoEstagio = async (solicitacao) => {

        const { data: alunoData } = await Api.get('/aluno'); 
        if (!alunoData || alunoData.length === 0) {
            throw new Error('Nenhum aluno encontrado');
        }
        const aluno = alunoData[0];

        const { data: estagioData } = await Api.get('/estagio'); 
        if (!estagioData || estagioData.length === 0) {
            throw new Error('Nenhum estágio encontrado');
        }
        const estagio = estagioData[0];

        try {
            const editadoSolicitacao = {
                ...solicitacao,
                alunoId:aluno.id,
            };

            const estagioAlteracao = {
                ...estagio,
                TipoDeEstagio: solicitacao.estagioTipo,
                modelo: solicitacao.estagioModelo,
            };

            const response = await Api.put('/entradaSolitacao', editadoSolicitacao);
            const response1 = await Api.put(`/estagio/${estagio.id}`,  estagioAlteracao);

            console.log('Solicitação enviada com sucesso:', response.data, response1 );
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
        }
    };

    // Nova entrada de solicação
    const adicionarSolicitacaoEstagio = async (solicitacao) => {

        const { data: alunoData } = await Api.get('/aluno'); 
        if (!alunoData || alunoData.length === 0) {
            throw new Error('Nenhum aluno encontrado');
        }
        const aluno = alunoData[0];

        const { data: estagioData } = await Api.get('/estagio'); 
        if (!estagioData || estagioData.length === 0) {
            throw new Error('Nenhum estágio encontrado');
        }
        const estagio = estagioData[0];

        try {
            const novaSolicitacao = {
                ...solicitacao,
                alunoId:aluno.id,
            };

            const alunoAlteracao = {
                ...aluno,
                status:'Enviado Solicitação',
                modalidade:'Estágio',
            };

            const estagioAlteracao = {
                ...estagio,
                TipoDeEstagio: solicitacao.estagioTipo,
                modelo: solicitacao.estagioModelo,
            };

            const response = await Api.post('/entradaSolitacao', novaSolicitacao);
            const response1 = await Api.put(`/aluno/${aluno.id}`,  alunoAlteracao);
            const response2 = await Api.put(`/estagio/${estagio.id}`,  estagioAlteracao);

            console.log('Solicitação enviada com sucesso:', response.data, response1, response2);
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
        }
    };

    const carregarTabelaAluno = async () => {
        try {
            const { data } = await Api.get('/aluno'); // Buscando os dados da API
            const aluno = data[0]; // Assumindo que a API retorna um array com um único objeto
            setTabelaAluno([
                { id: 1, nomeColuna: 'Nome do aluno', dadoColuna: aluno.nomeDoAluno },
                { id: 2, nomeColuna: 'Email', dadoColuna: aluno.email },
                { id: 3, nomeColuna: 'Ra', dadoColuna: aluno.ra },
                { id: 4, nomeColuna: 'Curso', dadoColuna: aluno.curso },
                { id: 5, nomeColuna: 'Status', dadoColuna: aluno.status },
                { id: 6, nomeColuna: 'Modalidade', dadoColuna: aluno.modalidade },
            ]);
        } catch (error) {
            console.error('Erro ao carregar dados do aluno:', error);
        }
    };


    const carregarDadosEstagio = async () => {
        try {
            const { data } = await Api.get('/estagio');
            const estagio = data[0];
            setTabelaEstagio([
                { id: 1, nomeColuna:'Status', dadoColuna: estagio.status },
                { id: 2, nomeColuna:'Tipo de estágio',  dadoColuna:estagio.TipoDeEstagio},
                { id: 3, nomeColuna:'Modelo',  dadoColuna: estagio.modelo  },
                { id: 4, nomeColuna:'Solicitação',  dadoColuna: estagio.solicitacao  },
                { id: 5, nomeColuna:'Data da Solicitação',  dadoColuna: estagio.dataSolicitacao },
                { id: 6, nomeColuna:'Status do Termo',  dadoColuna: estagio.statusDoTermo  },
                { id: 7, nomeColuna:'Prorrogação de período',  dadoColuna: estagio.prorrogacaoPeriodo },
                { id: 8, nomeColuna:'Transição obrigatorio',  dadoColuna:estagio.transicaoDoObrigatorio },
                { id: 9, nomeColuna:'Rescisão do termo',  dadoColuna: estagio.rescisaoTermo },
                { id: 10, nomeColuna:'Relatório de estágio',  dadoColuna: estagio.relatorioEstagio},
                { id: 11, nomeColuna:'Ficha de avaliação',  dadoColuna: estagio.FichaAvaliacao  },
            ]);
        }catch (error) {
            console.error('Erro ao carregar dados do estagio:', error);
        }
    };

    const cancelarSolicitacaoEstagio = async () => {

        const { data: alunoData } = await Api.get('/aluno'); 
        if (!alunoData || alunoData.length === 0) {
            throw new Error('Nenhum aluno encontrado');
        }
        const aluno = alunoData[0];

        const { data: estagioData } = await Api.get('/estagio'); 
        if (!estagioData || estagioData.length === 0) {
            throw new Error('Nenhum estágio encontrado');
        }
        const estagio = estagioData[0];

        
        try {
            const alunoAlteracao = {
                ...aluno,
                status:'Cancelado Solicitação',
                modalidade:'Não realizado',
            };

            const estagioAlteracao = {
                ...estagio,
                TipoDeEstagio:'Sem definição',
                modelo:'Sem definição',
            };

            const response1 = await Api.put(`/aluno/${aluno.id}`,  alunoAlteracao);
            const response2 = await Api.put(`/estagio/${estagio.id}`,  estagioAlteracao);

            console.log('Solicitação enviada com sucesso:', response1, response2);
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
        }



    };

    
    return (
        <AppContext.Provider
            value={{iconesAluno,
                    iconesEstagio,
                    tabelaAluno,
                    tabelaEstagio,
                    adicionarSolicitacaoEstagio,
                    carregarTabelaAluno,
                    carregarDadosEstagio,
                    editarSolicitacaoEstagio,
                    cancelarSolicitacaoEstagio,
                }}
        >
            {children}
        </AppContext.Provider>
    );
};
