/**
 * Created by Administrator on 2016/8/2.
 */
var mongoose = require('mongoose');    //引用mongoose模块
var uuid = require('node-uuid');
var db = mongoose.createConnection('localhost','newbloguser'); //创建一个数据库连接
db.on('error',console.error.bind(console,'连接错误:'));

var CategorySchema = new mongoose.Schema({
    name:String,
    alias:String,
    parent:String,
    describe:String,
    Articlevolume: { type: Number, default: 0 },
    childlist:[]
});
var CategoryModel = db.model('newblogcategory',CategorySchema);

exports.categorylist = function (req, res) {
    CategoryModel.execPageQuery(1,20,function(err,rel){
        if(err)
        {
            req.flash('error', '请求失败');
            return res.redirect('/category');
        }
        res.render('admin/category', {
            title: '分类列表',
            category:rel.rows,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        })
    });
};


exports.addcategorypage = function (req, res) {


    CategoryModel.find(function(err,category){
        //查询到的所有category

        if(err)
        {
            req.flash('error', '分类请求失败');
            return res.redirect('/addcategory');
        }
        res.render('admin/addcategory', {
            title: '增加分类',
            category:category,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        })

    });






};


exports.addcategory = function (req, res) {

    if(req.body.parent!="-1"){




        CategoryModel.findById(req.body.parent, function (err, Category) {
            var ObjectId = uuid.v1();
            var data ={id:ObjectId,name:req.body.name, alias:req.body.alias, parent:req.body.parent, describe:req.body.describe}
         //   console.log(ObjectId)
            Category.childlist.push(data)
            Category.save(function(err){
                if(err){
                    req.flash('error', '添加类别失败');
                    return res.redirect('/addcategory');
                }
                else
                {
                    req.flash('success', '添加成功！');
                    return res.redirect('/category');
                }
            });
        });





      //  console.log(req.body.parent)

      //  var data = {childlist:{}}


       // var User = mongoose.model("User");
     //   var Category =  CategoryModel.findOne({'_id': req.body.parent});
     //   console.log(Category);

    //    Category.childlist = {name:req.body.name, alias:req.body.alias, parent:req.body.parent, describe:req.body.describe};


//{ _id: ObjectId("……"), name: "test", gender: true }
       // user.name = "test1";
      //  user.school = "华南理工大学";
      //  console.log(user);
//{ _id: ObjectId("……"), name: "test1", gender: true }
      //  Category.save();


     //   CategoryModel.findOneAndUpdate({
       //     '_id': req.body.parent
      //  }, data, null, function(err, results) {
        //    if (err) {
             //   return res.json(500, err);
        //    }

           // console.log(results)
 // #在此操作代码
       // });



       // CategoryModel.findOneAndUpdate([conditions], [update], [options], [callback])


    //    var childlist = {childlist:[{name:req.body.name, alias:req.body.alias, parent:req.body.parent, describe:req.body.describe}]};
      //  CategoryModel.create(childlist,callback);
       // CategoryModel.findByIdAndUpdate(req.body.parent,{$set:{name2:'MDragon'}},function(err,person){
          //  console.log(person.name2); //MDragon
      //  });

      //  var str=req.body.parent;
      //  CategoryModel.update({'_id' : req.body.parent}, {'$set':{'age':'haha'} }  );

       // CategoryModel.findOne({ '_id' : req.body.parent}, function (err, category) {
           // console.log(category)
      //  })
      //  CategoryModel.update({'_id':req.body.parent}, {'$push':{'childlist':[
              //  {
                //    name:req.body.name,
                 //   alias:req.body.alias,
                 //   parent:req.body.parent,
                 //   describe:req.body.describe
             //   }
          //  ]}
     //   });
       // CategoryModel.update({'_id':req.body.parent}, {'$addToSet':{'array':10} }  );

    }

    else
    {
        var CategoryEntity = new CategoryModel({name:req.body.name,alias:req.body.alias,parent:req.body.parent,describe:req.body.describe});
        CategoryEntity.save(function(err){
            if(err){
                req.flash('error', '添加类别失败');
                return res.redirect('/addcategory');
            }
            else
            {
                req.flash('success', '添加成功！');
                return res.redirect('/category');
            }
        });
    }



};