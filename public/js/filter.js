// const x = document.getElementsByName('filter');
const btns = document.querySelectorAll(".mr-2");
const pagi = document.querySelectorAll(".listpaginate")

function addeventColor(arr){
  for(i = 0 ; i < arr.length;i++){
    const temp = document.getElementById(arr[i]);
    temp.addEventListener('change',function(){
      if (this.checked) {
        for(j = 0; j < pagi.length;j++){
          if(pagi[j].href.search("#") == -1){ 
            pagi[j].href += `&Color=${temp.value}`
          }
        }
        if(window.location.href.search("&") == -1){
          strbegin = "";
          if(window.location.href.search("page") == -1){
            strbegin =  window.location.href + "?"
          }
          else{
            strbegin = window.location.href.substring(0,window.location.href.search("page"));
          }
          window.location.href = strbegin + "page=1" + `&Color=${temp.value}`;
        }
        else{
          strbegin = "";
          if(window.location.href.search("page") == -1){
            strbegin =  window.location.href + "?"
          }
          else{
            strbegin = window.location.href.substring(0,window.location.href.search("page"));
          }
          str = window.location.href.substring(window.location.href.search("&"))
          window.location.href = strbegin + "page=1" + str +`&Color=${temp.value}`;
        }
    
      }
      else{
        for(j = 0; j < pagi.length;j++){
          if(pagi[j].href.search("#") == -1){ 
            pagi[j].href = pagi[j].href.replace(`&Color=${temp.value}`,"")
          }
        }
        window.location.href = window.location.href.replace(`&Color=${temp.value}`,"")
      }
    
     
      })
  }
}

function addeventSize(arr){
  for(i = 0 ; i < arr.length;i++){
    const temp = document.getElementById(arr[i]);
    temp.addEventListener('change',function(){
      if (this.checked) {
        for(j = 0; j < pagi.length;j++){
          if(pagi[j].href.search("#") == -1){ 
            pagi[j].href += `&Size=${temp.value}`
          }
        }
        if(window.location.href.search("&") == -1){
          strbegin = "";
          if(window.location.href.search("page") == -1){
            strbegin =  window.location.href + "?"
          }
          else{
            strbegin = window.location.href.substring(0,window.location.href.search("page"));
          }
          window.location.href = strbegin +  "page=1" + `&Size=${temp.value}`;
        }
        else{
          strbegin = "";
          if(window.location.href.search("page") == -1){
            strbegin =  window.location.href + "?"
          }
          else{
            strbegin = window.location.href.substring(0,window.location.href.search("page"));
          }
          str = window.location.href.substring(window.location.href.search("&"))
          window.location.href = strbegin +  "page=1" + str +`&Size=${temp.value}`;
        }
      }
      else{
        for(j = 0; j < pagi.length;j++){
          if(pagi[j].href.search("#") == -1){ 
            pagi[j].href = pagi[j].href.replace(`&Size=${temp.value}`,"")
          }
        }
        window.location.href = window.location.href.replace(`&Size=${temp.value}`,"")
      }
      })
  }
}


const arrayColor = ["red","green","blue","purple"]
addeventColor(arrayColor);

const arraySize = ["Small","Medium","Large","Extra"]
addeventSize(arraySize);