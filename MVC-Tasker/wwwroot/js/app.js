class FeedbackWidget{
    constructor(elementId) {
        this._elementId = elementId;
        this.key = "feedback_widget";
    }    
    get elementId() { //getter, set keyword voor setter methode
      return this._elementId;
    }

    show(message,type){
        var x = document.getElementById(this.elementId);
        var status="";
        var overrule = (x.className!=="alert alert--hidden");
        $(x).find('h2').text(message);
        if(type==="success"){
            type="alert alert--success-success fade-in";
            status="success";
        }else{
            type="alert alert--success-failure fade-in";
            status="error";
        }
        console.log(overrule);
	if(overrule){
            $(x).attr('class','alert alert--hidden');
        }else{
            $(x).attr('class',type);
        }
        var msg = {message: message, status: status};
        this.log(JSON.stringify(msg));
    }
    
    hide(){
        var x = document.getElementById(this.elementId);
        x.style.display = "none";
    }
    
    log(message){
        if(localStorage.getItem(this.key) !==null){            
            var array = JSON.parse(localStorage.getItem(this.key));
            if(array.length===10){
                array.shift();
            }
        } else {
            var array=[];
        }
        array.push(message);
        var arrayString=JSON.stringify(array);        
        localStorage.setItem(this.key,arrayString);
    }
    
    removeLog(){
        localStorage.removeItem(this.key);
    }
    
    history(){
        if(localStorage.getItem(this.key)!==null){
            var array = JSON.parse(localStorage.getItem(this.key));
            var stringHistory = "";
            var a=array.length-1;
            array.forEach(function(obj){                
                var pObj = JSON.parse(obj);
                var addstring="type "+pObj.status+" - "+pObj.message;
                if(a>0){
                    a--;
                    addstring+="\n";
                }
                stringHistory+=addstring;
                
            });
            return stringHistory;
        }
    }
}
const Game = (function(url){
    let configMap = {
        apiUrl:url
    };
    let stateMap={
        gameState:null
    };

    const _getCurrentGameState = function(){
        Game.Model.getGameState();
        stateMap.gameState=0;// insert result
    };

    const privateInit = function(afterInit){
        console.log(configMap.apiUrl);
        Game.Model.init();        
        Game.Data.init('development');
        var intervalID = window.setInterval(_getCurrentGameState,2000);
        afterInit();
    };
    
    return{
        init: privateInit
    };
})('/api/url');
/* global Game */
Game.Api=(function(){
    const init = function(){
        
    };
    
    const getOneAmiibo = async function(){
        return await Game.Data.getAmiiboJson().then((Amiiboos)=>{
            var AmiiboosParsed = JSON.parse(Amiiboos);
            var l = AmiiboosParsed.amiibo.length;
            var x = Math.floor(Math.random() * l);
            var AmiiboSelected = AmiiboosParsed.amiibo[x];
            return AmiiboSelected;
        }); 
    };
    
    return{
        init:init,
        getOneAmiibo:getOneAmiibo
    };
})();
/* global Game */
Game.Data=(function(){
    let configMap={
        mock: [
            {
                url: 'api/Spel/Beurt',
                data: 0
            }
        ],
        apiKey: '38c54cfa93fde5b1a7a55e4c7f6943e0'
    };
    let stateMap={
        environment:'development'
    };
    
    const getAmiiboJson = async function(){
        let response = await fetch('https://www.amiiboapi.com/api/amiibo/');
        let data = await response.text();
        return data;
    };
    
    let possibleStates=['production','development'];
    const get = function(url){
        if(stateMap.environment==='production'){
        return $.get(url)
            .then(r => {
                return r;
            })
            .catch(e => {
                console.log(e.message);
        });} else if (stateMap.environment==='development'){
            return getMockData(url);
        }
    };

    const getMockData = function(url){        
        const mockData = configMap.mock[0];

        return new Promise((resolve, reject) => {
            resolve(mockData);
        });
    };
    
    function init(environment){        
        if(!possibleStates.includes(environment)){
            throw new Error('State niet mogelijk');
        }
        stateMap.environment=environment;
    };
    
    const doeZet = async function(x,y){
        let response = await fetch('/api/reversi/doezet?x='+x+'&y='+y);
        let data = await response.text();
        return data;
    };
    const getBord = async function(){
        let response= await fetch('/api/reversi/bord');
        let data = await response.text();
        return data;
    };
    const getAanDeBeurt = async function(){
        let response= await fetch('/api/reversi/beurt');
        let data = await response.text();
        return data;
    };
    const getOpponent = async function(){
        let response = await fetch('/api/reversi/opponent');
        let data = await response.text();
        return data;
    };
    const getFinished = async function(){
        let response = await fetch('/api/reversi/getfinish');
        let data = await response.text();
        return data;
    };
    
    const getLeave = async function(){
        let response = await fetch('/api/reversi/leave');
        let data = await response.text();
        return data;
    }
    
    const getPass = async function(){
        let response = await fetch('/api/reversi/checkPass');
        let data = await response.text();
        return data;
    };
    const doPass = async function(){
        let response = await fetch('/api/reversi/pass');
        let data = await response.text();
        return data;
    };
    const getWinner = async function(){
        let response = await fetch('/api/reversi/overwegendeKleur');
        let data = await response.text();
        return data;
    }
    return{
        mock:getMockData,
        init:init,
        get:get,
        doeZet:doeZet,
        getAanDeBeurt:getAanDeBeurt,
        getBord:getBord,
        getOpponent:getOpponent,
        getPass: getPass,
        doPass: doPass,
        getFinished: getFinished,
        getWinner: getWinner,
        getLeave:getLeave,
        getAmiiboJson:getAmiiboJson
    };
})();
/* global Game */
Game.Model=(function(){
    let configMap;
    
    //props
    let username;
    
    function init(){
        console.log('model init');
    };
    
    function _getGameState(){
        var token="";
        var url='/api/Spel/Beurt/'+token;
        Game.Data.get(url).then(data=>
        {
            var possibleGameStates=[0,1,2];
            if(!possibleGameStates.includes(data)){
                throw new Error('Unknown Game State');
            }
            console.log(data);
        })/*validitycheck*/;
    };
    
    function getWeather(){
        let url  = 'http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=38c54cfa93fde5b1a7a55e4c7f6943e0';
        Game.Data.get(url).then(data => 
        {
            if(data.main.temp==null){
                throw new Error('Temperature Null Error');
            }
            return data;
        }).then(r=>console.log(r)).catch(e=>console.log(e.message));       
        /*if (retrievedData==null){
            throw new Error("Dit is een error");
        }*/
    };
    
    return{
        init:init,
        getWeather:getWeather,
        getGameState: _getGameState
    };
})();
/* global Game */
"use strict";
Game.Reversi = (function(){
        
    
        console.log('hallo, vanuit module Reversi');
        
        var connection;
        let configMap;
        
        
        const privateInit= function(){
            connection= new signalR.HubConnectionBuilder().withUrl("/reversiHub").build();
            connection.on("update", function (update){
                updateGame();
             });    
            connection.start().catch(function(error){
                return console.error(error.toString());
            });;            
            Game.Data.getOpponent().then((opp)=>{
                document.getElementById('opponent').textContent="Tegenstander: "+opp;
            });
            updateAmiibo();
            
            //showPassButton();
            //updateKleuren();
            
            Game.Data.getBord().then((board)=>{
                let speelBord=JSON.parse(board);
                for(let y=0;y<8;y++){
                    for(let x=0;x<8;x++){
                        let tile = document.createElement('div');                        
                        tile.className='board--tile';
                        tile.onmousedown=function(){
                            clickTile(x,y);
                        };
                        if(speelBord[x][y]!=0){
                            let fiche = document.createElement('div');
                            fiche.className=speelBord[x][y]==1?'fiche fiche--white growAndFade':'fiche fiche--black growAndFade'
                            tile.appendChild(fiche)
                        }                        
                        document.getElementById('gameBoard').appendChild(tile);
                    }
                }
                initChart(speelBord);
            });
            updateGame();
        };
        const updateKleuren = async function (){
            await Game.Data.getAanDeBeurt().then((val)=>{
                var x = document.getElementById('kleuren');
                var kleur=val==1?'Wit':'Zwart';
                x.textContent=("Aan de beurt: "+kleur);
            });
        };
        const updateTegenstander = async function(){
            Game.Data.getOpponent().then((opp)=>{
                if(opp=='Geen'){
                    showLeaveButton();
                }else{
                    hideLeaveButton();
                }
                document.getElementById('opponent').textContent="Tegenstander: "+opp;
            });
        };
        
        const convertBoard = function (){            
            return Game.Data.getBord().then((board)=>{
                let speelBord=JSON.parse(board);
            
            var tiles=[];
            for(let y=0;y<8;y++){
               for(let x=0;x<8;x++){
                   let fiche={Colour:'None'};
                   //if(speelBord[x][y]=='0'){
                   //    fiche.Colour='None';
                   //} else 
                       if (speelBord[x][y]=='1') {
                       fiche.ColourWhite=true;
                   }else if (speelBord[x][y]=='2'){
                       fiche.ColourBlack=true;
                   }
                   tiles.push(fiche);
               } 
            }            
            return tiles;});
        };
        
        const updateBoardHBS = function(){
            var y = convertBoard().then((x)=>{
                var grid = document.getElementById('gameBoardHBS');
                var parsed = Game.Template.parseTemplate('board.board',{boardTile : x });
                $(grid).replaceWith(parsed);
            }); 
            
        };
        
        const clickTile = async function(x,y){
            await Game.Data.doeZet(x,y).then((_)=>{
                if(_=='true'){
                    updateBoard();
                    updateAmiibo();
                    connection.invoke("SendMessage", "update").catch(function(error){
                return console.error(error.toString());
            });
                };
            });
            
        };
        const updateGame = async function(){
            if(await Game.Data.getFinished().then((r)=>{
                if(r==='true'){
                    return true;
                }else{
                    return false;
                }
            })){
                finished();
            }else{
                updateBoard();
                    updateKleuren();
                 showPassButton();
                  showWinning();
                  updateTegenstander();
            }
            
        };
        const updateBoard = function(){
            Game.Data.getBord().then((board)=>{
                let speelBord=JSON.parse(board);
                for(let y=0;y<8;y++){
                    for(let x=0;x<8;x++){                        
                        if(speelBord[x][y]!=0){
                            let tile=document.getElementById('gameBoard').children[(x+y*8)]
                            if(tile.children.length!=1){
                                let fiche = document.createElement('div');
                                fiche.className=speelBord[x][y]==1?'fiche fiche--white growAndFade':'fiche fiche--black growAndFade'
                                tile.appendChild(fiche)
                            }
                            else{
                                var classname=speelBord[x][y]==1?'fiche fiche--white growAndFade':'fiche fiche--black growAndFade';
                                if(tile.firstChild.className!==(classname)){
                                    tile.firstChild.className=classname;
                                    var elm = tile.firstChild;
                                    var newone = elm.cloneNode(true);
                                    elm.parentNode.replaceChild(newone, elm);
                                }
                                
                            }
                            
                        }                        
                    }
                }
                updateChart(board);
            });
        };
        
        
        
        const showFiche = function(x,y,kleur){
            //iets met position op grid
            var gridNumber=y*8+x;
            var Id="tile "+gridNumber;
            var elm = document.getElementById(Id);
            if(kleur==='wit'){
                $(elm).attr('class','fiche fiche--white growAndFade');
            } else if(kleur==='zwart'){
                $(elm).attr('class','fiche fiche--black growAndFade');
            }
            var newone = elm.cloneNode(true);
            elm.parentNode.replaceChild(newone, elm);
        };
        const finished = function(){
            Game.Data.getFinished().then((result)=>{
                if(result==='true'){
                    var btn = document.getElementById('pass');
                    btn.parentNode.removeChild(btn);
                    var brt = document.getElementById('kleuren');
                    brt.parentNode.removeChild(brt);
                    var brd = document.getElementById('gameBoard');
                    brd.parentNode.removeChild(brd);
                    var wnd = document.getElementById('winnend');
                    wnd.parentNode.removeChild(wnd);
                    showWinner();
                    showLeaveButton();
                    return true;
                }else{
                    return false;
                }
            });
        };
        const showWinner= async function(){
            var x = document.getElementById('winnaar');
            var winningplayer;
            await Game.Data.getWinner().then((result)=>{
                if(result==="1"){
                    winningplayer='Wit';
                }else if (result==="2"){
                    winningplayer='Zwart';
                }else{
                    winningplayer='Niemand';
                }
            });
            x.textContent="Gewonnen: "+winningplayer;
        };
        const showWinning= async function(){
            var x = document.getElementById('winnend');
            var winningplayer;
            await Game.Data.getWinner().then((result)=>{
                if(result==="1"){
                    winningplayer='Wit';
                }else if (result==="2"){
                    winningplayer='Zwart';
                }else{
                    winningplayer='Niemand';
                }
            });
            x.textContent="Aan het winnen: "+winningplayer;
        };
        const showPassButton = function(){
            Game.Data.getPass().then((result)=>{
                if(result==='true'){                    
                    var x = document.getElementById('pass');
                    x.style.visibility='visible';
                    x.onclick= async function(){
                        await Game.Data.doPass().then();
                        connection.invoke("SendMessage", "update").catch(function(error){
                            return console.error(error.toString());}
                    );};
                }else{
                    var x = document.getElementById('pass');
                    x.style.visibility='hidden';
                    x.onclick=null;
                }
            });
        };
        const hideLeaveButton=function(){
            var x = document.getElementById('leaveEnd');
            x.style.visibility='hidden';
            x.onclick= function(){
                console.log("dit kan niet");
            };
        };
        
        const showLeaveButton=function(){
            var x = document.getElementById('leaveEnd');
            x.style.visibility='visible';
            x.onclick= function(){Game.Data.getLeave().then((result)=>{
                    if(result==='true'){
                        window.location.replace("/Home/Game");
                    }else{
                        hideLeaveButton();
                    }
            });};
        };
        const updateAmiibo=async function(){
            await Game.Api.getOneAmiibo().then((amiibo)=>{
                var x = document.getElementById('randomAmiibo');
                var y = Game.Template.parseTemplate('game.api',{amiibo});
                $(x).replaceWith(y);
            });
        };
        
        const initChart = async function(board){
            Game.Stats.init(board);
            var cPSection= document.getElementById('chartPiecesSection');
            var cDSection= document.getElementById('chartDifferencesSection');
            var stats = Game.Stats.getJSON();
            var x = Game.Template.parseTemplate('chart.piecesonboard',stats);
            var y = Game.Template.parseTemplate('chart.difference',stats);
            $(cPSection).replaceWith(x);
            $(cDSection).replaceWith(y);
        };
        
        const updateChart=async function(board){
            let speelBord=JSON.parse(board);
            Game.Stats.updateValues(speelBord);
            var cPSection= document.getElementById('chartPiecesSection');
            var cDSection=document.getElementById('chartDifferencesSection');
            var stats = Game.Stats.getJSON();
            var x = Game.Template.parseTemplate('chart.piecesonboard',stats);
            var y = Game.Template.parseTemplate('chart.difference',stats);
            $(cPSection).replaceWith(x);
            $(cDSection).replaceWith(y);
        };
        
        return{
            init:privateInit,
            uH:updateBoardHBS,
            convertBoard:convertBoard,
            updateAmiibo:updateAmiibo
        };
    })();
