const db = wx.cloud.database();

module.exports = {
  /** 列表查询
   * @param { string } url -访问数据库名
   * @param { object } params -参数
   */
  async onQuery(url, params) {
    const result = await db.collection(url).where({ params }).get();
    return result;
  },

  /**
   * 添加数据
   * @param { string } url -访问数据库名
   * @param { object } params -参数
   */
  async onAdd(url, data) {
    const result = await db.collection(url).add({data});
    return result;
  },

  /**
   * 删除数据
   */
  async onDelete(url, id) {
    const result = await db.collection(url).doc(id).remove();
    return result;
  },

  /**
   * 更新数据
   */
  async onUpdate(url, id, data) {
    const result = await db.collection(url).doc(id).update({data});
    return result;
  }
}