import { useEffect, useState } from 'react';
import { AbasDasSolicitacoesIc, 
    BotaoTrapezio, 
    BotaoTrapezioPadrao, 
    MenuRetravel, 
    MenuRetravelModalidadeic 
} from '../../componetes';
import { UseAppContext } from "../../hooks";
import style from './IniciacaoCientifica.module.css';




export const IniciacaoCientifica = () => {
    const { carregarDadosEstagioDoTermo } = UseAppContext();
    const [termoDeEstagio, setTermoDeEstagio] = useState("");
    const [isMenuRetravelOpen, setIsMenuRetravelOpen] = useState(false);
    const [isMenuRetravelModalidadeOpen, setIsMenuRetravelModalidadeOpen] = useState(false);

    useEffect(() => {
        const carregarTermo = async () => {
            try {
                const termo = await statusModalidadeAluno();
                setTermoDeEstagio(termo);
            } catch (error) {
                console.error('Erro ao carregar termo de estágio:', error);
            }
        };
        carregarTermo();
    }, [carregarDadosEstagioDoTermo]);

    // Função para abrir o MenuRetravel e fechar o MenuRetravelModalidade
    const handleBotaoTrapezioPadraoClick = () => {
        setIsMenuRetravelOpen(prev => !prev); // Alterna a visibilidade
        setIsMenuRetravelModalidadeOpen(false); // Fecha o outro menu
    };

    // Função para abrir o MenuRetravelModalidade e fechar o MenuRetravel
    const handleBotaoTrapezioClick = () => {
        setIsMenuRetravelModalidadeOpen(prev => !prev); // Alterna a visibilidade
        setIsMenuRetravelOpen(false); // Fecha o outro menu
    };

    return (
        <div className={style.Estagio}>
            <BotaoTrapezioPadrao 
                toggleMenu={handleBotaoTrapezioPadraoClick} // Adiciona a lógica de clique
            />  
            <BotaoTrapezio 
                text="I.Cientifica" 
                toggleMenu={handleBotaoTrapezioClick} // Adiciona a lógica de clique
            />

            {isMenuRetravelOpen && (
                <div>
                    <MenuRetravel />
                </div>
            )}

            {isMenuRetravelModalidadeOpen && (
                <div>
                    <MenuRetravelModalidadeic />
                </div>
            )}

            <div className={style.Caixa}>
                <h1 className={style.Title2}>Área Aluno: Modalidade I.Cientifica</h1>
                <div className={style.Caixa}>
                    <h2 className={style.Title2}>Info - {termoDeEstagio}</h2>
                    {termoDeEstagio !== "Sem Solicitação" && <AbasDasSolicitacoesIc />}
                </div>
            </div>
        </div>
    );
};
