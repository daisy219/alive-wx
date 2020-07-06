// miniprogram/pages/sports.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Services from '../../services/index';
import Utils from '../../utils';

Page({
  /**
   * 打卡
   */
  async punch() {
    const params = {
      date: Utils.yyyymmdd(new Date(), '/'),
      time: Utils.hhmm(new Date()),
    }
    try {
      await Services.onAdd('punchRecord', params);
      Toast.success('打卡成功！');

    } catch (err) {
      Toast.fail('打卡失败');
    }
  }
})