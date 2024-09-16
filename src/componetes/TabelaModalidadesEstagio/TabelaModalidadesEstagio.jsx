import { useEffect } from 'react';
import { UseAppContext } from "../../hooks";
import style from './TabelaModalidadesEstagio.module.css';


export const TabelaModalidadesEstagio = () => {

  const { tabelaEstagio, carregarDadosEstagio } = UseAppContext();

  useEffect(() => {
    carregarDadosEstagio();
  }, []);

  if (!tabelaEstagio ||tabelaEstagio.length === 0) {
    return <div>Carregando dados...</div>; 
  }
    return (
        <>
        <header  className={style.tabelaEstagio}>
          <h2>Estágio</h2>
        </header>
        <div className={style.tableContainer}>
          <table className={style.table}>
            <thead>
              <tr>
              {tabelaEstagio.map(item => (
                <th key={item.id} className={style.th}>{item.nomeColuna}</th>
              ))}
              </tr>
            </thead>
            <tbody>
              <tr>
              {tabelaEstagio.map(item => (
                <td key={item.id} className={style.td}>{item.dadoColuna}</td>
              ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
      );
    };