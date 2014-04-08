(function test_finishLoad(){
    var secEnd = (new Date()).getTime();
    document.getElementsByTagName('H2')[0].innerHTML
        = '耗时: '
            + ( secEnd - secStart ) / 1000 
            + ' s'; 
})();

