// components/calendar/calendar.js
import Utils from '../../utils';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 当前选中日期
    model: {
      type: String,
      value: Date.now()
    },
    mainColor: {
      type: String,
      value: '#636FA4'
    },
    // 状态特殊的日期
    specialDate: {
      type: Array,
      value: []
    },
    // 状态特殊的日期的字体颜色
    specialFontColor: {
      type: String,
      value: '#ff9472'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    weekArr: ['一', '二', '三', '四', '五', '六', '日'],
    activeDate: '',
    currentYear: '',
    currentMonth: '',
    currentDate: '',
    currentWeek: '',
    currentMonthDays: [],
    blankDayItem: [],
    specialDateStringArr: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 入口函数
     */
    onLoad() {
      Utils.watch(this, {
        specialDate: function (newVal) {
         this.setData({
            specialDateStringArr: newVal.map(a => Utils.yyyymmdd(new Date(a), '/'))
          });
          this.setCurrentStatus(this.data.activeDate);
        }
      })
      this.setData({
        specialDateStringArr: this.properties.specialDate.map(a => Utils.yyyymmdd(new Date(a), '/'))
      });
      this.setData({
        activeDate: this.properties.model
      });
      this.setCurrentStatus(this.data.activeDate);
    },

    /**
     * 设置当前展示情况
     * @param {date} date
     */
    setCurrentStatus(date) {
      this.setData({currentYear: Utils.getYear(date)});
      this.setData({currentMonth: Utils.getMonth(date)});
      this.setData({currentDate: Utils.getDate(date)});
      const dayArr = Utils.creatNewArray(1, Utils.getCurrentMonthDay(date));

      this.setData({
        currentMonthDays: dayArr.map(a => (
          {
            date: Utils.yyyymmdd(new Date(this.data.currentYear, this.data.currentMonth - 1, a), '/'),
            dayText: a,
            special: this.data.specialDateStringArr
              .includes(Utils.yyyymmdd(new Date(this.data.currentYear, this.data.currentMonth - 1, a), '/'))
          }
        ))
      });
      // 计算每个月1号周几开始
      const _dateDay = new Date(Utils.getYear(date), (Utils.getMonth(date) - 1), 1).getDay();
      const blankNum = _dateDay - 1;
      this.setData({ blankDayItem: blankNum ? Utils.creatNewArray(0, blankNum - 1) : [] });
    },

    /**
     * 点击日期
     * @param {object} event
     */
    dayClick(event) {
      const _date = event.target.dataset.day;
      this.setData({currentDate: _date});
      const params = {
        date: event.target.dataset.date,
        dayText: event.target.dataset.day,
        isSpecial: event.target.dataset.special
      };
      this.triggerEvent('dayTouch', params);
    },

    /**
     * 点击上个月
     */
    preMonth() {
      const _year = Utils.getYear(this.data.activeDate);
      const _month = Utils.getMonth(this.data.activeDate);
      this.setData({activeDate: new Date(_year, _month - 2, 1)});
      this.setCurrentStatus(this.data.activeDate);
      this.triggerEvent('preMonth', this.data.activeDate);
    },

    /**
     * 点击下个月
     */
    nextMonth() {
      const _year = Utils.getYear(this.data.activeDate);
      const _month = Utils.getMonth(this.data.activeDate);
      this.setData({ activeDate: new Date(_year, _month, 1) });
      this.setCurrentStatus(this.data.activeDate);
      this.triggerEvent('nextMonth', this.data.activeDate);
    },

    /**
     * 点击今天
     */
    backToday() {
      this.setData({activeDate: new Date()});
      this.setCurrentStatus(this.data.activeDate);
      this.triggerEvent('backToday', this.data.activeDate);
    }
  },
  /**
   * 组件生命周期
   */
  lifetimes: {
    attached: function () {
      this.onLoad();
    }
  }
})
