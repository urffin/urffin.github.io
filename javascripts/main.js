(function(){
    function hashVal(val){
        var hashVal = document.querySelector('section span');
        if(!hashVal){
            document.querySelector('section').appendChild(hashVal = document.createElement('span'));            
        }
        if(val != null)
            hashVal.innerText = val;
        
        return hashVal;
    }
    window.addEventListener("hashchange",function(hashevent){
        hashVal(location.hash.substring(1));
    });
    
    hashVal(location.hash.substring(1));
})();