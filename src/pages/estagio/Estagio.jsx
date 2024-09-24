import { useEffect, useState } from 'react';
import { AbasDasSolicitacoes, MenuDados, MenuRetravel, MenuRetravelModalidade, TabelaAluno, TabelaModalidadesEstagio } from '../../componetes';
import { UseAppContext } from "../../hooks";
import style from './Estagio.module.css';


export const Estagio = () => {

    const { carregarDadosEstagioDoTermo } = UseAppContext();
    const [termoDeEstagio, setTermoDeEstagio] = useState("");

    useEffect(() => {
        const carregarTermo = async () => {
            try {
                const termo = await carregarDadosEstagioDoTermo();
                setTermoDeEstagio(termo);
            } catch (error) {
                console.error('Erro ao carregar termo de estágio:', error);
            }
        };
        carregarTermo();
    }, [carregarDadosEstagioDoTermo]);

    return (
        <div className={style.estagio}>
            <div className={style.Menu2}>
                <MenuRetravel />
            </div>
            <div className={style.MenuEstagio}>
                <MenuRetravelModalidade />
            </div>
            <div className={style.Caixa}>
                <h1 className={style.Title2}>Área Aluno: Modalidade Estágio</h1>
                <div className={style.Caixa}>
                    <h2 className={style.Title2}>Info - {termoDeEstagio}</h2>
                    {termoDeEstagio !== "Sem Solicitação" && <AbasDasSolicitacoes />}
                </div>
                <MenuDados/>
                <TabelaAluno />
                <TabelaModalidadesEstagio />
            </div>
        </div>
    );
};