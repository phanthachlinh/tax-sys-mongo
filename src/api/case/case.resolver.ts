import CaseApi from './case'
export default {
  async addCase(_: any, { input }: any) {
    return CaseApi.addCase(input)
  },
  async updateCase(_: any, { _id, country, status }: any) {
    return CaseApi.updateCase(_id, country, status)
  },
  async removeCase(_: any, { _id }: any) {
    return await CaseApi.removeCase(_id)
  },
}
