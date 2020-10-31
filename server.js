const express = require("express");
const cors = require('cors')

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cors())

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage]


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});
//All Messages
app.get('/messages', function(request, response) {
  response.json(messages);
});
//Message get by Id
app.get('/messages/:id', function(request, response) {
     const Id = request.params.id;
     const getMessage = messages.find(item => item.id == Id);
     response.json(getMessage);
});
//Message get by text Query
app.get('/messages/text/search', function(request, response) {
  const Input = request.query.input;
  response.json(messages.filter(item => item.text.includes(Input)));  
});
// Create Message
app.post("/messages", function(request, response){
  if(request.body.text && request.body.from ){
    let body = request.body;
    messages.push(body)
   response.json("success")
  }
  else{
    response.json("error message Field empty")
  }
});
//delete Message
app.delete("/messages/:id", function(request, response){
  const Id = request.params.id;
  messages.filter(function(item, index){
    if (item.id == Id){
      messages.splice(index,1)
      response.json("success")
    }
  })
})

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});