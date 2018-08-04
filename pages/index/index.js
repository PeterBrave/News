const newsTagMap = ['gn','gj','cj','yl','js','ty','other']
const newsTagCN = ['国内','国际','财经','娱乐','军事','体育','其他']
Page({
  data: {
    winHeight: '',
    currentTab: 0,
    scrollLeft: 0,
    newsList: [],
    newsTag: 'gn'
  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current,
      newsTag: newsTagMap[e.detail.current]
    });
    this.checkCor();
    this.getNews();
    //console.log(newsTagMap[e.detail.current])
  },
  switchNav: function (e) {
    //console.log(e.target.dataset.num)
    //console.log(e.target.dataset.current)
    let cur = e.target.dataset.current
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur,
      })
    }
  },
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onTapNewsDetail: function(e) {
    let newsListIndex = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/list/list?id=' + this.data.newsList[newsListIndex].id
    })
    //console.log(e.currentTarget.dataset.index)
  },
  onTapHotNewsDetail: function (e) {
    wx.navigateTo({
      url: '/pages/list/list?id=' + this.data.newsList[0].id
    })
    //console.log(e.currentTarget.dataset.index)
  },
  onPullDownRefresh() {
    //wx.showNavigationBarLoading()
    this.getNews(() => {
      wx.stopPullDownRefresh()
    }),
    console.log('pullDown')
  },
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 64;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    this.getNews();
  },
  getNews(callback) {
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
        console.log(result)
        this.setData({
          newsList: result
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})
