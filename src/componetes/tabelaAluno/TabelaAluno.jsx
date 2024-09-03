import style from './TabelaAluno.module.css';

export const TabelaAluno = () => (
  <>
    <header  className={style.tabelaAluno}>
      <h2>Aluno</h2>
    </header>
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.th}>Nome do aluno</th>
            <th className={style.th}>Email</th>
            <th className={style.th}>Ra</th>
            <th className={style.th}>Curso</th>
            <th className={style.th}>Status</th>
            <th className={style.th}>Modalidade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={style.td}>Aluno</td>
            <td className={style.td}>aluno@fatec.br</td>
            <td className={style.td}>1000016816561</td>
            <td className={style.td}>GTI</td>
            <td className={style.td}>Sem solicitação</td>
            <td className={style.td}>Sem definição</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);