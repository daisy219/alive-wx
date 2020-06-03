module.exports = {
  getFlag() {
    return true;
  },
  /** 获取date所在年
   * @param { date | stirng } date
   */
  getYear(date) {
    const _date = new Date(date);
    return _date.getFullYear();
  },
  /**
   * 获取date所在月
   * @param { data | string } date
   */
  getMonth(date) {
    const _date = new Date(date);
    return _date.getMonth() + 1;
  },

  /**
   * 获取date所在日
   * @param { data | string } date
   */
  getDate(date) {
    const _date = new Date(date);
    return _date.getDate();
  },

  /**
   * 获取date所在月有多少天
   * @param { date | stirng } date
   */
  getCurrentMonthDay(date) {
    const _date = new Date(date);
    const curYear = _date.getFullYear();
    const curMonth = _date.getMonth() + 1;
    return new Date(curYear, curMonth, 0).getDate();
  },
  /** 创建数字区间数组
   * @param {number} start - 开始数
   * @param {number} end - 结束数
   */
  creatNewArray(start, end) {
    const arr = [];
    for (let i = start; i < end + 1; i++) {
      arr.push(i);
    }
    return arr;
  }
}
