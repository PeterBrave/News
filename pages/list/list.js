Page({
  data: {
    newsId: '1523074607642',
    newsDetail: []
  },
  //通过onLoad函数获得传过来的值，并设置newsID
  onLoad: function (options) {
    //console.log(options.id)
    this.setData({
      newsId: options.id
    })
    this.getNewsDetail()
  },
  //通过API获取新闻详情数据
  getNewsDetail() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.newsId
      },
      success: res => {
        let result = res.data.result
        //console.log(result)
        //对数据的日期进行格式化
        let b = new Date(result.date)
        let hour = b.getUTCHours().toString().padStart(2, '0')
        let minutes = b.getUTCMinutes().toString().padStart(2, '0')
        result.date = `${hour}:${minutes}`
        //console.log(result)
        //设置默认的新闻来源
        let newsSource = result.source
        if (newsSource === '') {
          result.source = '未知来源'
        }
        this.setData({
          newsDetail: result
        })
      }
    })
  }
})