import axios from 'axios';
import duimpModel from '../models/duimpModel.js';

const URL_BASE_SISCOMEX = 'https://portalunico.siscomex.gov.br/portal/api';
const URL_BASE_SISCOMEX = 'https://portalunico.siscomex.gov.br/portal/api';

const processarImportacao = async (numeroDuimp, credenciais) => {
    try {
        console.log(`[Service] Iniciando autenticação no Siscomex para a Duimp: ${numeroDuimp}`);

        // 1. Autenticação no Siscomex para obter o Token
        // Nota: Ajuste os headers de acordo com o manual do Siscomex (geralmente usam as chaves enviadas pelo cliente)
        const respostaAutenticacao = await axios.post(`${URL_BASE_SISCOMEX}/autenticar/chave-acesso`, {}, {
    headers: {
        // Usando a grafia exata exigida pelo Governo
        'Client-Id': credenciais.clientId,
        'Client-Secret': credenciais.clientSecret,
        'Role-Type': credenciais.roleType
    }
});

        // O Siscomex costuma retornar o token no Header (Authorization ou Set-Token) ou no Body.
        // Vamos supor que venha no header 'authorization' ou adaptamos para a realidade da API deles:
        const tokenSiscomex = respostaAutenticacao.headers['authorization'] || respostaAutenticacao.data.token;

        if (!tokenSiscomex) {
            throw new Error('Não foi possível obter o Token de autenticação do Siscomex.');
        }

        console.log('[Service] Autenticado com sucesso. Buscando dados da Duimp...');

        // 2. Buscar os dados completos da Duimp usando o Token obtido
        // (Substitua pela URL exata da consulta de Duimp do Siscomex)
        const respostaDuimp = await axios.get(`${URL_BASE_SISCOMEX}/duimp/v1/duimp/${numeroDuimp}`, {
            headers: {
                'Authorization': `Bearer ${tokenSiscomex}`,
                'X-Role-Type': credenciais.roleType
            }
        });

        const dadosCompletosDuimp = respostaDuimp.data;

        // 3. Salvar o resultado completo no banco de dados através do Model
        const duimpSalva = await duimpModel.salvar({
            numero: numeroDuimp,
            dadosRaw: dadosCompletosDuimp,
            importadoEm: new Date()
        });

        return duimpSalva;

    } catch (error) {
        console.error('Erro na integração com o Siscomex:', error.response?.data || error.message);
        throw new Error(`Falha na comunicação com o Siscomex: ${error.response?.data?.message || error.message}`);
    }
};

export default { processarImportacao };