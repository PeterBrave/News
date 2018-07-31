Page({
  data: {
    _num: 0,
  },
  clickNum: function (e) {
    //console.log(e.target.dataset.num)
    this.setData({
      _num: e.target.dataset.num
    })
  },
  onLoad: function (options) {

  }

})
