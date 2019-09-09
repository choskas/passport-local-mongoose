const New = require('../models/New')

exports.getNews = async (req, res) => {
  const news = await New.find().populate('author')
  let user = null
  if (req.user) {
    user = req.user.role === 'ADMIN'
  }
  res.render('news/news', {
    news,
    user
  })
}
exports.createNew = async (req, res) => {
  const {
    title,
    body
  } = req.body
  const {
    _id
  } = req.user

  await New.create({
    title,
    body,
    author: _id
  })
  res.redirect('/news')
}

exports.createNewForm = (req, res) => {
  res.render('news/create-new')
}

exports.deleteNew = async (req, res) => {
  const {
    id
  } = req.params
  await New.findByIdAndDelete(id)

  res.redirect('/news')
}