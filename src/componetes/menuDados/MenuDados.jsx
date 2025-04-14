import { useEffect, useState } from "react";
import { UseAppContext } from "../../hooks";
import style from './MenuDados.module.css';
import { buscarDadosAluno } from '../../services/apiService';

export const MenuDados = () => { 

    const [showMenu, setShowMenu] = useState(false);
    const [listaMeusDados, setListaMeusDados] = useState([]);  // Estado para armazenar listaMeusDados
    const [selectedId, setSelectedId] = useState(null);  // Estado para armazenar o id selecionado
    const { tabelaAluno, tabelaEstagio } = UseAppContext();
    const [aluno, setAluno] = useState(null);

    // Função para carregar listaMeusDados
    const carregarListaMeusDados = async () => {
        try {
            setListaMeusDados([
                { id: 1, nomeColuna: 'Meus Dados' },
                { id: 2, nomeColuna: 'Dados do Estágio' },
                { id: 3, nomeColuna: 'Dados da Empresa' }
            ]);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };
      useEffect(() => {
        const carregarDados = async () => {
          try {
            const dados = await buscarDadosAluno();
            setAluno(dados);
          } catch (error) {
            console.error('Erro ao carregar o perfil do aluno:', error);
          }
        };
    
        carregarDados();
      }, []);

    useEffect(() => {
        carregarListaMeusDados();  // Carrega a lista de Meus Dados
    }, []);

    // Função para alternar o menu e carregar os dados correspondentes
    const handleClick = (id) => {
        setShowMenu(true);
        setSelectedId(id);  // Define o id do botão selecionado
        if (id === 1) {
            buscarDadosAluno();  // Carrega os dados do aluno
        } else if (id === 2) {
            buscarDadosAluno();  // Carrega os dados do estágio
        }
    };

    return (
        <div>
            {/* Gera um botão para cada item de listaMeusDados */}
            {listaMeusDados.map(item => (
                <button
                    key={item.id}
                    onClick={() => handleClick(item.id)}  // Chama handleClick com o id correto
                    className={style.botaoDados}
                >
                    {item.nomeColuna}
                </button>
            ))}

            {/* O menu de edição aparece se showMenu for true */}
            {showMenu && (
                <div className={style.Menu}>
                    <button className={style.botaoDadosEditar}> Editar </button>
                    <div>
                        {/* Se o id selecionado for 1, exibe tabelaAluno */}
                        {selectedId === 1 && aluno && (
                        <>
                            <div className={style.dadosItem}>
                                <p><strong>Nome:</strong></p>
                                <p>{aluno.nome_do_aluno}</p>
                            </div>
                            <div className={style.dadosItem}>
                                <p><strong>Email:</strong></p>
                                <p>{aluno.email}</p>
                            </div>
                            <div className={style.dadosItem}>
                                <p><strong>RA:</strong></p>
                                <p>{aluno.ra}</p>
                            </div>
                            <div className={style.dadosItem}>
                                <p><strong>Curso:</strong></p>
                                <p>{aluno.curso}</p>
                            </div>
                            <div className={style.dadosItem}>
                                <p><strong>Status:</strong></p>
                                <p>{aluno.status}</p>
                            </div>
                            <div className={style.dadosItem}>
                                <p><strong>Modalidade:</strong></p>
                                <p>{aluno.modalidade}</p>
                            </div>
                            <div className={style.dadosItem}>
                                <p><strong>Telefone:</strong></p>
                                <p>{aluno.telefone}</p>
                            </div>
                        </>
                    )}

                        {/* Se o id selecionado for 2, exibe tabelaEstagio */}
                        {selectedId === 2 && tabelaEstagio.map(item => (
                            <div key={item.id} className={style.dadosItem}>
                                <p><strong>{item.nomeColuna}</strong>:</p>
                                <p>{item.dadoColuna}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
