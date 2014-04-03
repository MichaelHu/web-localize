window.WL = (function(){

var confPrefix = 'WL';
var confAppName = '';

__inline("./resourceinfo.js");

function localize(id){
    var url = getURL(id),
        info = resourceInfo_getResourceInfo(url);

    if(exists(info)){
        process(info, id); 
    }
    else{
        requireSync(info);
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

function process(info, id){
    var key = resourceInfo_getResourceKey(info),
        data = JSON.parse(
            localStorage.getItem(key)
        ),
        cssText = [];

    for(var i in data.content){
        cssText.push(data.content[i]); 
    }

    document.write([
        '<style tyle="text/css" id="'
        , id
        , '">'
        , cssText.join('\n') 
        , '</style>'
    ].join(''));
}


function requireSync(info, id){
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

function saveToLocal(info){
    var url = info.fullPath,
        key = resourceInfo_getResourceKey(info),
        sheets = document.styleSheets,
        len = sheets.length,
        sheet = null;

    for(var i=0; i<len; i++){
        if(sheets.item(i).href == url){
            sheet = sheets.item(i);
            break;
        }
    }

    /**
     * 如果第三方css文件，出于安全问题，获取不到CSSStyleSheet.cssRules
     * 或CSSStyleSheet.rules，这两个值皆为null
     * 故需要同时检测是否为null
     * 同时，需要本地化的css文件需放置在相同域名下
     */
    if(sheet && sheet.rules){
        var rules = sheet.rules,
            rulesLen = rules.length,
            cssTextJSON = {};

        for(var i=0; i<rulesLen; i++){
            cssTextJSON[i] = rules.item(i).cssText;
        }

        localStorage.setItem(key, JSON.stringify({
            md5: info.md5
            , content: cssTextJSON
        }));
    }
    else{
        // 仅当同域才进行再次尝试
        if(isSameDomain(url)){
            setTimeout(function(){
                saveToLocal(info);
            }, 500);
        }
    }
}

function isSameDomain(url){
    var hostName = url.match(/https?\:\/\/([^\/]+)/i)[1];
    console.log(hostName);
    return hostName == location.hostname;
}

return {
    localize: localize
};

})();
