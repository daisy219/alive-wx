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
    const result = db.collection(url).doc(id).remove();
    return result;
    // ({
      // success: res => {
      //   wx.showToast({
      //     title: '删除成功',
      //   })
      //   this.setData({
      //     counterId: '',
      //     count: null,
      //   })
      // },
      // fail: err => {
      //   wx.showToast({
      //     icon: 'none',
      //     title: '删除失败',
      //   })
      //   console.error('[数据库] [删除记录] 失败：', err)
      // }
    // })
  }
}