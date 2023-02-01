jQuery(document).ready(function(){
    function resizeForm(){
        var width = (window.innerWidth > 0) ? window.innerWidth : document.documentElement.clientWidth;
        if(width >= 992){
        	document.body.style.zoom = "90%";
            console.log("running on desktop viewport")
        } else {
        	document.body.style.zoom = "100%";
        	console.log("running on mobile viewport")
        }    
    }
    window.onresize = resizeForm;
    resizeForm();
});