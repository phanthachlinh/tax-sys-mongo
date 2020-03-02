import CaseApi from './case'
export default {
  async getCases(_: any, { FK_Mongo_Client, page }: { FK_Mongo_Client: string, page: number }, __: any) {
    return await CaseApi.getCases(FK_Mongo_Client, page)
  }
}
