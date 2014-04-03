
function resourceInfo_getResourceInfo(url){
    var info = {
            fullPath: url
            , path: ''
            , version: ''
            , dir: ''
            , fileName: ''
            , type: ''
            , name: ''
            , md5: ''
        },
        rPath = /^[^\?]+/,
        rVersion = /^[^\?]+\?([^\?]+)/,
        rFileName = /^(.+\/)([^\/]+)$/,
        rType = /^(.+)\.([^\.]+)$/,
        rMd5 = /^(.+)_([^_]{7})$/,
        remain = url,
        match = null;

    if(match = url.match(rPath)){
        info.path = match[0];
    }

    if(match = url.match(rVersion)){
        info.version = match[0];
    }

    info.dir = info.path;
    if(match = info.path.match(rFileName)){
        info.dir = match[1];
        info.fileName = match[2]; 
    }

    remain = info.fileName;
    if(match = info.fileName.match(rType)){
        info.type = match[2]; 
        remain = match[1];
    }

    info.name = remain;
    if(match = remain.match(rMd5)){
        info.md5 = match[2]; 
        info.name = match[1];
    }

    return info;
}

function resourceInfo_getResourceKey(info){
    var key = '';

    key = [
        confPrefix + '_'
        , confAppName + '_'
        , info.dir
        , info.name
        , '.' + info.type
    ].join('');

    return key;
}

