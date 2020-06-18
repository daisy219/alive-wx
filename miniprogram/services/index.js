module.exports = {
  /** 列表查询
   * @param { string } url -访问数据库名
   * @param { object } params -参数
   */
  async onQuery(url, params) {
    const db = wx.cloud.database();
    const result = await db.collection(url).where({ params }).get();
    return result;
  },

  /**
   * 添加数据
   * @param { string } url -访问数据库名
   * @param { object } params -参数
   */
  async onAdd(url, data) {
    const db = wx.cloud.database();
    const result = await db.collection(url).add({data});
    return result;
  }
}