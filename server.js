var express = require('express');
var http= require('http');
var request= require('request');

var calls=0;
var app = express();


app.get('/I/want/title', function (req, res) {
   try
   {
    var address= req.query.address!=null? req.query.address:"";
    var arr=[];
    if(address!="" && address[0].length==1)
	 {   arr[0]=address; address=arr; } 

   var result='';
   calls=0;
   console.log(address);
   
   if(address!="")
   {
	   var count=0;
	   
	   while(count < address.length)
	  { 
       var addressItem=address[count++]; 
	   var options = { host: addressItem,path: '/',method: 'GET'};
	   
	
    	request(addressItem,function(error,response,body)
		{
		 console.log(calls);
         if(!error)  		   
		 {	 
	           var str=body.toString();
	           var start= str.indexOf("<title>") == -1? str.indexOf("<TITLE>") : str.indexOf("<title>");
	           var end= str.indexOf("</title>")  == -1? str.indexOf("</TITLE>") : str.indexOf("</title>");
			   if(start!=-1 && end!=-1)
			   { var title= str.substring(start+7,end);
			     result+='Title Found: '+title+'<br/>';
			   }
			   else{
				   result+='Title not found for: '+address[calls]+'<br/>';
			   }
		 }
	 else { result+='Unable to query '+address[calls]+' Try using http or https in address.'+'<br/>'; }
            console.log(result);
            if(++calls==address.length) 
			res.send('<html><head></head><body><h1> Following are the titles of given websites: </h1>'+result+'</body></html>');	 
		})
	  }
	
	
}

  else    
{
	res.send('Enter url as address query parameter.');
}
   }
   catch(e)
   {
	   res.send('Exception Details: '+e);
   }
   
});

var server= app.listen(8080,function(){
	  var host = server.address().address;
  var port = server.address().port;
	
})
