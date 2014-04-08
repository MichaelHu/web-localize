
function requireSync(info, id){
    var type = info.type.toLowerCase();

    switch(type){
        case 'css':
            requireSync_css(info, id);
            break;

        case 'js':
            globalExecuteOrder.push(id);
            requireSync_js(info, id);
            break;
    }

}

function requireSync_css(info, id){
    document.write([
        '<link rel="stylesheet" type="text/css" id="'
        , id
        , '"'
        , ' href="'
        , info.fullPath 
        , '" />'
    ].join(''));

    setTimeout(function(){
        saveToLocal(info);
    }, 1000);
}

function requireSync_js(info, id){

    setTimeout(function(){

        util_xhr_getJs({
            url: info.fullPath
            , info: info
            , id: id
            , success: function(data){
                console.log('save ' + info.fullPath);
                setTimeout(function(){
                    saveToLocal(info, data);
                }, 1000);
            } 
        });

    }, 0);
}
