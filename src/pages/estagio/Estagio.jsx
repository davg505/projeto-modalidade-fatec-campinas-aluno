import { useEffect, useState } from 'react';
import {
  AbasDasSolicitacoes,
  BotaoTrapezio,
  BotaoTrapezioPadrao,
  MenuRetravel,
  MenuRetravelModalidade
} from '../../componetes';
import style from './Estagio.module.css';
import { buscarDadosEstagio, buscarDadosEmpresa } from '../../services/apiService';

export const Estagio = () => {
  const [dadosEstagio, setEstagio] = useState(null);
  const [dadosEmpresa, setEmpresa] = useState(null);
  const [isMenuRetravelOpen, setIsMenuRetravelOpen] = useState(false);
  const [isMenuRetravelModalidadeOpen, setIsMenuRetravelModalidadeOpen] = useState(false);

  // Carrega dados do estágio
  useEffect(() => {
    const carregarDadosEstagio = async () => {
      try {
        const dados1 = await buscarDadosEstagio();
        console.log('✅ Dados estágio:', dados1);
        setEstagio(dados1);
      } catch (error) {
        console.error('Erro ao carregar os dados do estágio:', error);
      }
    };
    carregarDadosEstagio();
  }, []);

  // Carrega dados do estágio
  useEffect(() => {
    const carregarDadosEmpresa = async () => {
      try {
        const dados1 = await  buscarDadosEmpresa();
        console.log('✅ Dados empresa:', dados1);
        setEmpresa(dados1);
      } catch (error) {
        console.error('Erro ao carregar os dados do estágio:', error);
      }
    };
    carregarDadosEmpresa();
  }, []);



  // Funções para alternar menus
  const handleBotaoTrapezioPadraoClick = () => {
    setIsMenuRetravelOpen(prev => !prev);
    setIsMenuRetravelModalidadeOpen(false);
  };

  const handleBotaoTrapezioClick = () => {
    setIsMenuRetravelModalidadeOpen(prev => !prev);
    setIsMenuRetravelOpen(false);
  };

  return (
    <div className={style.Estagio}>
      <BotaoTrapezioPadrao toggleMenu={handleBotaoTrapezioPadraoClick} />
      <BotaoTrapezio text="Estágio" toggleMenu={handleBotaoTrapezioClick} />

      {isMenuRetravelOpen && (
        <div>
          <MenuRetravel />
        </div>
      )}

      {isMenuRetravelModalidadeOpen && (
        <div>
          <MenuRetravelModalidade />
        </div>
      )}

      <div className={style.Caixa}>
      <h1 className={style.Title2}>Área Aluno: Modalidade Estágio</h1>
        
        <div className={style.Caixa}>
          { dadosEstagio ?  (
            <>
              <h2 className={style.Title2}> Dados Estágio: {dadosEstagio.solicitacao}</h2>
              
              
              {dadosEmpresa && dadosEmpresa.nome_empresa ? (
                <h2 className={style.Title2}> Dados Empresa: OK</h2>
              ) : (
                <h2 className={style.Title2}> Dados Empresa: Empresa ainda não preenchida</h2>
              )}


              {dadosEstagio.solicitacao !== "Sem Solicitação" && <AbasDasSolicitacoes />}
            </>
          ) : (
            <p>Carregando informações do estágio...</p>
          )}
        </div>
      </div>
    </div>
  );
};
