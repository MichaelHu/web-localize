window.WL = (function(){

var confPrefix = 'WL';
var confAppName = '';

__inline("./util.js");
__inline("./resourceinfo.js");
__inline("./savetolocal.js");
__inline("./process.js");
__inline("./requiresync.js");

function localize(id){
    var url = getURL(id),
        info = resourceInfo_getResourceInfo(url);

    if(exists(info)){
        process(info, id); 
    }
    else{
        requireSync(info, id);
    }
}

function getURL(id){
    var el = document.getElementById(id),
        url = el.href;
    
    el.parentNode.removeChild(el);
    return url;
}

function exists(info){
    var key = resourceInfo_getResourceKey(info),
        str, data;

    if(str = localStorage.getItem(key)){
        data = JSON.parse(str);
        if(data.md5 == info.md5){
            return true;
        }
        localStorage.removeItem(key);
    } 
    return false;
}


return {
    localize: localize
};

})();
