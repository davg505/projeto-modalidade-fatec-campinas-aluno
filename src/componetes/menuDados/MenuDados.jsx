import { useEffect, useState } from "react";
import { buscarDadosAluno, buscarDadosEstagio, buscarDadosEmpresa, atualizarDadosRepresentante, atualizarDadosAlunos, buscarDadosep, buscarDadosic } from '../../services/apiService';
import style from './MenuDados.module.css';

export const MenuDados = () => { 
    const [listaMeusDados, setListaMeusDados] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [aluno, setAluno] = useState(null);
    const [dadosEstagio, setEstagio] = useState(null);
    const [dadosEmpresa, setEmpresa] = useState(null);
    const [dadosEp, setDadosEp] = useState(null);
    const [dadosIc, setDadosIc] = useState(null);


    // Carrega opções do menu
    useEffect(() => {
        setListaMeusDados([
            { id: 1, nomeColuna: 'Meus Dados' },
            { id: 2, nomeColuna: 'Dados do Estágio' },
            { id: 3, nomeColuna: 'Dados da Empresa' },
            { id: 4, nomeColuna: 'Dados do I. Cientifica' },
            { id: 5, nomeColuna: 'Dados do E. Profissional'},
            { id: 6, nomeColuna: 'Sem modalidade' }
        ]);
    }, []);


     // Carrega dados do estágio
    useEffect(() => {
        const carregarDadosep = async () => {
            try {
                const dados1 = await buscarDadosep();
                console.log('✅ Dados ep:', dados1);  // VERIFICAR
                setDadosEp(dados1);
            } catch (error) {
                console.error('Erro ao carregar os dados do ep:', error);
            }
        };
        carregarDadosep();
    }, []);

    useEffect(() => {
        const carregarDadosic = async () => {
            try {
                const dados1 = await buscarDadosic();
                console.log('✅ Dados ep:', dados1);  // VERIFICAR
                setDadosIc(dados1);
            } catch (error) {
                console.error('Erro ao carregar os dados do ep:', error);
            }
        };
        carregarDadosic();
    }, []);



    // Carrega dados do aluno
    useEffect(() => {
    const carregarDadosAluno = async () => {
        try {
            const dados = await buscarDadosAluno();
            console.log('✅ Dados aluno:', dados);  // VERIFICAR
            setAluno(dados);

            // Define o menu com base na modalidade
            if (dados.modalidade === 'Estagio') {
                setListaMeusDados([
                    { id: 1, nomeColuna: 'Meus Dados' },
                    { id: 2, nomeColuna: 'Dados do Estágio' },
                    { id: 3, nomeColuna: 'Dados da Empresa' },
                ]);
            } else if (dados.modalidade === 'Sem Modalidade') {
                setListaMeusDados([
                    { id: 1, nomeColuna: 'Meus Dados' },
                    { id: 6, nomeColuna: 'Sem modalidade' },
                ]);
            } else if (dados.modalidade === 'E. Profissional') {
                setListaMeusDados([
                    { id: 1, nomeColuna: 'Meus Dados' },
                    { id: 5, nomeColuna: 'Dados do E. Profissional' },
                ]);
            } else if (dados.modalidade === 'I. Cientifica') {
                setListaMeusDados([
                    { id: 4, nomeColuna: 'Dados do I. Cientifica' },
                    { id: 1, nomeColuna: 'Meus Dados' },
                ]);
            } else {
                // Modalidade não conhecida – fallback
                setListaMeusDados([
                    { id: 1, nomeColuna: 'Meus Dados' },
                ]);
            }

        } catch (error) {
            console.error('Erro ao carregar o perfil do aluno:', error);
        }
    };
    carregarDadosAluno();
}, []);

    // Carrega dados do estágio
    useEffect(() => {
        const carregarDadosEstagio = async () => {
            try {
                const dados1 = await buscarDadosEstagio();
                console.log('✅ Dados estágio:', dados1);  // VERIFICAR
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
                const dados2 = await buscarDadosEmpresa();
                console.log('✅ Dados estágio:', dados2);  // VERIFICAR
                setEmpresa(dados2);
            } catch (error) {
                console.error('Erro ao carregar os dados do estágio:', error);
            }
        };
        carregarDadosEmpresa();
    }, []);


    // Ao clicar em uma opção
    const handleClick = (id) => {
        setSelectedId(id);
    };

    return (
        <div>
            {/* Botões do menu */}
            {listaMeusDados.map(item => (
                <button
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    className={style.botaoDados}
                >
                    {item.nomeColuna}
                </button>
            ))}

            {/* Menu de edição */}
            {selectedId && (
                <div className={style.Menu}>
        
                {/* Dados do aluno */}
                {selectedId === 1 && aluno && (
                                        <>
                                            {!aluno.editando ? (
                                            <>
                                                <button
                                                className={style.botaoDadosEditar}
                                                onClick={() => setAluno({ ...aluno, editando: true })}
                                                >
                                                Editar
                                                </button>

                                                {[
                                                ["Nome", aluno.nome_do_aluno],
                                                ["Email", aluno.email],
                                                ["RA", aluno.ra],
                                                ["Curso", aluno.curso],
                                                ["Status", aluno.status],
                                                ["Modalidade", aluno.modalidade],
                                                ["CPF", aluno.cpf],
                                                ["RG", aluno.rg],  
                                                ["CEP", aluno.cep],
                                                ["Endereço", aluno.endereco],
                                                ["Cidade", aluno.cidade],
                                                ["Telefone", aluno.telefone],
                                                ].map(([label, value], i) => (
                                                <div key={i} className={style.dadosItem}>
                                                    <p><strong>{label}:</strong></p>
                                                    <p>{value}</p>
                                                </div>
                                                ))}
                                            </>
                                            ) : (
                                            <>
                                                <button
                                                className={style.botaoDadosEditar}
                                                onClick={async () => {
                                                    try {
                                                      await atualizarDadosAlunos({
                                                        cep: aluno.cep,
                                                        endereco: aluno.endereco,
                                                        cidade: aluno.cidade,
                                                        telefone: aluno.telefone,
                                                      });
                                                  
                                                      const dadosAtualizados = await buscarDadosAluno();
                                                      setAluno({ ...dadosAtualizados, editando: false });
                                                      alert('Dados atualizados com sucesso!');
                                                    } catch (error) {
                                                      alert('Erro ao atualizar dados do aluno.');
                                                    }
                                                  }}
                                                >
                                                Salvar
                                                </button>
                                                <button
                                                className={style.botaoDadosEditar}
                                                onClick={() => setAluno({ ...aluno, editando: false })}
                                                >
                                                Cancelar
                                                </button>

                                                {[
                                                ["CEP", "cep"],
                                                ["Endereço", "endereco"],
                                                ["Cidade", "cidade"],
                                                ["Telefone", "telefone"],
                                                ]
                                                .map(([label, chave], i) => (
                                                    <div key={i} className={style.dadosItem}>
                                                      <label><strong>{label}:</strong></label>
                                                      <input
                                                        type="text"
                                                        value={aluno[chave] || ""}
                                                        onChange={(e) => setAluno({ ...aluno, [chave]: e.target.value })}
                                                        className={style.inputEditar}
                                                      />
                                                    </div>
                                                  ))}

                                                {/* Campos que não são editáveis */}
                                                {[
                                                ["Nome", aluno.nome_do_aluno],
                                                ["Email", aluno.email],
                                                ["RA", aluno.ra],
                                                ["Curso", aluno.curso],
                                                ["Status", aluno.status],
                                                ["Modalidade", aluno.modalidade],
                                                ["CPF", aluno.cpf],
                                                ["RG", aluno.rg],
                                                ].map(([label, value], i) => (
                                                <div key={i} className={style.dadosItem}>
                                                    <p><strong>{label}:</strong></p>
                                                    <p>{value}</p>
                                                </div>
                                                ))}
                                            </>
                                            )}
                                        </>
                                        )}




                    {/* Dados do estágio */}
                    {selectedId === 2 && dadosEstagio && (
                        <>
                         <p> Dados do Estagio</p>
                         
                            {[
                                ["Status", dadosEstagio.status],
                                ["Tipo de estágio", dadosEstagio.tipo_de_estagio],
                                ["Modelo", dadosEstagio.modelo],
                                ["Solicitação", dadosEstagio.solicitacao],
                                ["Data Solicitação", dadosEstagio.data_solicitacao],
                                ["Status do termo", dadosEstagio.status_do_termo],
                                ["Prorrogação", dadosEstagio.prorrogacao_periodo],
                                ["Transição do obrigatório", dadosEstagio.transicao_do_obrigatorio],
                                ["Rescisão", dadosEstagio.rescisao_termo],
                                ["Relatório", dadosEstagio.relatorio_estagio],
                                ["Ficha de avaliação", dadosEstagio.ficha_avaliacao],
                                 ].map(([label, value], i) => (
                                <div key={i} className={style.dadosItem}>
                                    <p><strong>{label}:</strong></p>
                                    <p>{value}</p>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Futuro: dados da empresa */}
                    {selectedId === 3 && dadosEmpresa && (
                        <>
                            {!dadosEmpresa.editando ? (
                            <>
                                <button
                                className={style.botaoDadosEditar}
                                onClick={() => setEmpresa({ ...dadosEmpresa, editando: true })}
                                >
                                Editar
                                </button>

                                {[
                                ["Nome do representante", dadosEmpresa.nome_representante],
                                ["Cargo/Função", dadosEmpresa.cargo_funcao],
                                ["CPF do representante", dadosEmpresa.cpf_representante],
                                ["Nome da empresa", dadosEmpresa.nome_empresa],
                                ["Endereço", dadosEmpresa.endereco],
                                ["Local", dadosEmpresa.local],
                                ].map(([label, value], i) => (
                                <div key={i} className={style.dadosItem}>
                                    <p><strong>{label}:</strong></p>
                                    <p>{value}</p>
                                </div>
                                ))}
                            </>
                            ) : (
                            <>
                                <button
                                className={style.botaoDadosEditar}
                                onClick={async () => {
                                    try {
                                    const atualizado = await atualizarDadosRepresentante({
                                        nome_representante: dadosEmpresa.nome_representante,
                                        cargo_funcao: dadosEmpresa.cargo_funcao,
                                        cpf_representante: dadosEmpresa.cpf_representante,
                                    });
                                    setEmpresa({ ...atualizado, editando: false });
                                    alert('Dados atualizados com sucesso!');
                                    } catch (error) {
                                    alert('Erro ao atualizar dados do representante.');
                                    }
                                }}
                                >
                                Salvar
                                </button>
                                <button
                                className={style.botaoDadosEditar}
                                onClick={() => setEmpresa({ ...dadosEmpresa, editando: false })}
                                >
                                Cancelar
                                </button>

                                {[
                                ["Nome do representante", "nome_representante"],
                                ["Cargo/Função", "cargo_funcao"],
                                ["CPF do representante", "cpf_representante"],
                                ].map(([label, campo], i) => (
                                <div key={i} className={style.dadosItem}>
                                    <label><strong>{label}:</strong></label>
                                    <input
                                    type="text"
                                    value={dadosEmpresa[campo] || ""}
                                    onChange={(e) =>
                                        setEmpresa({ ...dadosEmpresa, [campo]: e.target.value })
                                    }
                                    className={style.inputEditar}
                                    />
                                </div>
                                ))}

                                {/* Campos que não são editáveis */}
                                {[
                                ["Nome da empresa", dadosEmpresa.nome_empresa],
                                ["Endereço", dadosEmpresa.endereco],
                                ["Local", dadosEmpresa.local],
                                ].map(([label, value], i) => (
                                <div key={i} className={style.dadosItem}>
                                    <p><strong>{label}:</strong></p>
                                    <p>{value}</p>
                                </div>
                                ))}
                            </>
                            )}
                        </>
                        )}

                     {/* Dados do estágio */}
                    {selectedId === 4 && dadosIc && (
                        <>
                         <p> Dados do I. Cientifica</p>
                         
                            {[
                                  ["Instituição / Centro de Pesquisa", dadosIc.instituicao_centro_pesquisa],
                                    ["Tema", dadosIc.tema],
                                    ["Data Inicial", dadosIc.data_inicial],
                                    ["Data Final", dadosIc.data_final],
                                    ["Orientador", dadosIc.orientador],
                                    ["Horário", dadosIc.horario],
                                    ["Dias da Semana", dadosIc.dias_da_semana],
                               
                                 ].map(([label, value], i) => (
                                <div key={i} className={style.dadosItem}>
                                    <p><strong>{label}:</strong></p>
                                    <p>{value}</p>
                                </div>
                            ))}
                        </>
                    )}


                    
                     {/* Dados do estágio */}
                    {selectedId === 5 && dadosEp && (
                        <>
                         <p> Dados do E. Profissional</p>
                         
                            {[
                                ["Município da Empresa", dadosEp.municipio_empresa],
                                ["Superior Imediato", dadosEp.superior_imediato],
                                ["Telefone", dadosEp.tel],
                                ["Email", dadosEp.email],
                                ["Área de Atuação", dadosEp.area_atuacao],
                                ["Data de Início de Atuação", dadosEp.data_incio_atuacao],
                              
                                 ].map(([label, value], i) => (
                                <div key={i} className={style.dadosItem}>
                                    <p><strong>{label}:</strong></p>
                                    <p>{value}</p>
                                </div>
                            ))}
                        </>
                    )}


                    
                     {/* Sem modalidade */}
                    {selectedId === 6 && aluno && (
                        <>
                         <p> Dados da modalidades</p>
                         
                            {[
                                 ["Modalidade", aluno.modalidade],
                                 ].map(([label, value], i) => (
                                <div key={i} className={style.dadosItem}>
                                    <p><strong>{label}:</strong></p>
                                    <p>{value}</p>
                                </div>
                            ))}
                        </>
                    )}


                </div>
            )}
        </div>
    );
};
