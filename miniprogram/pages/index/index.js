//index.js
import Services from '../../services/index';
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    searchValue: '',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    sportsInfoText: ' 已经坚持运动3天！',
    readingInfoText: '已经读完3本书！',
    messageList: [
      { url: '/images/home_reading.png', name: '赵阳', message: '天气不错！' },
      { url: '/images/home_reading.png', name: '赵阳', message: '天气不错！' },
      { url: '/images/home_reading.png', name: '赵阳', message: '天气不错！' },
      { url: '/images/home_reading.png', name: '赵阳', message: '天气不错！' }
    ]
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
  /** 向数据库添加数据 */
  async addPlan(data) {

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

})
