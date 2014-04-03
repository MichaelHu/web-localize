
function util_isSameDomain(url){
    var hostName = url.match(/https?\:\/\/([^\/]+)/i)[1];
    console.log(hostName);
    return hostName == location.hostname;
}


