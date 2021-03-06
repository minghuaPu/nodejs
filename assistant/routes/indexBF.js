var express = require('express');
var router = express.Router();

 

var cnblog=require('../spiders/cnblog');




/* GET home page. */
router.get('/new', function(req, res, next) {

/*        express获取参数有三种方法：官网介绍如下

        Checks route params (req.params), ex: /user/:id
        Checks query string params (req.query), ex: ?id=12
        Checks urlencoded body params (req.body), ex: id=

        1、例如：127.0.0.1:3000/index，这种情况下，我们为了得到index，我们可以通过使用req.params得到，通过这种方法我们就可以很好的处理Node中的路由处理问题，同时利用这点可以非常方便的实现MVC模式；

        2、例如：127.0.0.1:3000/index?id=12，这种情况下，这种方式是获取客户端get方式传递过来的值，通过使用req.query.id就可以获得，类似于PHP的get方法；

        3、例如：127.0.0.1:3000/index，然后post了一个id=2的值，这种方式是获取客户端post过来的数据，可以通过req.body.id获取，类似于PHP的post方法；*/
    var page=req.query.page;
    var tab=req.query.tab;
    var requestUrl=  'http://bbs.tianya.cn/list-210-1.shtml';
    var blog=new cnblog(requestUrl,'天涯80后');

        var more_num=req.query.more_num;
    
        

        if (tab==undefined) {
            tab='保险';
        }
        if (page==undefined) {
           
            page=1;

        }


        if (more_num==1) {

            blog.zhuadataXML('http://zzd.sm.cn/iflow/api/v1/article/search?query='+encodeURI(tab),'8',tab,page);
         
            blog.zhuadata('http://zhihu.sogou.com/zhihu?p=42351201&query='+tab+'&page='+page,'8',tab);
        
            // blog.zhuadataGBK('http://news.sogou.com/news?query='+ encodeURI(tab)+'&page='+page+'&x=29&y=21&mode=1','22',tab);
            blog.zhuadata('http://news.chinaso.com/search?wd='+tab+'&page='+page,'9',tab); 
            

        }else{
            blog.zhuadata('http://weixin.sogou.com/weixinwap?type=2&query='+tab+'&page='+page,'7',tab);
            blog.zhuadata('http://news.baidu.com/ns?word='+tab+'&pn='+(page-1)*20+'&sr=0&cl=2&rn=20&tn=news&ct=1&clk=sortbyrel','5',tab);
            if (page>1) {
                 blog.zhuadataXML('http://m.toutiao.com/search_content/?offset='+(page-1)*20+'&count=10&from=search_tab&keyword='+encodeURI(tab),'3',tab);
            }else{
                blog.zhuadata('http://m.toutiao.com/search/?keyword='+tab,'3',tab);
            }


        }

       
 
    // blog.zhuadata(requestUrl,'天涯80后');

   var timeout_ms =800; // 2 seconds

                   var timeout = setTimeout(function() {

                           blog.getData(res,page,tab,-1);

                   }, timeout_ms);
    
    
  //res.render('index', { title: 'Express' });

});

