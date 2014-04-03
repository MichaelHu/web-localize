
function process(info, id){
    var type = info.type.toLowerCase();

    switch(type){
        case 'css':
            process_css(info, id);
            break;

        case 'js':
            process_css(info, id);
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
        , '</style>'
    ].join(''));
}


