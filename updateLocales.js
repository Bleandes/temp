import axios from 'axios';
import extra from 'fs-extra';

const pt_BR_API = 'https://localise.biz/api/export/locale/pt-BR.json?key=IptSOu7k43N4S6m2vzcT9h_d4bc4Jejf';
const en_US_API = 'https://localise.biz/api/export/locale/en-US.json?key=IptSOu7k43N4S6m2vzcT9h_d4bc4Jejf';
const es_ES_API = 'https://localise.biz/api/export/locale/es-ES.json?key=IptSOu7k43N4S6m2vzcT9h_d4bc4Jejf';

const filePath_pt_BR = './src/locales/pt-BR/common.json';
const filePath_en_US = './src/locales/en-US/common.json';
const filePath_es_ES = './src/locales/es-ES/common.json';

async function updateLocales() {
  try {
    const response = await axios.get(pt_BR_API);
    const jsonData = response.data;
    const jsonString = JSON.stringify(jsonData, null, 2);
    await extra.writeFile(filePath_pt_BR, jsonString);
    console.log(`pt_BR atualizado com sucesso!`);
  } catch (error) {
    console.error('Erro ao atualizar o pt_BR:', error);
  }

  try {
    const response = await axios.get(en_US_API);
    const jsonData = response.data;
    const jsonString = JSON.stringify(jsonData, null, 2);
    await extra.writeFile(filePath_en_US, jsonString);
    console.log(`en_US atualizado com sucesso!`);
  } catch (error) {
    console.error('Erro ao atualizar o en_US:', error);
  }

  try {
    const response = await axios.get(es_ES_API);
    const jsonData = response.data;
    const jsonString = JSON.stringify(jsonData, null, 2);
    await extra.writeFile(filePath_es_ES, jsonString);
    console.log(`es_ES atualizado com sucesso!`);
  } catch (error) {
    console.error('Erro ao atualizar o es_ES:', error);
  }
}

updateLocales();