// miniprogram/pages/readingPlan/readingPlan.js
import Utils from '../../utils';
import Services from '../../services/index';

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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPlanList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})