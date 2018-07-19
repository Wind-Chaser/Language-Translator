var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('appName', 'Language Translator');

app.set('port', process.env.PORT || 8080);
app.get('/',function(req,res){
res.sendFile(__dirname+'/HTML/login.html');
});
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/HTML'));

app.get('/languagetranslate',function(req,res){
  res.sendFile(__dirname+'/HTML/index.html');
});

app.post('/translate',function(req,res){
  var languageTranslator = new LanguageTranslatorV2({
    url: "https://gateway.watsonplatform.net/language-translator/api",
    username: '2e40ce9c-75d2-44fe-8d19-059562e530bb',
    password: 'YvWpSwN0tooT',
    version: 'v2'
  });

  var parameters = {
    text: req.body.text,
    model_id: req.body.lang1+'-'+req.body.lang2
  };

  languageTranslator.translate(parameters,function(error, response) {
      if (error){
        res.status(404).send(error);
      }
      else if(response){
         res.send(response.translations[0].translation);
        }
    }
  );

});
app.post('/user',function(req,res){
  var data=req.body;
  res.cookie('data',data).sendStatus(200);
});

app.get('/user',function(req,res){
  res.send(req.cookies.data);
});

http.createServer(app).listen(app.get('port'),
    function(req, res) {
        console.log(app.get('appName')+' is listening on port: ' + app.get('port'));
});
