const search = document.getElementById('Search-name');
search.addEventListener("keyup", function(event) {
  inputTextValue = event.target.value;
  if (event.keyCode == 13) {
    event.preventDefault();
    search.placeholder = inputTextValue
    if(window.location.href.search("page") == -1){
      if(window.location.href.search("/product") != -1){
        window.location.href = window.location.href + "?page=1&search=" + inputTextValue;
      }
      else{
        window.location.href = "/product?page=1&search=" + inputTextValue;
      }
    }
    else{
      if(window.location.href.search("&search=") != -1){
        str = window.location.href.substring(0,window.location.href.search("&search="))
        strinput = window.location.href.substring(window.location.href.search("&search=")+8)
        strinput = strinput.substring(0,strinput.search("&"))
        strEnd = ""
        if(strinput.length !=0){
          strEnd =  window.location.href.substring(window.location.href.search("&search=")+ strinput.length + 8)
        }
        console.log(strEnd)
        window.location.href = str + "&search=" + inputTextValue + strEnd;
      }
      else{
        if(window.location.href.search("/detail") != -1){
          detail = window.location.href.substring(window.location.href.search("/detail"),window.location.href.search("page") - 1)
          window.location.href = window.location.href.replace(detail,"") + "&search=" + inputTextValue;
        }
        else{
          window.location.href = window.location.href + "&search=" + inputTextValue;
        }

      }
    }
  }
});