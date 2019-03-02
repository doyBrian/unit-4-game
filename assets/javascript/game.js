        //variable declarations

        //obkect with player stats
        var players = [
            {playerid: "Pikachu", HP: 100, AP: 10, CAP: 10 },
            {playerid: "Jiggly Puff", HP: 120, AP: 15, CAP: 20 },
            {playerid: "Fennekin", HP: 150, AP: 20, CAP: 30 },
            {playerid: "Charmander", HP: 200, AP: 25, CAP: 35 },
            ];
    
            //necessary html elements and contents saved as blocks for easy coding
    
            //player card blocks
            var block1 = '<div id="player1" class="col-md-3"><div class="card mb-4 box-shadow border border-primary"><img class="card-img-top" src="./assets/images/pikachu.jpg" width="200" height="200" alt="Card image cap"><div class="card-body"><h7 id="power1"></h7><div class="d-flex justify-content-between align-items-center"><button id="name1" data-buttonID ="1" type="button" class="btn btn-sm btn-warning btnID"></button><h7 id="health1"></h7></div></div></div></div>';
            var block2 = '<div id="player2" class="col-md-3"><div class="card mb-4 box-shadow border border-primary"><img class="card-img-top" src="https://www.wikihow.com/images/thumb/3/33/Draw-Jigglypuff-Final.jpg/-crop-224-192-224px-nowatermark-Draw-Jigglypuff-Final.jpg" width="200" height="200" alt="Card image cap"><div class="card-body"><h7 id="power2"></h7><div class="d-flex justify-content-between align-items-center"><button id="name2" data-buttonID ="2" type="button" class="btn btn-sm btn-warning btnID"></button><h7 id="health2"></h7></div></div></div></div>';
            var block3 = '<div id="player3" class="col-md-3"><div class="card mb-4 box-shadow border border-primary"><img class="card-img-top" src="https://www.wikihow.com/images/thumb/8/89/Draw-Pictures-of-Pokemon-Step-30.jpg/-crop-224-192-224px-nowatermark-Draw-Pictures-of-Pokemon-Step-30.jpg" width="200" height="200" alt="Card image cap"><div class="card-body"><h7 id="power3"></h7><div class="d-flex justify-content-between align-items-center"><button id="name3" data-buttonID ="3"  type="button" class="btn btn-sm btn-warning btnID"></button><h7 id="health3"></h7></div></div></div></div>';
            var block4 = '<div id="player4" class="col-md-3"><div class="card mb-4 box-shadow border border-primary"><img class="card-img-top" src="./assets/images/charmander.jpg" width="200" height="200" alt="Card image cap"><div class="card-body"><h7 id="power4"></h7><div class="d-flex justify-content-between align-items-center"><button id="name4" data-buttonID ="4"  type="button" class="btn btn-sm btn-warning btnID"></button><h7 id="health4"></h7></div></div></div></div>';
            
            //attack button/status block
            var block5 = '<div id="attack" class="col-md-2 align-self-center text-center"><h1 id="status">VS</h1><button type="button" id="attack-btn" class="btn btn-lg btn-danger">ATTACK</button></div>';
            //reset block for when all opponents are defeated
            var block6 = '<div class="col-md-2 align-self-center text-center"><button type="button" id="reset" class="btn btn-lg btn-warning">RESET</button></div>';
            //intro/instruction block
            var block7 = '<section id="intro" class="jumbotron text-center" style="padding-top: 50px; padding-bottom: 50px;"><h2 class="jumbotron-heading">Gotta fight em all!</h2><h7>Instructions:</h7><p class="lead text-muted">First, pick a pokemon character as your avatar. The rest will automatically become your opponent. Click one from that list to start a battle. If you win, pick another until you defeat all. If you lose, the game ends. Ready? Press the button below.</p><button id="begin" type="button" class="btn btn-outline-success">Pokemon, Go!</button></section>';
            //shortened reset block for when player loses
            var block8 = '<button type="button" id="reset" class="btn btn-lg btn-warning">RESET</button>';
            //background music block
            var block9 = '<audio autoplay loop  id="playAudio"><source src="assets/audio/background2.mp3"></audio>';
                        //<iframe src="assets/audio/background2.mp3" allow="autoplay" style="display:none" id="iframeAudio"></iframe>
            
            var mainplayer, enemy;
            var player_assigned = false;   //can only pick one mainplayer after a player is picked
            var fighter_picked = false;    //can only have one opponent at a time
            var attack_ready = false;      //can only attack if opponent has been chosen
            var temp_AP, temp_HP, temp_HP2;     //temp holders to keep track of players stats as it changes during the game
            var enemies_left = players.length - 1;
            var bg_music, sound_effect;
    
            $(document).ready(function(){
              
              //intro page
              $("#players").append(block1, block2, block3, block4);
    
              for (let i = 0; i < players.length; i++) {
                  $("#name" + (i+1)).append(players[i].playerid);
                  $("#health" + (i+1)).append("Health: " + players[i].HP);
              }
    
              $("#enemies").append(block7);
              
              //when go or start button is pressed
              $("#begin").click(function() {
    
                $("iframe").remove();
                //$("audio").remove();
                $("#intro").remove();
                $("body").append(block9);
                start_game();
              });
    
            });
    
            //function definitions
    
            //starts the game
            function start_game() {
              $("#players").empty();
              $("#players").append(block1, block2, block3, block4);
                    for (let i = 0; i < players.length; i++) {
                        $("#name" + (i+1)).append(players[i].playerid);
                        $("#health" + (i+1)).append("Health: " + players[i].HP);
                    }
              $("#enemies").append(block5); 
              
              //when main player is clicked
              $(".btnID").click(function() {
    
                if (!player_assigned) {
                  var btnid = $(this).attr("data-buttonID");
    
                  switch (btnid) {
                    case '1':
                    sound_effect = new sound("./assets/audio/Pika_Pika_Happy.mp3");
                    break;
                    case '2':
                    sound_effect = new sound("./assets/audio/Jiggly.wav");
                    break;
                    case '3':
                    sound_effect = new sound("./assets/audio/Fennekin.mp3");
                    break;
                    case '4':
                    sound_effect = new sound("./assets/audio/charmander.mp3");
                    break;
                  }
                  sound_effect.play();
    
                  mainplayer = players[btnid-1];
                  temp_AP = mainplayer.AP;
                  temp_HP = mainplayer.HP;
                  player_assigned = true;
                  $("#players").empty();
                  $("#attack").remove();
    
                  switch (btnid) {
                    case '1':
                    $("#enemies").append(block2, block3, block4);
                    $("#cage").append(block1, block5);
                    break;
                    case '2':
                    $("#enemies").append(block1, block3, block4);
                    $("#cage").append(block2, block5);
                    break;
                    case '3':
                    $("#enemies").append(block1, block2, block4);
                    $("#cage").append(block3, block5);
                    break;
                    case '4':
                    $("#enemies").append(block1, block2, block3);
                    $("#cage").append(block4, block5);
                    break;
                  }            
                  mainplayer_display();
                  challengers_display();             
                }
                
                //when opponent is clicked
                $(".btnID").click(function() {
                  if (!fighter_picked) {
                  var btnid1 = $(this).attr("data-buttonID");
                  enemy_chosen(btnid1);
    
                  }
                  mainplayer_display();
                  enemy_display(); 
                  fighter_picked = true;
                  attack_ready = true;
                });
                
                //when attack button is clicked
                $("#attack").click(attack);
                
              }); 
    
            }
    
            //attack function
            function attack() { 
              if (attack_ready) {
                attack_sound();
                temp_HP2 -= temp_AP;
                temp_AP += mainplayer.AP;
                temp_HP -= enemy.CAP;
                mainplayer_display();
                enemy_display();
    
                if (temp_HP <= 0 ||  temp_HP2 <= 0) {
                  if (temp_HP < temp_HP2) {
                    $("#attack-btn").hide();
                    $("#status").empty();
                    sound_effect = new sound("./assets/audio/Loser2.mp3");
                    sound_effect.play();
                    $("#status").append("YOU LOST!");
                    attack_ready = false;
                    $("#attack").append(block8);              
                    $("#reset").click(reset);
                  } else if (temp_HP === temp_HP2) {
                    $("#attack-btn").hide();
                    $("#status").empty();
                    sound_effect = new sound("./assets/audio/Draw.mp3");
                    sound_effect.play();
                    $("#status").append("IT'S A DRAW!");             
                    temp_HP = mainplayer.HP;
                    fighter_picked = false; 
                    attack_ready = false;
                    enemies_left--;
                    remove_enemy();
                  } else {
                    $("#attack-btn").hide();
                    $("#status").empty();
                    sound_effect = new sound("./assets/audio/Winner2.mp3");
                    sound_effect.play();
                    $("#status").append("YOU WON!");
                    temp_HP = mainplayer.HP;
                    fighter_picked = false; 
                    attack_ready = false;
                    enemies_left--;
                    remove_enemy();
                  }
                }
    
                if (enemies_left === 0) {
                  $("#attack").append(block8);               
                  $("#reset").click(reset);   
                }  
    
              } else 
                alert("Please select an opponent first!");  
            }
    
            //settings when enemy is chosen
            function enemy_chosen(btnid2) {
  
                switch (btnid2) {
                    case '1':
                    sound_effect = new sound("./assets/audio/Pika_Pika_Happy.mp3");
                    break;
                    case '2':
                    sound_effect = new sound("./assets/audio/Jiggly.wav");
                    break;
                    case '3':
                    sound_effect = new sound("./assets/audio/Fennekin.mp3");
                    break;
                    case '4':
                    sound_effect = new sound("./assets/audio/charmander.mp3");
                    break;
                  }
                  sound_effect.play();
    
                  $("#status").empty();
                  $("#status").append("VS");
                  $("#attack-btn").show();
                  enemy = players[btnid2-1];
                  temp_HP2 = enemy.HP;
    
                  $("#player" + btnid2).remove();

              switch (btnid2) {
                case '1':
                $("#cage").append(block1);
                break;
                case '2':
                $("#cage").append(block2);
                break;
                case '3':
                $("#cage").append(block3);
                break;
                case '4':
                $("#cage").append(block4);
                break;
              } 

              $("#power" + btnid2).empty();
              $("#power" + btnid2).append("Counter Power: " + enemy.CAP);
              
            }
    
            //reset function
            function reset() {
                    $("#reset").remove();
                    $("#enemies").empty();
                    $("#cage").empty();
                    $("#power1", "#power2", "#power3", "#power4").empty();
                    player_assigned = false;
                    fighter_picked = false;
                    attack_ready = false;
                    enemies_left = players.length - 1;
                    remove_mainplayer();
                    start_game();        
            }      
    
            //display for main player stats
            function mainplayer_display() {
                switch (mainplayer.playerid) {
                case "Pikachu":
                    $("#name1").empty();
                    $("#health1").empty();
                    $("#power1").empty();
                    $("#name1").append(mainplayer.playerid);
                    $("#power1").append("Attack Power: " + temp_AP);
                    $("#health1").append("Health: " + temp_HP);
                    break;
                case "Jiggly Puff":
                    $("#name2").empty();
                    $("#health2").empty();
                    $("#power2").empty();
                    $("#name2").append(mainplayer.playerid);
                    $("#power2").append("Attack Power: " + temp_AP);
                    $("#health2").append("Health: " + temp_HP);
                    break;
                case "Fennekin": 
                    $("#name3").empty();
                    $("#health3").empty();
                    $("#power3").empty();  
                    $("#name3").append(mainplayer.playerid);
                    $("#power3").append("Attack Power: " + temp_AP);
                    $("#health3").append("Health: " + temp_HP);
                    break;
                case "Charmander":
                    $("#name4").empty();
                    $("#health4").empty();
                    $("#power4").empty();
                    $("#name4").append(mainplayer.playerid);
                    $("#power4").append("Attack Power: " + temp_AP); 
                    $("#health4").append("Health: " + temp_HP);  
                    break; 
                }   
            }
    
            //display for opponent stats
            function enemy_display() {
                switch (enemy.playerid) {
                case "Pikachu":
                $("#name1").empty();
                $("#health1").empty();
                $("#name1").append(enemy.playerid);
                $("#health1").append("Health: " + temp_HP2);
                break;
                case "Jiggly Puff":
                $("#name2").empty();
                $("#health2").empty();
                $("#name2").append(enemy.playerid);
                $("#health2").append("Health: " + temp_HP2);
                break;
                case "Fennekin":   
                $("#name3").empty();
                $("#health3").empty();
                $("#name3").append(enemy.playerid);
                $("#health3").append("Health: " + temp_HP2);
                break;
                case "Charmander":
                $("#name4").empty();
                $("#health4").empty();
                $("#name4").append(enemy.playerid); 
                $("#health4").append("Health: " + temp_HP2);  
                break; 
                }  
            }
    
            //display opponents once main player is chosen
            function challengers_display() {
              for (let i = 0; i < players.length; i++) {
                if (mainplayer.playerid != players[i].playerid) {
                    $("#name" + (i+1)).append(players[i].playerid);
                    $("#health" + (i+1)).append("Health: " + players[i].HP);
                }
              }
            }
            
            //removes opponent
            function remove_enemy() {
                switch (enemy.playerid) {
                case "Pikachu":
                $("#player1").remove();
                break;
                case "Jiggly Puff":
                $("#player2").remove();
                break;
                case "Fennekin":   
                $("#player3").remove();
                break;
                case "Charmander":
                $("#player4").remove();
                break;        
                }
            }
    
            //removes mainplayer
            function remove_mainplayer() {
                switch (mainplayer.playerid) {
                case "Pikachu":
                $("#player1").remove();
                break;
                case "Jiggly Puff":
                $("#player2").remove();
                break;
                case "Fennekin":   
                $("#player3").remove();
                break;
                case "Charmander":
                $("#player4").remove();
                break;        
                }
            }
    
            //sound function
            function sound(src) {
                this.sound = document.createElement("audio");
                this.sound.src = src;
                this.sound.setAttribute("preload", "auto");
                this.sound.setAttribute("controls", "none");
                this.sound.style.display = "none";
                document.body.appendChild(this.sound);
                this.play = function(){
                this.sound.play();
                }
                this.stop = function(){
                this.sound.pause();
                }
            }
    
            //attack sound effects
            function attack_sound() {
                switch (mainplayer.playerid) {
                case "Pikachu":
                sound_effect = new sound("./assets/audio/Pikaaaa.mp3");
                sound_effect.play();
                break;
                case "Jiggly Puff":
                sound_effect = new sound("./assets/audio/Jiggly_attack.wav");
                sound_effect.play();
                break;
                case "Fennekin":   
                sound_effect = new sound("./assets/audio/Fennekin_attack.wav");
                sound_effect.play();
                break;
                case "Charmander":
                sound_effect = new sound("./assets/audio/charmander_attack.mp3");
                sound_effect.play();
                break;        
                }
                
            }