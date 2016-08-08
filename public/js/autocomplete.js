/**
 * Created by Administrator on 2016/8/8.
 */
(function(){
    if(navigator.userAgent.toLowerCase().indexOf("chrome") != -1){
        var selectors = document.getElementsByTagName("input");
        for(var i=0;i<selectors.length;i++){
            if((selectors[i].type !== "submit") && (selectors[i].type !== "password")){
                var input = selectors[i];
                var inputName = selectors[i].name;
                var inputid = selectors[i].id;
                selectors[i].removeAttribute("name");
                selectors[i].removeAttribute("id");
                setTimeout(function(){
                    input.setAttribute("name",inputName);
                    input.setAttribute("id",inputid);
                },1)
            }
        }
    }
})();
