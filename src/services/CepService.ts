import axios from 'axios'

export interface CepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export class CepService {
  static async consultaCep(cep: string): Promise<CepResponse> {
    const response = await axios.get(`/viacep-api/ws/${cep}/json/`)
    if (response.data.erro) {
      throw new Error('CEP não encontrado')
    }
    return response.data
  }
}

export default CepService
