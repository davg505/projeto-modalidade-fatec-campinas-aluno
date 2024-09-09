import { UseAppContext } from "../../hooks";
import style from './TabelaModalidadesEstagio.module.css';


export const TabelaModalidadesEstagio = () => {

  const { tabelaEstagio } = UseAppContext();

  const status = tabelaEstagio.filter(item => item.id === 1);
  const tipoEstagio = tabelaEstagio.filter(item => item.id === 2);
  const modelo = tabelaEstagio.filter(item => item.id === 3);
  const solicitacao = tabelaEstagio.filter(item => item.id === 4);
  const dataSolicitacao = tabelaEstagio.filter(item => item.id === 5);
  const statusTermo = tabelaEstagio.filter(item => item.id === 6);
  const prorrogacaoPeriodo = tabelaEstagio.filter(item => item.id === 7);
  const estagioNaoObrigatorioParaObrigatorio = tabelaEstagio.filter(item => item.id === 8);
  const rescisaoTermo = tabelaEstagio.filter(item => item.id === 9);
  const relatorioEstagioSupervisionado = tabelaEstagio.filter(item => item.id === 10);
  const fichaAvaliacaoSuperior = tabelaEstagio.filter(item => item.id === 11);
    return (
        <>
        <header  className={style.tabelaEstagio}>
          <h2>Estágio</h2>
        </header>
        <div className={style.tableContainer}>
          <table className={style.table}>
            <thead>
              <tr>
              <th className={style.th}>{status.map(item => item.nomeColuna)}</th>
              <th className={style.th}>{tipoEstagio.map(item => item.nomeColuna)}</th>
              <th className={style.th}>{modelo.map(item => item.nomeColuna)}</th>
              <th className={style.th}>{solicitacao.map(item => item.nomeColuna)}</th>
              <th className={style.th}>{dataSolicitacao.map(item => item.nomeColuna)}</th>
              <th className={style.th}>{statusTermo.map(item => item.nomeColuna)}</th>
              <th className={style.th}>{prorrogacaoPeriodo.map(item => item.nomeColuna)}</th>
              <th className={style.th}>{estagioNaoObrigatorioParaObrigatorio.map(item => item.nomeColuna)}</th>
              <th className={style.th}>{rescisaoTermo.map(item => item.nomeColuna)}</th>
              <th className={style.th}>{relatorioEstagioSupervisionado.map(item => item.nomeColuna)}</th>
              <th className={style.th}>{fichaAvaliacaoSuperior.map(item => item.nomeColuna)}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td className={style.td}>{status.map(item => item.dadoColuna)}</td>
              <td className={style.td}>{tipoEstagio.map(item => item.dadoColuna)}</td>
              <td className={style.td}>{modelo.map(item => item.dadoColuna)}</td>
              <td className={style.td}>{solicitacao.map(item => item.dadoColuna)}</td>
              <td className={style.td}>{dataSolicitacao.map(item => item.dadoColuna)}</td>
              <td className={style.td}>{statusTermo.map(item => item.dadoColuna)}</td>
              <td className={style.td}>{prorrogacaoPeriodo.map(item => item.dadoColuna)}</td>
              <td className={style.td}>{estagioNaoObrigatorioParaObrigatorio.map(item => item.dadoColuna)}</td>
              <td className={style.td}>{rescisaoTermo.map(item => item.dadoColuna)}</td>
              <td className={style.td}>{relatorioEstagioSupervisionado.map(item => item.dadoColuna)}</td>
              <td className={style.td}>{fichaAvaliacaoSuperior.map(item => item.dadoColuna)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
      );
    };