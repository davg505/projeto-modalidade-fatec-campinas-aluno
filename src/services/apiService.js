import axios from 'axios';

// Configuração base da API, adaptada ao seu back-end (ajuste a URL conforme necessário)
const apiService = axios.create({
  //baseURL: 'http://localhost:3001/api',  // Endereço do back-end
  baseURL: 'https://backend-fatec.onrender.com/api',
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






