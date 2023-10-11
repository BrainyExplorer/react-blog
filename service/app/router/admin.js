module.exports = app => {
    const {
        router,
        controller
    } = app
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index', controller.admin.main.index)
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)
    router.post('/admin/addType',adminauth,controller.admin.main.addType)
    router.get('/admin/delType/:id',adminauth,controller.admin.main.delType),
    router.get('/admin/getTypeInfo',adminauth,controller.admin.main.getTypeInfo)
    router.post('/admin/updateTypeById',adminauth,controller.admin.main.updateTypeById)
    router.post('/admin/addArticle',adminauth,controller.admin.main.addArticle)
    router.post('/admin/updateArticle',adminauth,controller.admin.main.updateArticle)
    router.get('/admin/getArticleList',adminauth,controller.admin.main.getArticleList)
    router.get('/admin/delArticle/:id',adminauth,controller.admin.main.delArticle)
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.main.getArticleById)
}