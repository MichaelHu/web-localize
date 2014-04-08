
function process(info, id){
    var type = info.type.toLowerCase();

    switch(type){
        case 'css':
            process_css(info, id);
            break;

        case 'js':
            globalExecuteOrder.push(id);
            process_js(info, id);
            break;
    }

}

function process_css(info, id){
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
        , '<' + '/style>'
    ].join(''));
}

function process_js(info, id, content){
    var key = resourceInfo_getResourceKey(info),
        data,
        jsText;

    if(content){
        jsText = content;
    }
    else{
        data = JSON.parse(
            localStorage.getItem(key)
        );
        jsText = data.content;
    }

    if(globalExecuteOrder.indexOf(id) == 0){
        globalExecuteOrder.splice(0, 1);
        try{
            (1, eval)(jsText);
        }
        catch(e){}
    }
    else{
        setTimeout(function(){
            console.log('wait to execute ' + id);
            process_js(info, id, content);
        }, 10);
    }
}


