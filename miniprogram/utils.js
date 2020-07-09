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
  },
  
  /**
   * 获取当前年月日
   * @param { number | string } date 时间戳
   * @param { string } connect 连接符
   */
  yyyymmdd(date, connect = '-') {
    return this.getYear(date) + connect + this.getMonth(date) + connect + this.getDate(date);
  },

  /**
   * 获取当前时间
   * @param { number | string } date 时间戳
   * @param { string } connect 连接符
   */
  hhmm(date, connect = ':') {
    const _date = new Date(date);
    const _hour = _date.getHours() > 9 ? _date.getHours() : ('0' + _date.getHours());
    const _minutest = _date.getMinutes() > 9 ? _date.getMinutes() : ('0' + _date.getMinutes());
    return _hour + connect + _minutest;
  },

  // 设置监听器
  watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
      this.observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value)
      })
    })
  },
  // 监听属性，并执行监听函数
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (newVal === val) return
        fn && fn(newVal)
        val = newVal
      },
    })
  }
}
