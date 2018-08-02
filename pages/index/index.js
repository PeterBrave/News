Page({
  data: {
    _num: 0,
    newsList: [],
    newsTag: 'gn'
  },
  clickNum: function (e) {
    //console.log(e.target.dataset.num)
    let num = e.target.dataset.num
    let tag = ''
    switch(num) {
      case '1': tag = 'gn';
      break;
      case '2': tag = 'gj';
      break;
      case '3': tag = 'cj';
      break;
      case '4': tag = 'yl';
      break;
      case '5': tag = 'js';
      break;
      case '6': tag = 'ty';
      break;
      case '7': tag = 'other';
      break;
    }
    this.setData({
      _num: num,
      newsTag: tag
    })
    this.getNews()
  },
  onLoad: function () {
      this.getNews()
  },
  getNews() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.newsTag
      },
      success: res => {
        //console.log(res)
        let result = res.data.result
        for (let i = 0; i < result.length; i++) {
          let b = new Date(result[i].date)
          let hour = b.getUTCHours().toString().padStart(2, '0')
          let minutes = b.getUTCMinutes().toString().padStart(2, '0')
          result[i].date = `${hour}:${minutes}`
        }
        //console.log(result)
        this.setData({
          newsList: result
        })
      }
    })
  }


})
