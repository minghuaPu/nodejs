/**
 * Created by Administrator on 2015/11/17.
 */
var superagent= require('superagent');
var cheerio= require('cheerio');
var url = require('url');

var qs = require('querystring');
 var http = require('http');
var cnodeUrl="";// = 'https://cnodejs.org/';
var url_type="";// = 'https://cnodejs.org/';
var iconv = require('iconv-lite');

var BufferHelper = require('bufferhelper');
var CnBlog=function(url,meme){
    cnodeUrl=url;
    url_type=meme;
};
 var items = [];
CnBlog.prototype={
    
    zhuadataXML:function(cnodeUrl,sdf,mccc,page){

            http.get(cnodeUrl, function(res) {
                var size = 0;
                var chunks = [];
              res.on('data', function(chunk){
                  size += chunk.length;
                  chunks.push(chunk);
              });
              res.on('end', function(){
                  var data = Buffer.concat(chunks, size);
                  var sdfsdf=data.toString();
                        url_type=sdf;

                   
                      var jsonobj=eval('('+sdfsdf+')');


                    if (url_type=='3') {
                          
                               var $ = cheerio.load(jsonobj.html);
                                $('section').each(function (idx, element) {
                            var $element = $(element);
                           // console.log($element);
                            // var type=$element.parent().parent().find('.topiclist-tab').text();
                                items.push({
                                    title: $element.find('h3').text(),
                                    href: $element.find('.article_link').attr('href'),
                                    link:url.resolve(cnodeUrl, $element.find('.article_link').attr('href')),
                                    image:  $element.find('.list_img_holder img').attr('src'),
                                    type:'今日头条'
                                });
                            
                        });
                    }else  if (url_type=='8') {
                        if (jsonobj.data.article_ids) {
                         var blog=new CnBlog('','天涯80后');
                         var sdfsdf=jsonobj.data.article_ids.toString();
                         var wersd= sdfsdf.split(',');
                         var mms='';
                         var dh='';

                         for (i=10*(page-1);i<10*page ;i++ )
                            { 
                                mms+=dh+wersd[i];
                                dh=',';
                            }
                         blog.zhuadataXML('http://zzd.sm.cn/iflow/api/v1/article?aid=['+mms+']','9',2);

                         // mmt='http://zzd.sm.cn/iflow/api/v1/article?aid=['+jsonobj.data.article_ids+']';

                        };

                    }else  if (url_type=='9') {
                      
                       var sdfd=jsonobj.data.items;
                       for(msdf in sdfd){
                            items.push({
                                    title:sdfd[msdf]['title'],
                                    href: sdfd[msdf]['url'],
                                    link:sdfd[msdf]['url'],
                                    // image:  $element.find('.list_img_holder img').attr('src'),
                                    type:'神马搜索'
                                });
                            
                       }

                    }else  if (url_type=='10') {
                            var imgsdr='';
                      
                       var sdfd=jsonobj.data.articles;
                       for(msdf in sdfd){
                            imgsdr='';
                        if (sdfd[msdf]['thumbnails']) {
                            var myobj=eval(sdfd[msdf]['thumbnails']);
                            if (myobj[0]) {
                              imgsdr=myobj[0].url;

                            }else{
                                // console.log(sdfd[msdf]['thumbnails']);
                            }
                        };
                        // console.log(imgsdr);
                            if (imgsdr) {
                                items.push({
                                        title:sdfd[msdf]['title'],
                                        href: sdfd[msdf]['url'],
                                        link:sdfd[msdf]['url'],
                                        image:imgsdr,
                                        type:'神马'+page
                                    });
                            }else{
                                items.push({
                                        title:sdfd[msdf]['title'],
                                        href: sdfd[msdf]['url'],
                                        link:sdfd[msdf]['url'],
                                        type:'神马'+page
                                    });
                            }
                            
                            
                       }

                    }else  if (url_type=='11') {
                            var imgsdr='';
                      
                       var sdfd=jsonobj.data;
                       for(msdf in sdfd){
                            imgsdr='';
                        if (sdfd[msdf]['image_list']) {
                            var myobj=eval(sdfd[msdf]['image_list']);
                            if (myobj[0]) {
                              imgsdr=myobj[0].url;

                            }else{
                                // console.log(sdfd[msdf]['thumbnails']);
                            }
                        };
                        // console.log(imgsdr);
                            if (imgsdr) {
                                items.push({
                                        title:sdfd[msdf]['title'],
                                        href: sdfd[msdf]['article_url'],
                                        link:sdfd[msdf]['article_url'],
                                        image:imgsdr,
                                        type:'头条'+page
                                    });
                            }else{
                                items.push({
                                        title:sdfd[msdf]['title'],
                                        href: sdfd[msdf]['article_url'],
                                        link:sdfd[msdf]['article_url'],
                                        type:'头条'+page
                                    });
                            }
                            
                            
                       }

                    }


              });
            }).on('error', function(e) {
              console.log("Got error: " + e.message);
              
            });

            

    },
     zhuadataGBK:function(cnodeUrl,sdf,mccc){

        http.get(cnodeUrl,function(res){
              var bufferHelper = new BufferHelper();
              res.on('data', function (chunk) {
                bufferHelper.concat(chunk);
              });
              
              res.on('end',function(){ 
                var wer=iconv.decode(bufferHelper.toBuffer(),'GBK');
                 var $ = cheerio.load(wer);
                url_type=sdf;

                if (url_type=='21') {
                          
                     $('.c_tit a').each(function (idx, element) {
                        var $element = $(element); 
                            items.push({
                                title: $element.text(),
                                href: $element.attr('href'),
                                link:url.resolve(cnodeUrl, $element.attr('href')),
                                type:mccc
                            });
                        
                    });
                    

                }else if (url_type=='22') {
                          
                     $('.rb').each(function (idx, element) {
                        var $element = $(element); 
                            items.push({
                                title: $element.find('h3 a').text(),
                                href: $element.find('h3 a').attr('href'),
                                link:url.resolve(cnodeUrl, $element.find('h3 a').attr('href')),
                               type:'搜狗'
                            });
                        
                    });
                    

                }else if (url_type=='23') {
                          
                     $('.areabg1 .left .active .red a').each(function (idx, element) {
                        var $element = $(element); 
                            items.push({
                                title: $element.text(),
                                href: $element.attr('href'),
                                link:url.resolve(cnodeUrl, $element.attr('href')),
                               type:mccc
                            });
                        
                    });
                    

                }else if (url_type=='24') {
                          
                     $('.info-title').each(function (idx, element) {
                        var $element = $(element); 
                            items.push({
                                title: $element.text(),
                                href: $element.attr('href'),
                                link:url.resolve(cnodeUrl, $element.attr('href')),
                               type:mccc
                            });
                        
                    });

                }else if (url_type=='25') {
                          
                     $('.box-result h2 a').each(function (idx, element) {
                        var $element = $(element); 
                            items.push({
                                title: $element.text(),
                                href: $element.attr('href'),
                                link:url.resolve(cnodeUrl, $element.attr('href')),
                               type:'新浪搜索'
                            });
                        
                    });

                }

          });
        })

    },

    zhuadata:function(cnodeUrl,sdf,mccc,gjcc){ 

    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
      superagent.get(cnodeUrl)
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }

            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            
        url_type=sdf;
 
           
            if (url_type=='1') {
                   // console.log(sres.text);

                 $('.searchListOne li').each(function (idx, element) {
                    var $element = $(element);
                   // console.log($element);
                    // var type=$element.parent().parent().find('.topiclist-tab').text();
                    if ($element.find('h3 a').attr('href')) {
                        items.push({
                            title: $element.text(),
                            href: $element.find('h3 a').attr('href'),
                            link:url.resolve(cnodeUrl, $element.find('h3 a').attr('href')),
                            type:'天涯'
                        });
                    };
                    
                });
            }else if (url_type=='2') {
                // console.log(sres.text);
                 $('.txt-box h4 a').each(function (idx, element) {
                    var $element = $(element);
                   // console.log($element);
                    // var type=$element.parent().parent().find('.topiclist-tab').text();
                        items.push({
                            title: $element.text(),
                            href: 'http://weixin.sogou.com/weixin?type=2&query=30%E5%B2%81',
                            link:'http://weixin.sogou.com/weixin?type=2&query=30%E5%B2%81',
                            type:'微信搜索'
                        });
                    
                });
            }else if (url_type=='31') {
                // console.log(sres.text);
                 $('.wx-news-info2').each(function (idx, element) {
                    var $element = $(element);
                   // console.log($element);
                    // var type=$element.parent().parent().find('.topiclist-tab').text();
                        items.push({
                            title: $element.find('h4 a').text(),
                            href: $element.find('h4 a').attr('href'),
                            link:$element.find('h4 a').attr('href'),
                            image: $element.parent().find('.wx-img-box img').attr('src'),
                            type:'微信'+gjcc
                        });
                    
                });
            }else if (url_type=='3') {
                // console.log(sres.text);
                     $('.list_content section').each(function (idx, element) {
                            var $element = $(element);
                           // console.log($element);
                            // var type=$element.parent().parent().find('.topiclist-tab').text();
                                items.push({
                                    title: $element.find('h3').text(),
                                    href: $element.find('.article_link').attr('href'),
                                    link:url.resolve(cnodeUrl, $element.find('.article_link').attr('href')),
                                    image:  $element.find('.list_img_holder img').attr('src'),
                                    type:'今日头条'
                                });
                            
                        });
            }else if (url_type=='4') {
                // console.log(sres.text);
                 $('.title a').each(function (idx, element) {
                    var $element = $(element);
                   // console.log($element);
                    // var type=$element.parent().parent().find('.topiclist-tab').text();
                        items.push({
                            title: $element.text(),
                            href: $element.attr('href'),
                            link:url.resolve(cnodeUrl, $element.attr('href')),
                            type:'豆瓣'
                        });
                    
                });
            }else if (url_type=='5') {
                // console.log(sres.text);
                 $('.c-title a').each(function (idx, element) {
                    var $element = $(element);
                   // console.log($element);
                    // var type=$element.parent().parent().find('.topiclist-tab').text();
                        items.push({
                            title: $element.text(),
                            href: $element.attr('href'),
                            link:url.resolve(cnodeUrl, $element.attr('href')),
                            type:'百度新闻'
                        });
                    
                });
            }else if (url_type=='6') {
                     
                 
                 $('h3 .news_title').each(function (idx, element) {
                    var $element = $(element); 
                     
                        items.push({
                            title:  $element.text(),
                            href: $element.attr('href'),
                            link:url.resolve(cnodeUrl, $element.attr('href')),
                            type:'360搜索'
                        });
                    
                });
            }else if (url_type=='7') { 
                     
                 
                 $('.news_lst2 li').each(function (idx, element) {
                    var $element = $(element); 

                        items.push({
                            title:  $element.find('.news_txt_box2 p').not('.news_lst_txt3').text(),
                            href: $element.find('.news_txt_box2 p').attr('href'),
                            // image: 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+imgsrc,
                            link:'http://weixin.sogou.com/weixinwap?type=2&query='+mccc,
                            type:'微信'
                        });
                    
                });
            }else if (url_type=='8') {
                // console.log(sres.text);
                     
                 
                 $('.result-about-list h4 a').each(function (idx, element) {
                    var $element = $(element); 
                     
                        items.push({
                            title:  $element.text(),
                            href: $element.attr('href'),
                            link:url.resolve(cnodeUrl, $element.attr('href')),
                            type:'知乎'
                        });
                    
                });
            }else if (url_type=='9') {
                 
                 $('.reItem').each(function (idx, element) {
                    var $element = $(element); 
                     
                        items.push({
                            title:  $element.find('h2 a').text(),
                            href: $element.find('h2 a').attr('href'),
                            image:$element.find('.imgVM img').attr('src'),
                            link:url.resolve(cnodeUrl, $element.find('h2 a').attr('href')),
                            type:'国搜'
                        });
                    
                });
            }else{
                  $('.td-title a').each(function (idx, element) {
                    var $element = $(element);
                    // var type=$element.parent().parent().find('.topiclist-tab').text();
                    items.push({
                        title: $element.text(),
                        href: $element.attr('href'),
                        link:url.resolve(cnodeUrl, $element.attr('href')),
                        type:url_type
                    });
                });
            }
          
          
            // return items;
            // res.send(items);
            // console.log(items);


           
        });
    },

    getData:function(res,page,tab,category){ 
         res.render('list',{
                title:'筋斗云文章',
                items:items,
                page:page,
                category:category,
                tab:tab
            });     
            items=[];
    }
}

module.exports=CnBlog