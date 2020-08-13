//loads config and common(which contains common )
requirejs(['config','common'], function (config, common) {
    var path = window.location.pathname;
    var pageName = path.split("/").pop().slice(0,-5);
    if(pageName ===""){
    	pageName = "index";
    }

    requirejs(['app/' + pageName +'-app']);
});