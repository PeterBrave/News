Page({

  data: {
    newsId: '1523074607642',
    newsDetail: []
  },
  onLoad: function (options) {
    //console.log(options.id)
    this.setData({
      newsId: options.id
    })
    this.getNewsDetail()
  },
  getNewsDetail() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.newsId
      },
      success: res => {
        let result = res.data.result
        //console.log(result)
        let b = new Date(result.date)
        let hour = b.getUTCHours().toString().padStart(2, '0')
        let minutes = b.getUTCMinutes().toString().padStart(2, '0')
        result.date = `${hour}:${minutes}`
        //console.log(result)
        this.setData({
          newsDetail: result
        })
      }
    })
  },
  navBack: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})