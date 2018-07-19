function Submit ()
{
  var lang1=document.getElementById("lang1").value;
  var lang2=document.getElementById("lang2").value;
 var text=document.getElementById('speech').value;
 var obj={};
 obj={
   lang1:lang1,
   lang2:lang2,
   text:text
 };
  console.log(obj);
 if(obj.text){
   console.log(obj);
  var request = new XMLHttpRequest();
  request.open('POST','/translate');
  request.setRequestHeader('Content-type', 'application/json')
	request.send(JSON.stringify(obj));
  request.addEventListener('load',function (){
        if(request.status===200)
        {
          document.getElementById('speech1').value ="";
          console.log(request.responseText);
         document.getElementById('speech1').value = request.responseText;
       }else{
         document.getElementById('speech1').value="Not supported yet";
       }
  });
}
}
var request1 = new XMLHttpRequest();
request1.open('GET','/user');
request1.send();
request1.addEventListener('load',function (){
      if(request1.status===200)
      {
            console.log("sign");
          var data=JSON.parse(request1.responseText);
          document.getElementById("pic").setAttribute("src",data.profilepic);
          document.getElementById("name").innerHTML=data.name;
      }
});
