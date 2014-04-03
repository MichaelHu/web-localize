
function requireSync(info, id){
    var type = info.type.toLowerCase();

    switch(type){
        case 'css':
            requireSync_css(info, id);
            break;

        case 'js':
            requireSync_css(info, id);
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
    }, 500);
}


