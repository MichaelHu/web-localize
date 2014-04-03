function saveToLocal(info){
    var type = info.type.toLowerCase();

    switch(type){
        case 'css':
            saveToLocal_css(info);
            break;

        case 'js':
            saveToLocal_js(info);
            break;
    }
}

function saveToLocal_css(info){
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
        if(util_isSameDomain(url)){
            setTimeout(function(){
                saveToLocal_css(info);
            }, 500);
        }
    }
}


