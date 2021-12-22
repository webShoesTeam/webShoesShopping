var uList = document.getElementById("listpage");
var numPage = 3;
var i = 1;  
var tagLi = document.createElement("li");
var link = document.createElement("a");
link.className = "listpaginate";
const current = document.getElementById("current").value;
const pages = document.getElementById("pages").value;

if(pages != 0){
    if(current >= 3){
        i = current - 2;
      }
      
      // <
    if(current == 1){
    link.href  = "#";
    link.textContent = "<";
    }
    else{
    var s = current - 1
    if(window.location.href.search("&") == -1){
        link.href  = "/product?page=" + s;
    }
    else{
        str = window.location.href.substring(window.location.href.search("&"))
        link.href  = `/product?page=${s}` + str;
    }
    link.textContent = "<";
    }
    tagLi.appendChild(link);
    uList.appendChild(tagLi);
      
      //center
      
    for(;i <= current + 2 && i <= pages;i++){
    tagLi = document.createElement("li");
    link = document.createElement("a");
    link.className = "listpaginate";
    if(i == current){
    tagLi.classList.add('active')
    link = document.createElement("span");
    link.textContent = i;
    }
    else{
    if(window.location.href.search("&") == -1){
        link.href = "/product?page=" + i;
    }
    else{
        str = window.location.href.substring(window.location.href.search("&"))
        link.href  = `/product?page=${i}` + str;
    }
    
    link.textContent = i;
    }
    tagLi.appendChild(link);
    uList.appendChild(tagLi); 
    }
      
      
      // >
    tagLi = document.createElement("li");
    link = document.createElement("a");
    link.className = "listpaginate";
    if (current == pages) {
        link.href  = "#";
        link.textContent = ">";
    }
    else{
        var s = Number(current) + Number(1)
        if(window.location.href.search("&") == -1){
        link.href = "/product?page=" + s;
        }
        else{
        str = window.location.href.substring(window.location.href.search("&"))
        link.href  = `/product?page=${s}` + str;
        }
        link.textContent = ">";
    }
    tagLi.appendChild(link);
    uList.appendChild(tagLi); 

}



//update sort
var linksort1 = document.getElementById("Price-ascending");
var linksort2 = document.getElementById("Price-descending")
if(window.location.href.search("&") == -1){
  linksort1.href = "/product?page=1&sort=1";
  linksort2.href = "/product?page=1&sort=-1";
}
else{
  if(window.location.href.search("&sort=-1") != -1){
    linksort1.href  = window.location.href.replace("&sort=-1","&sort=1") ;
  }
  else if(window.location.href.search("&sort=1") != -1){
    linksort2.href  = window.location.href.replace("&sort=1","&sort=-1") ;
  }
  else{
    linksort1.href  = window.location.href + "&sort=1";
    linksort2.href  = window.location.href + "&sort=-1";
  }
}