router.get('/wx', function(req, res, next) {


    var page=req.query.page;
    var tab=req.query.tab;
    var category=req.query.category;
    var requestUrl=  'http://bbs.tianya.cn/list-210-1.shtml';
    var blog=new cnblog(requestUrl,'天涯80后');
    tab='9999';

     if (page==undefined) {
         page=0;
    }

        if (category==undefined || category==0) {
            if (page==0) {

                 blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_3/pc_3.html','31',tab,'养生堂');
                blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_0/pc_0.html','31',tab,'热门');
                blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_1/pc_1.html','31',tab,'推荐');
            }else{

                 blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_3/'+page+'.html','31',tab,'养生堂');
                blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_0/'+page+'.html','31',tab,'热门');
                blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_1/'+page+'.html','31',tab,'推荐');
            }
             category=1;
              
        }else if (category==1) {
            if (page==0) {

                 blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_13/pc_13.html','31',tab,'旅行帮');
                 blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_11/pc_11.html','31',tab,'辣妈帮');
                 blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_15/pc_15.html','31',tab,'美食家');
            }else{

                 blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_13/'+page+'.html','31',tab,'旅行帮');
                 blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_11/'+page+'.html','31',tab,'辣妈帮');
                 blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_15/'+page+'.html','31',tab,'美食家');
             }
             category=2;
        }else if (category==2) {
            if (page==0) {

             blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_19/pc_19.html','31',tab,'体育迷');
             blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_9/pc_9.html','31',tab,'科技咖');
             blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_7/pc_7.html','31',tab,'财经迷');
            }else{

             blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_19/'+page+'.html','31',tab,'体育迷');
             blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_9/'+page+'.html','31',tab,'科技咖');
             blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_7/'+page+'.html','31',tab,'财经迷');
             
            }category=0;
        };

    
        
    // blog.zhuadata(requestUrl,'天涯80后');

   var timeout_ms = 800; // 2 seconds

                   var timeout = setTimeout(function() {

                           blog.getData(res,page,tab,category);

                   }, timeout_ms);
    
    
  //res.render('index', { title: 'Express' });

});


