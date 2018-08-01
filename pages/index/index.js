Page({
  data: {
    _num: 0,
    newsList: []
  },
  clickNum: function (e) {
    //console.log(e.target.dataset.num)
    this.setData({
      _num: e.target.dataset.num
    })
  },
  onLoad: function () {
      wx.request({
        url: 'https://test-miniprogram.com/api/news/list',
        data: {
          type: 'gn'
        },
        success: res => {
          //console.log(res)
          let result = res.data.result
          for (let i=0; i<result.length; i++) {
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
      // console.log(this.data.newsList[0].date.substring(11,16))
  }

})
