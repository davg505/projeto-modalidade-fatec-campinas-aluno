import axios from 'axios';

// Configuração base da API, adaptada ao seu back-end (ajuste a URL conforme necessário)
const apiService = axios.create({
  baseURL: 'http://localhost:3001/api',  // Endereço do back-end
  //baseURL: 'https://backend-fatec.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

//acesso token
apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });


  // GET

  //busca os dados do aluno 
  export const buscarDadosAluno = async () => {
    try {
      const response = await apiService.get('/aluno');
      return response.data; // Isso será o aluno retornado do back-end
    } catch (error) {
      console.error('Erro ao buscar dados do aluno:', error);
      throw error;
    }
  };

   //busca os dados de estagio aluno 
   export const buscarDadosEstagio = async () => {
    try {
      const response = await apiService.get('/dados_estagio');
      return response.data; // Isso será o aluno retornado do back-end
    } catch (error) {
      console.error('Erro ao buscar dados do aluno:', error);
      throw error;
    }
  };

  //busca os dados de empresa aluno 
  export const buscarDadosEmpresa = async () => {
    try {
      const response = await apiService.get('/dados_empresa');
      return response.data; // Isso será o aluno retornado do back-end
    } catch (error) {
      console.error('Erro ao buscar dados do aluno:', error);
      throw error;
    }
  };

   //busca os dados de empresa aluno 
   export const buscarDadosEstagioInfo = async () => {
    try {
      const response = await apiService.get('/dados_estagio_info');
      return response.data; // Isso será o aluno retornado do back-end
    } catch (error) {
      console.error('Erro ao buscar dados estagio info:', error);
      throw error;
    }
  };


     //busca os dados de empresa aluno 
     export const buscarDadosAlunoFatec = async () => {
      try {
        const response = await apiService.get('/dados_fatec_aluno');
        return response.data; // Isso será o aluno retornado do back-end
      } catch (error) {
        console.error('Erro ao buscar dados fatec info:', error);
        throw error;
      }
    };

     //busca os dados da solicaitação do estagio
     export const buscarDadosEstagioSolicitacao = async () => {
      try {
        const response = await apiService.get('/estagio_solicitacao');
        return response.data; // Isso será o aluno retornado do back-end
      } catch (error) {
        console.error('Erro ao buscar dados estagio info:', error);
        throw error;
      }
    };

  //PUT


    //atualiza dados do representante da empresa  
    export const atualizarDadosRepresentante = async (dados) => {
      try {
        const response = await apiService.put('/atualizacao_representante', {
          nome_representante: dados.nome_representante,
          cargo_funcao: dados.cargo_funcao,
          cpf_representante: dados.cpf_representante
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao atualizar dados do representante:', error);
        throw error;
      }
    };

    //atualiza dados do aluno 
    export const atualizarDadosAlunos = async (dados) => {
      try {
        const response = await apiService.put('/atualizacao_dados_aluno', {
          cep: dados.cep,
          endereco: dados.endereco,
          cidade: dados.cidade,
          telefone: dados.telefone
        });
        console.log('chamando objeto', response.data);
        return response.data;
      } catch (error) {
        console.error('Erro ao atualizar dados do aluno:', error);
        throw error;
      }
    };

    // POST


    // Solicitação inicial de estágio
      export const solicitacaoInicalEstagio = async (dados) => {
        try {
          const response = await apiService.post('/solicitacao_estagio', {
            time_de_estagio: dados.time_de_estagio,
            modelo: dados.modelo,
            data_inicial: dados.data_inicial,
            data_final: dados.data_final
          });

          console.log('Solicitação enviada com sucesso:', response.data);
          return response.data;
        } catch (error) {
          console.error('Erro ao solicitar estágio:', error);
          throw error;
        }
      };


       // enviar dados da empresa 
       export const adicionarDadosEmpresas = async (dados) => {
        try {
          const response = await apiService.post('/add_dados_empresa', {
            nome_empresa: dados.nome_empresa,
            cnpj: dados.cnpj,
            endereco: dados.endereco,
            local: dados.local,
            estado: dados.estado,
            nome_representante: dados.nome_representante,
            cargo_funcao: dados.cargo_funcao,
            cpf_representante: dados.cpf_representante

          });

          console.log('Solicitação enviada com sucesso:', response.data);
          return response.data;
        } catch (error) {
          console.error('Erro ao add empresa:', error);
          throw error;
        }
      };


      // enviar dados do estágio
      export const adicionarDadosEstagio = async (dados) => {
        try {
          const response = await apiService.post('/add_dados_estagio', {
            valor: dados.valor,
            horas_semanais: dados.horas_semanais,
            horas_entrada: dados.horas_entrada,
            horas_saida: dados.horas_saida,
            horas_refeicao: dados.horas_refeicao
          });

          console.log('Solicitação enviada com sucesso:', response.data);
          return response.data;
        } catch (error) {
          console.error('Erro ao adicionar estágio:', error);
          throw error;
        }
      };


      // Solicitação iniciar I cientifica -fazer
      export const solicitacaoInicalIc = async (dados) => {
  try {
    // Verifique os dados antes de enviar
    console.log('Dados enviados:', dados);

    // Validação básica com os nomes corretos das chaves
    if (
      !dados.instituicao_centro_pesquisa ||
      !dados.tema ||
      !dados.data_inicial ||
      !dados.data_final ||
      !dados.orientador
    ) {
      throw new Error('Campos obrigatórios estão faltando.');
    }

    const response = await apiService.post('/solicitacao_ic', {
      instituicao_centro_pesquisa: dados.instituicao_centro_pesquisa,
      tema: dados.tema,
      data_inicial: dados.data_inicial,
      data_final: dados.data_final,
      orientador: dados.orientador,
      horario: dados.horario || '',
      dias_da_semana: dados.dias_da_semana || '',
      descricao_atividade: dados.descricao_atividade || '',
    });

    console.log('Solicitação enviada com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao solicitar IC:', error.message || error);
    throw error;
  }
};


       // Cancelar IC- fazer
      export const CancelarSolicitacaoIc = async (dados) => {
        try {
        const response = await apiService.put('/cancelar_ic_aluno');
        return response.data; // Isso será o aluno retornado do back-end
      } catch (error) {
        console.error('Erro ao buscar dados estagio info:', error);
        throw error;
      }
      };

      export const CriarCartaApresIc = async (dados) => {
        try {
        const response = await apiService.post('/cartaApresIC');
        return response.data; // Isso será o aluno retornado do back-end
      } catch (error) {
        console.error('Erro ao buscar dados estagio info:', error);
        throw error;
      }
      };

      export const relatorioFinal = async (dados) => {
        try {
        const response = await apiService.post('/cartaApresIC');
        return response.data; // Isso será o aluno retornado do back-end
      } catch (error) {
        console.error('Erro ao buscar dados estagio info:', error);
        throw error;
      }
      };

       export const CriarCartaAvalIc = async (dados) => {
        try {
        const response = await apiService.post('/cartaApresIC');
        return response.data; // Isso será o aluno retornado do back-end
      } catch (error) {
        console.error('Erro ao buscar dados estagio info:', error);
        throw error;
      }
      };
      


    

