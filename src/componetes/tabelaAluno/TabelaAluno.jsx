import { UseAppContext } from "../../hooks";
import style from './TabelaAluno.module.css';

export const TabelaAluno = () => {

  const { tabelaAluno } = UseAppContext();

  const nomeAluno = tabelaAluno.filter(item => item.id === 1);
  const email = tabelaAluno.filter(item => item.id === 2);
  const ra = tabelaAluno.filter(item => item.id === 3);
  const curso = tabelaAluno.filter(item => item.id === 4);
  const status = tabelaAluno.filter(item => item.id === 5);
  const modalidade = tabelaAluno.filter(item => item.id === 6);

  return (
    <>
    <header  className={style.tabelaAluno}>
      <h2>Aluno</h2>
    </header>
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.th}>{nomeAluno.map(item => item.nomeColuna)}</th>
            <th className={style.th}>{email.map(item => item.nomeColuna)}</th>
            <th className={style.th}>{ra.map(item => item.nomeColuna)}</th>
            <th className={style.th}>{curso.map(item => item.nomeColuna)}</th>
            <th className={style.th}>{status.map(item => item.nomeColuna)}</th>
            <th className={style.th}>{modalidade.map(item => item.nomeColuna)}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={style.td}> {nomeAluno.map(item => item.dadoColuna)} </td>
            <td className={style.td}> {email.map(item => item.dadoColuna)} </td>
            <td className={style.td}> {ra.map(item => item.dadoColuna)} </td>
            <td className={style.td}> {curso.map(item => item.dadoColuna)} </td>
            <td className={style.td}> {status.map(item => item.dadoColuna)} </td>
            <td className={style.td}> {modalidade.map(item => item.dadoColuna)} </td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
  );
};