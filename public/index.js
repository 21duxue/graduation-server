const static = require('koa-static');

module.exports = function(router){
    router.all(/( (\.jpg) | (\.png) | (\.gif) )$/i,static('./static',{
        maxage:30*86400*1000
    }));
    
    router.all(/((\.jsx)|(\.js))$/i,static('./static',{
        maxage:1*86400*1000
    }));
    
    router.all(/((\.html))$/i,static('./static',{
        maxage:30*86400*1000
    }));
    
    router.all('*',static('./static',{
        maxage:7*86400*1000
    }))
    
}