/* global Game */
Game.Stats=(function(){
    
    let black;
    let white;
    let difference;
    let turns;
    let turn;
    
    const init=function(board){
        black=[];
        white=[];
        difference=[];
        turn=0;
    };
    

    const updateValues = function(board){
        turn++;
        var countedBlack=0;
        var countedWhite=0;
        for(var x=0;x<8;x++){
            for(var y=0;y<8;y++){
                if(board[x][y]=='1'){
                    countedWhite++;
                }else if(board[x][y]=='2'){
                    countedBlack++;
                }
            }
        }
        turns=[];
        for(var i=0;i<turn;i++){
            turns.push(i)
        }
        
        var countedDifference = Math.abs(countedBlack-countedWhite);
        
        difference.push(countedDifference);
        black.push(countedBlack);
        white.push(countedWhite);
    };
    
    const getJSON = function(){
        return {black: black,
                white: white,
                difference: difference,
                turns: turns};
    };
    
    return{
        init:init,
        updateValues:updateValues,
        getJSON:getJSON
    };
})();
/* global Game*/
Game.Template=function(){
    const getTemplate=function(templateName){
        return eval('spa_templates.templates.'+templateName);
        
    };
    const parseTemplate= function(templateName,data){
        var template = getTemplate(templateName);
        var parsedTemplate= template(data);
        return parsedTemplate;
        
    };
    return{
        getTemplate:getTemplate,
        parseTemplate:parseTemplate
    };
}();