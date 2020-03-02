import ClientApi from './client'

const resolvers =
{
  async getClients(_: any, { searchTerm, page }: { searchTerm: string, page: number }, __: any) {
    return await ClientApi.getClients(searchTerm, page)
  }
}
export default resolvers
