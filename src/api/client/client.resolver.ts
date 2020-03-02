import ClientApi from './client'
export default {
  async addClient(_: any, { input }: any) {
    let newClient = input;
    newClient._id = (await ClientApi.addClient(input))._id
    return newClient
  },
  async updateClient(_: any, { _id, input }: any) {
    return await ClientApi.updateClient(_id, input)

  },
  async removeClient(_: any, { _id }: any) {
    return await ClientApi.removeClient(_id)
  }
}
