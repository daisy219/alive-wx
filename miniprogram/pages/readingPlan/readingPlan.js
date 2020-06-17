// miniprogram/pages/readingPlan/readingPlan.js
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
    startDate: '',
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
    console.log(this.data.bookTitle);
    this.setData({ addPlanDialogShow: false })
  },
  chooseDate() {
    this.setData({ showDatePicker: true })
  },
  onCloseChooseDate() {
    this.setData({ showDatePicker: false })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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