
function util_isSameDomain(url){
    var hostName = url.match(/https?\:\/\/([^\/]+)/i)[1];

    // host包含端口号
    return hostName == location.host;
}

function empty(){}

function util_xhr_getJs(option){
    var xhr = new window.XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            xhr.onreadystatechange = empty; 
            if( ( xhr.status >= 200 && xhr.status < 300)
                || xhr.status == 304
                || (xhr.status == 0 && protocol == 'file:')
                ){
                result = xhr.responseText;

                process_js(option.info, option.id, result);
                option.success && option.success(result);
            }
        }
    };

    xhr.open(
        'GET'
        , option.url
        , true // isasync
    );

    xhr.send(null);
}

