const loader_page=document.getElementById("LOADER");
const window4 = document.getElementById("window4");


window4.style.display="none";
document.addEventListener("DOMContentLoaded", fadeLoader);

function fadeLoader(){
    window4.style.display="flex";
    loader_page.style.animation="fade-out 1s linear forwards";

    // setTimeout(function(){document.body.removeChild(loader_page);},3000)
    
}
