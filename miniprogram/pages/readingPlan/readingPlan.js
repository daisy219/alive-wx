// miniprogram/pages/readingPlan/readingPlan.js
import Utils from '../../utils';
import Services from '../../services/index';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addPlanDialogShow: false,
    currentDate: '',
    showDatePicker: false,
    form: {},
    bookTitle: '',
    author: '',
    planDate: '',
    pickerDefaultDate: Date.now(),
    planList: [],
    loading: false
  },
  /** 打开添加阅读 */
  showAddDialog() {
    this.setData({ addPlanDialogShow: true })
  },
  closeDialog() {
    this.setData({ addPlanDialogShow: false })   
  },
  onChange(event) {
    console.log(event.detail);
  },
  submit() {
    if (!this.data.bookTitle) {
      Toast.fail('请填写书名');
      return;
    }
    if (!this.data.author) {
      Toast.fail('请填写作者');
      return;
    }
    if (!this.data.planDate) {
      Toast.fail('请选择计划读完时间');
      return;
    }
    Object.assign(this.data.form, {
      bookTitle: this.data.bookTitle,
      author: this.data.author,
      planDate: this.data.planDate,
    });
    this.addPlan(this.data.form);
    this.setData({ addPlanDialogShow: false });
  },

  /** 获取计划列表 */
  async getPlanList() {
    this.setData({ loading: true });
    const result = await Services.onQuery('readingPlan');
    this.setData({ loading: false });
    this.setData({ planList: result.data });
  },

  /** 向数据库添加数据 */
  async addPlan(data) {
    try {
      await Services.onAdd('readingPlan', data);
      wx.showToast({
        title: '添加成功',
      });
      this.getPlanList();
    } catch (err) {
      wx.showToast({
        title: '添加失败',
      })
    }
  },
  /** 删除计划 */
  async deletePlan(event) {
    try {
      await Services.onDelete('readingPlan', event.target.id);
      wx.showToast({
        title: '删除成功',
      });
      this.getPlanList();
    } catch (err) {
      wx.showToast({
        title: '删除失败',
      })
    }

  },
  chooseDate() {
    this.setData({ showDatePicker: true })
  },
  onCloseChooseDate() {
    this.setData({ showDatePicker: false })
  },

  /** 书名变更 */
  onTitleChange(event) {
    this.setData({ bookTitle: event.detail });
  },

  /** 作者变更 */
  onAuthorChange(event) {
    this.setData({ author: event.detail });
  },

  /** 确认选择时间 */
  onConfirmChooseDate(event) {
    console.log(event);
    this.setData({ planDate: Utils.yyyymmdd(new Date(event.detail)) });
    this.setData({ showDatePicker: false })
  },
  /**
   * 读完
   */
  async donePlan(event) {
    const target = this.data.planList.find(a => a._id === event.target.id);
    const params = {
      author: target.author,
      bookTitle: target.bookTitle,
      times: 1,
    };
    try {
      await Services.onAdd('done', params);
      await Services.onDelete('readingPlan', event.target.id);
      Toast.success('恭喜恭喜');
      this.getPlanList();
    } catch (err) {
      Toast.fail('我的天，好像出现了啥问题');
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getPlanList();
  },
})