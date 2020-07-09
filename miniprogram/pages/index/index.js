//index.js
import Services from '../../services/index';
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    searchValue: '',
    userInfo: {},
    logged: false,
    messageList: [],
    books: 0,
    sportsDay: 0,
  },
  onLoad: function() {
    this.onGetOpenid();
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              });
              console.log(this.data.userInfo);
            }
          })
        }
      }
    });

    this.getCommentList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getRecordList();
    this.getDoneList();
  },

  /** 获取计划列表 */
  async getDoneList() {
    const result = await Services.onQuery('done');
    this.setData({ books: result.data.length });
  },

  /**
   * 获取打卡记录
   */
  async getRecordList() {
    const result = await Services.onQuery('punchRecord');
    this.setData({sportsDay: new Set(result.data.map(a => a.date)).size});
  },

  /** 获取评论列表 */
  async getCommentList() {
    const result = await Services.onQuery('comment');
    this.setData({messageList: result.data});
  },

  onChange(e) {
    this.setData({
      searchValue: e.detail,
    });
  },

  async submitComment() {
    const params = {
      content: this.data.searchValue,
      creater: this.data.userInfo.nickName,
      avatarUrl: this.data.userInfo.avatarUrl,
    }
    try {
      await Services.onAdd('comment', params);
      wx.showToast({
        title: '添加成功',
      });
      this.getCommentList();
      this.setData({searchValue: ''});
    } catch (err) {
      wx.showToast({
        title: '添加失败',
      })
    }
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        // wx.navigateTo({
        //   url: '../userConsole/userConsole',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  toSports() {
    wx.switchTab({
      url: '../sports/sports'
    })
  },

  toDone() {
    wx.redirectTo({
      url: '../done/done'
    })  
  }
})
