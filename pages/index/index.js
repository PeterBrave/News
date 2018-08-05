//采用常量的方式定义新闻类别
const newsTagMap = ['gn','gj','cj','yl','js','ty','other']
Page({
  data: {
    //定义swiper高度
    winHeight: '',
    currentTab: 0,
    scrollLeft: 0,
    newsList: [],
    newsTag: 'gn',
    newsTagCN: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他']
  },
  //滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current,
      newsTag: newsTagMap[e.detail.current]
    });
    this.checkCor();
    this.getNews();
    //console.log(newsTagMap[e.detail.current])
  },
  //点击标题切换当前页时改变样式
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
  //判断当前滚动超过一屏时，设置tab标题滚动条。
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
  //点击切换到新闻详情页，并将新闻ID传给list页面
  onTapNewsDetail: function(e) {
    let newsListIndex = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/list/list?id=' + this.data.newsList[newsListIndex].id
    })
    //console.log(e.currentTarget.dataset.index)
  },
  //下拉刷新
  onPullDownRefresh() {
    //wx.showNavigationBarLoading()
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad: function () {
    this.getNews();
  },
  //通过API获取新闻
  getNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.newsTag
      },
      success: res => {
        //console.log(res)
        //格式化日期时间
        let result = res.data.result
        for (let i = 0; i < result.length; i++) {
          let b = new Date(result[i].date)
          let hour = b.getUTCHours().toString().padStart(2, '0')
          let minutes = b.getUTCMinutes().toString().padStart(2, '0')
          result[i].date = `${hour}:${minutes}`
          //添加默认新闻图片
          let firstImg = result[i].firstImage
          if (firstImg === '') {
            result[i].firstImage = '/images/news-default.gif'
          }
          //添加默认来源信息
          let newsSource = result[i].source
          if (newsSource === '') {
            result[i].source = '未知来源'
          }
        }
        //自适应swiper高度
        let newsNumber = result.length - 1
        let swiperHeight = 460 + newsNumber * 180 + 64
        this.setData({
          newsList: result,
          winHeight: swiperHeight
        })
      },
      //用于下拉刷新的回调函数
      complete: () => {
        callback && callback()
      }
    })
  }
})