/* GET home page. */
router.get('/', function(req, res, next) {

 
    var page=req.query.page;
    var tab=req.query.tab;
    var requestUrl=  'http://bbs.tianya.cn/list-210-1.shtml';
    var blog=new cnblog(requestUrl,'天涯80后');
 tab='';
    // if(page==2){
    //     blog.zhuadata('http://bbs.tianya.cn/list-210-1.shtml','天涯80后','22');
    //     blog.zhuadata('http://bbs.tianya.cn/list-oldgirl-1.shtml','三十岁不嫁','22');
    //     blog.zhuadata('http://bbs.tianya.cn/list-166-1.shtml','爱情诊所','22');

    //     blog.zhuadata('http://search.tianya.cn/bbs?q=%E5%A5%94%E4%B8%89&s=4&f=0','1','奔三');
    //     blog.zhuadata('http://search.tianya.cn/bbs?q=30%E5%B2%81','1','30岁');

    // }else if(page==3){
    //     blog.zhuadata('http://www.douban.com/interest/2/34/','4','自我管理');
    //     blog.zhuadata('http://www.douban.com/interest/2/25/','4','情感');
    //     blog.zhuadata('http://www.douban.com/interest/2/24/','4','成长');
    //     blog.zhuadata('http://weixin.sogou.com/weixin?type=2&query=30%E5%B2%81','2','30岁');
    //     blog.zhuadata('http://m.toutiao.com/search/?keyword=30%E5%B2%81','3','30岁');
    //     blog.zhuadata('http://m.toutiao.com/search/?keyword=%E6%84%9F%E6%83%85','3','感情');
    //     blog.zhuadata('http://m.toutiao.com/search/?keyword=%E5%A9%9A%E5%A7%BB','3','婚姻');

    // }else if(page==4){
    //     blog.zhuadataGBK('http://roll.news.sina.com.cn/s/channel.php?ch=01#col=90,92,95&spec=&type=&ch=01&k=&offset_page=0&offset_num=0&num=40&asc=&page=1','21','新浪最新新闻');
    //     blog.zhuadataGBK('http://money.163.com/special/002526BH/rank.html','23','网易财经热文');
    //     blog.zhuadataGBK('http://news.163.com/special/0001386F/rank_travel.html','23','网易旅游热文');
    //     blog.zhuadataGBK('http://news.163.com/special/0001386F/rank_whole.html','23','网易全站热文');
    //     blog.zhuadataGBK('http://top.baidu.com/buzz?b=341','24','百度今日热点');
    //     blog.zhuadataGBK('http://top.baidu.com/buzz?b=1','24','百度实时热点');


    // }else{
 
        var more_num=req.query.more_num;

        if (more_num==1 || page=='refresh') {

         blog.zhuadataXML('http://zzd.sm.cn/iflow/api/v1/channel/472933935?app=webapp&uc_param_str=dnnivebichfrmintcpgieiwidsudpf&ve=1.8.0.0&sn=3750301124663048856&method=new&ftime=1450254953005&count=20','10',tab,'健康');
         blog.zhuadataXML('http://zzd.sm.cn/iflow/api/v1/channel/100?app=webapp&uc_param_str=dnnivebichfrmintcpgieiwidsudpf&ve=1.8.0.0&sn=3750301124663048856&method=new&ftime=1450254953005&count=20','10',tab,'推荐');
         blog.zhuadataXML('http://zzd.sm.cn/iflow/api/v1/channel/1911322354?app=webapp&uc_param_str=dnnivebichfrmintcpgieiwidsudpf&ve=1.8.0.0&sn=3750301124663048856&method=new&ftime=1450254953005&count=20','10',tab,'干货');

        } else if (more_num==2) {

                blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_0/'+page+'.html','31',tab,'热门');
                blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_1/'+page+'.html','31',tab,'推荐');
                 blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_3/pc_3.html','31',tab,'养生堂');

        }else if(more_num==3 ){

             blog.zhuadataXML('http://toutiao.com/api/article/recent/?source=2&category=news_regimen&utm_source=toutiao&offset=0&max_behot_time=0','11',tab,'养生');
             blog.zhuadataXML('http://toutiao.com/api/article/recent/?source=2&category=news_essay&utm_source=toutiao&offset=0&max_behot_time=0','11',tab,'美文');
             blog.zhuadataXML('http://zzd.sm.cn/iflow/api/v1/channel/100?app=webapp&uc_param_str=dnnivebichfrmintcpgieiwidsudpf&ve=1.8.0.0&sn=3750301124663048856&method=new&ftime=1450254953005&count=20','10',tab,'推荐');
            
        }
         if (page==undefined && more_num==undefined) {
            
             blog.zhuadata('http://weixin.sogou.com','31',tab,'热门');
             blog.zhuadataXML('http://zzd.sm.cn/iflow/api/v1/channel/100?app=webapp&uc_param_str=dnnivebichfrmintcpgieiwidsudpf&ve=1.8.0.0&sn=3750301124663048856&method=new&ftime=1450254953005&count=20','10',tab,'推荐');

              blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_1/pc_1.html','31',tab,'推荐');


        }

         // blog.zhuadata('http://weixin.sogou.com/pcindex/pc/pc_7/pc_7.html','31',tab,'财经');



        // blog.zhuadataGBK('http://roll.news.sina.com.cn/s/channel.php?ch=01#col=90,92,95&spec=&type=&ch=01&k=&offset_page=0&offset_num=0&num=40&asc=&page=1','21','新浪新闻');
        // blog.zhuadataGBK('http://money.163.com/special/002526BH/rank.html','23','网易财经');
        // blog.zhuadataGBK('http://news.163.com/special/0001386F/rank_travel.html','23','网易旅游');
        // blog.zhuadataGBK('http://news.163.com/special/0001386F/rank_whole.html','23','网易全站');
        // blog.zhuadataGBK('http://top.baidu.com/buzz?b=341','24','百度今日热点');
        // blog.zhuadataGBK('http://top.baidu.com/buzz?b=1','24','百度实时热点');
       
        // }
 
    // blog.zhuadata(requestUrl,'天涯80后');

   var timeout_ms = 800; // 2 seconds

                   var timeout = setTimeout(function() {

                           blog.getData(res,0,tab,-2);

                   }, timeout_ms);
    
    
  //res.render('index', { title: 'Express' });

});

router.get('/test', function(req, res, next) {

 
    var page=req.query.page;
    var tab=req.query.tab;
    var requestUrl=  'http://bbs.tianya.cn/list-210-1.shtml';
    var blog=new cnblog(requestUrl,'天涯80后');
     tab='';
   
 
    
    
  res.render('index', { title: 'Express' });

});
 
module.exports = router;
