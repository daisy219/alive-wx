// miniprogram/pages/done/done.js
import Services from '../../services/index';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    doneList: [],
    addDoneDialogShow: false,
    bookTitle: '',
    author: '',
    times: '',
    form: {},
    loading: false,
  },

  /**
   * 添加已读数目
   */
  showAddDialog() {
    this.setData({ addDoneDialogShow: true });
  },
  /**
   * 返回
   */
  closeDialog() {
    this.setData({ addDoneDialogShow: false });
  },

  /**
   * 提交
   */
  submit() {
    if (!this.data.bookTitle) {
      Toast.fail('请填写书名');
      return;
    }
    if (!this.data.author) {
      Toast.fail('请填写作者');
      return;
    }
    if (!this.data.times) {
      Toast.fail('请填写阅读次数');
      return;
    }
    Object.assign(this.data.form, {
      bookTitle: this.data.bookTitle,
      author: this.data.author,
      times: this.data.times,
    });
    this.addDone(this.data.form);
    this.setData({ addDoneDialogShow: false });
  },
  /** 书名变更 */
  onTitleChange(event) {
    this.setData({ bookTitle: event.detail });
  },

  /** 作者变更 */
  onAuthorChange(event) {
    this.setData({ author: event.detail });
  },

  /** 作者变更 */
  onTimesChange(event) {
    this.setData({ times: event.detail });
  },
  /** 获取计划列表 */
  async getDoneList() {
    this.setData({ loading: true });
    const result = await Services.onQuery('done');
    this.setData({ loading: false });
    this.setData({ doneList: result.data });
  },

  /** 向数据库添加数据 */
  async addDone(data) {
    try {
      await Services.onAdd('done', data);
      wx.showToast({
        title: '添加成功',
      });
      this.getDoneList();
    } catch (err) {
      wx.showToast({
        title: '添加失败',
      })
    }
  },
  /** -1 */
  async minusDone(event) {
    if ( Number(event.target.dataset.times) === 1) {
      Toast('不能再减啦');
      return;
    }
    try {
      await Services.onUpdate('done', event.target.id, {times: Number(event.target.dataset.times) - 1});
      const doneList = this.data.doneList;
      this.setData({doneList})
      this.getDoneList();
    } catch (err) {
      wx.showToast({
        title: '操作失败',
      })
    }
  },
  /** +1 */
  async plusDone(event) {
    try {
      await Services.onUpdate('done', event.target.id, {times: Number(event.target.dataset.times) + 1});
      wx.showToast({
        title: '操作成功',
      });
      this.getDoneList();
    } catch (err) {
      wx.showToast({
        title: '操作失败',
      })
    }
  },
  /** 删除计划 */
  async deleteDone(event) {
    try {
      await Services.onDelete('done', event.target.id);
      wx.showToast({
        title: '删除成功',
      });
      this.getDoneList();
    } catch (err) {
      wx.showToast({
        title: '删除失败',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDoneList();
  },
})