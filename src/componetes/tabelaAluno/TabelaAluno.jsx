import { useEffect } from 'react';
import { UseAppContext } from "../../hooks";
import style from './TabelaAluno.module.css';

export const TabelaAluno = () => {

  const { tabelaAluno, carregarTabelaAluno } = UseAppContext();


  useEffect(() => {
    carregarTabelaAluno();
  }, []);


  if (!tabelaAluno || tabelaAluno.length === 0) {
    return <div>Carregando dados...</div>; // Exibe mensagem enquanto os dados estão sendo carregados
  }


  return (
    <>
      <header className={style.tabelaAluno}>
        <h2>Aluno</h2>
      </header>
      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead>
            <tr>
              {tabelaAluno.map(item => (
                <th key={item.id} className={style.th}>{item.nomeColuna}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {tabelaAluno.map(item => (
                <td key={item.id} className={style.td}>{item.dadoColuna}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};