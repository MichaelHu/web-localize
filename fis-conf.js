fis.config.merge({
    roadmap : {
        // path : [
        //     {
        //         reg : /^\/.+-aio.*\.css$/i,
        //         release : "/static/news/webapp$&"
        //     },
        //     {
        //         reg : /^\/.+-aio.*\.js$/i,
        //         release : "/static/news/webapp$&"
        //     },
        // ]

        // , domain: {
        //     '**.js': 'http://m.baidu.com'
        //     ,'**.css': 'http://m.baidu.com'
        //     ,'**.png': 'http://m.baidu.com'
        //     ,'**.gif': 'http://m.baidu.com'
        //     ,'**.jpg': 'http://m.baidu.com'
        //     ,'**.jpeg': 'http://m.baidu.com'
        // }
    }
});

fis.config.merge({
    settings : { 
        optimizer : { 
            'uglify-js' : { 
                output : { 
                    /* inline js，单行过长，可能导致smarty解析失败，所以设置最大行大小 */
                    max_line_len : 500 
                }   
            }   

            , 'clean-css' : { 
                keepBreaks : true
            }   
        }   
    }   
});

fis.config.del('modules.optimizer.html');

