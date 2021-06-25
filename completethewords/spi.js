var complete_game_win=0;        //storing data to check the game is completed or not
var data="";//for storing the data
var data1="";//for storing the data in organised manner
buttons=document.querySelectorAll('button');
var fill=document.getElementById("fill");   //hints for the words id
var button_sound=document.getElementById("button_sound");   //for sound of the button
var win_sound=document.getElementById("win_sound");   //for sound of the winning
var complete_win_sound=document.getElementById('complete_win_sound');
// for the ids of buttons
var arr=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var text_arr=["1","2","3","4"];
var s_arr=["ide","eod","ita","rot"]; //alphabets not present in the text
var fill_arr=["Explore your _ _ _ _ _ _ talent.","Get ready to _ _ _ _ _ _ _ with us.","Lets explore the _ _ _ _ _ _ _ world.","Lets aim for unprecedented _ _ _ _ _ _ together."];
var len_fill_arr=fill_arr.length;   //length of fill array
var s;  //for the particular element present in the s_arr
var c;    //count for the length of s and used for displaying whether gamer won
var value=1,enter;  //for the value of radio button/selectors
var score=0,attempt=6;
var scoreid=document.getElementById('score');
var attemptid=document.getElementById('attempt');
username=document.getElementById("fullname");   //fullname entered by user
phoneno=document.getElementById("phoneno");     //phoneno entered by user
var test_arr=[];
var local="abcd";
var scoreboard=document.getElementById("boards");
var scoreboard_track,op,unload_save,browser_cut;
var tables=document.getElementById("table");
function main_page_content(){
    if(username.value.length==0){
            alert("Please enter the name.");
    }
    else if(phoneno.value<=4000000000 || phoneno.value>=9999999999){
            alert("Please enter the valid mobile number.");
    }
    else{
        let l=0,w=0;
        for(b=0;b<username.value.length;b++){
            if(username.value[b]=="$"||username.value[b]=="!"||username.value[b]=="@"||username.value[b]=="#"||username.value[b]=="^"||username.value[b]=="*"||username.value[b]=="&"||username.value[b]=="%"||username.value[b]=="+"||username.value[b]=="-"||username.value[b]=="("||username.value[b]==")"||username.value[b]==";"||username.value[b]==":"){
                l=1;
                w=1;
                break;
            }
        }
        if(w==0){
            for(b=0;b<phoneno.value.length;b++){
                if(phoneno.value[b]=="$"||phoneno.value[b]=="!"||phoneno.value[b]=="@"||phoneno.value[b]=="#"||phoneno.value[b]=="^"||phoneno.value[b]=="*"||phoneno.value[b]=="&"||phoneno.value[b]=="%"||phoneno.value[b]=="("||phoneno.value[b]==")"||phoneno.value[b]=="+"||phoneno.value[b]=="-"||phoneno.value[b]==":"||phoneno.value[b]==";"||phoneno.value[b]=="{"||phoneno.value[b]=="}"||phoneno.value[b]=="["||phoneno.value[b]=="]"||phoneno.value[b]=="\""||phoneno.value[b]=="\'"){
                    l=1;
                    break;
                }
            }
         }
        if(l==0){
            document.getElementById("main_page").style.display="block";
            document.getElementById("containerlogin").style.display="none";
            unload_save=0;
        }
        else{
            alert("Special characters can't be used.");
        }
    }
}

// input button click events
function option_selector(ids){
            pausewin(win_sound);
            document.getElementById("text".concat(value)).style.display="none";
            document.getElementById("text".concat(ids)).style.display="block";
            fill.style.display="block";
            fill.innerHTML=fill_arr[(ids-1)%len_fill_arr];
            value=document.getElementById(ids).value; //used for getting the ids of unfilled alphabet present the text
            if(document.getElementById('sign'.concat(ids)).style.display!="inline-block"){
                document.getElementById('sign'.concat(ids)).style.display="none";
            }
            s=s_arr[ids-1];
            scoreid.innerHTML="Score: "+score;
            attemptid.innerHTML="Attempt: "+attempt;
            let testing=0;
            for(i in test_arr)
            {
                if(test_arr[i]==ids && local != ids){
                        testing=1;
                        break; 
                }
            }
            if(testing==1){
                for(k of buttons){
                    var idss=k.id;
                    document.getElementById(idss).disabled=true;
                    // if(test_arr.length==1){document.getElementById(idss).style.backgroundColor="rgb(167, 165, 165)";}
                }
            }
            else if(testing==0){
                if(test_arr[test_arr.length-1]==ids){
                    for(k of buttons){
                        var idss=k.id;
                        document.getElementById(idss).disabled=false;
                    }
                }
                else{
                    c=0;
                    bug=0;
                    attempt=6;
                    attemptid.innerHTML="Attempt: "+attempt;
                    for(k of buttons){
                        enter=0;
                        var idss=k.id;
                        document.getElementById(idss).style.backgroundColor="rgb(167, 165, 165)";
                        document.getElementById(idss).disabled=false;
                    }
                }
            }
}

//function for button sound and winning sound
function playbutton(x){
    x.currentTime=0;
    x.play();
}
function pausewin(x)
{
    x.pause();
}

// bug fix of first button either use innerText if id is not mentioned
var bug;
var first_btns_id=document.getElementById(buttons[0].id);
first_btns_id.addEventListener("click",()=>{
    if(bug==0 && c==0){
        for(j=0;j<s.length;j++)
                {
                    if(s[j] == first_btns_id.id)
                    {
                        document.getElementById(first_btns_id.id).style.backgroundColor="green";
                        document.getElementById("hidden_".concat(value,first_btns_id.id)).style.color="black";
                        document.getElementById("hidden_".concat(value,first_btns_id.id)).style.opacity="1";
                        c++;
                        break;
                    }
                    else{
                        document.getElementById(first_btns_id.id).style.backgroundColor="red";
                    }
                }
        first_btns_id.disabled=true;
        attempt--;
        attemptid.innerHTML="Attempt: "+attempt;
    }
});
//button click events
for(items of buttons)
{
    items.addEventListener('click',(e)=>{
        buttonText = e.target.innerText;
        playbutton(button_sound);
        for(i of buttons){
            if(enter==0){
                test_arr.push(value);
                enb_dis_btns(true);
                enter++; 
                local=value;
            }
            if(i.id == buttonText && c<s.length && attempt>0)  //c<s.length
            {
                document.getElementById(i.id).disabled=true;
                bug=1;
                for(j=0;j<s.length;j++)
                {
                    if(s[j] == i.id)
                    {
                        document.getElementById(i.id).style.backgroundColor="green";
                        document.getElementById("hidden_".concat(value,i.id)).style.color="black";
                        document.getElementById("hidden_".concat(value,i.id)).style.opacity="1";
                        c++;
                        break;
                    }
                    else{
                        document.getElementById(i.id).style.backgroundColor="red";
                    }
                }
                attempt--;
                attemptid.innerHTML="Attempt: "+attempt;
                if(c == s.length){
                    document.getElementById('sign'.concat(value)).style.display="inline-block";
                    document.getElementById('sign'.concat(value)).style.color="green";
                    playbutton(win_sound);
                    window.alert("Congratulations! You guessed the word right.");
                    score+=100;
                    scoreid.innerHTML="Score: "+score;
                    complete_game_win++;
                    enb_dis_btns(false);
                    local="abcd";
                }
                else if(attempt==0){
                    alert("You didn't guess the word right.");
                    document.getElementById('sign'.concat(value)).style.display="inline-block";
                    document.getElementById('sign'.concat(value)).className="fas fa-times";
                    document.getElementById('sign'.concat(value)).style.color="red";
                    complete_game_win++;
                    enb_dis_btns(false);
                    local="abcd";
                    // document.getElementById('sign'.concat(value)).style.fontSize="30px";
                }

                //storing the data on winning
                if(complete_game_win==text_arr.length){
                    data1="\n"+Date()+"     "+username.value+"	                  "+phoneno.value+"         	"+score;
                    data="\n^"+username.value+"$"+phoneno.value+"!"+score;
                    tables.innerHTML+="<tr><td>"+(data_index)+"</td><td>"+username.value+"</td><td>"+score+"</td></tr>";
                    $.ajax({
                        method: "POST",
                        url: "ind.php",
                        data: { data: data}
                      })
                        .done(function( response ) {
                        });
                    $.ajax({
                        method: "POST",
                        url: "ind.php",
                        data: { data1: data1}
                        })
                    .done(function( response ) {
                        });
                    unload_save=1;
                    setTimeout(complete_win_function,800);
                }
                break;
            }
        }

    })
}

//function to enabledisable the 4 button for differet games
function enb_dis_btns(vale){
    for(i of text_arr){
        let check=0;
        for(j of test_arr){
            if(i==j){
                check++;
                break;
            }
        }
        if(check==0){
            document.getElementById(i).disabled=vale;
        }
    }
}

// function for complete win
function complete_win_function(){
    document.getElementById("scoring").innerHTML="Your score is "+score+".";
    document.getElementById("main_page").style.display="none";
    document.getElementById("complete_win_page").style.display="block";
    playbutton(complete_win_sound);
}

//scoreboard display
var data_index=0;
var data_arr=[];
function funcscoreboard(){
    if(document.getElementById("containerlogin").style.display != "none"){
        document.getElementById("containerlogin").style.display="none";
        scoreboard_track=0;
     }
    else if(document.getElementById("complete_win_page").style.display == "block"){
        scoreboard_track=2;
        document.getElementById("complete_win_page").style.display="none";
    }
    else{
        document.getElementById("main_page").style.display="none";
        scoreboard_track=1;
    }
    document.getElementById("filter").innerHTML="<input type=\"radio\" name=\"filter\" id=\"all\" onclick=\"display(data_arr)\" checked>All<input type=\"radio\" name=\"filter\" id=\"sort\" onclick=\"func_sort()\">Sort";
    $.ajax({
        method: "POST",
        url: "ind.php",
        data: { data: ""}
      })
        .done(function( response ) {
            op=response;
            data_arr=[];
            data_index=0;
            tables.innerHTML="<tr><th style='width: 30px;'>S.No.</th><th>Name</th><th>Score</th></tr>";
            // console.log(data_arr[1].name);
            for(q=0;q<op.length;q++){
                if(op[q]=="^"){
                    var temp_name="";
                    var temp_score="";
                    q++;
                    while(1){
                        if(op[q]=="!"){
                            q++;
                            while(q<op.length){
                                if(op[q]=="^"){
                                    q--;
                                    break;
                                }
                                //storing score
                                temp_score+=op[q];
                                q++;
                            }
                            break;
                        }
                        else if(op[q]=="$"){
                            q=q+11;
                        }
                        else{
                            //storing name
                            temp_name+=op[q];
                            q++;
                        }
                    }
                }
                data_arr[data_index]={name:temp_name,scores:temp_score};
                tables.innerHTML+="<tr><td style='width: 30px;'>"+(data_index+1)+"</td><td>"+data_arr[data_index].name+"</td><td>"+data_arr[data_index].scores+"</td></tr>";
                data_index++;
            }
           
        });        
    scoreboard.style.display="block";
}

// cross button click to display container login or main page
document.getElementById("icon-cross").addEventListener('click',()=>{
    if(scoreboard_track==1){
        document.getElementById("main_page").style.display="block";
    }
    else if(scoreboard_track==2){
        document.getElementById("complete_win_page").style.display="block";
    }
    else{
        document.getElementById("containerlogin").style.display="block";   
    }
    scoreboard.style.display="none";
})

// storing data on browser remove or refresh
window.onbeforeunload=function() {
    if(unload_save==0){
        data1="\n"+Date()+"     "+username.value+"	                  "+phoneno.value+"         	"+score;
        data="\n^"+username.value+"$"+phoneno.value+"!"+score;
        $.ajax({
            method: "POST",
            url: "ind.php",
            data: { data: data}
          })
            .done(function( response ) {
            });
         $.ajax({
            method: "POST",
            url: "ind.php",
            data: { data1: data1}
          })
            .done(function( response ) {
            });
    }
    return "Are you sure to leave the tab?"; 
  }

// Sorting of table data in descending order
function display(arr){
    tables.innerHTML="<tr><th style='width: 30px;'>S.No.</th><th>Name</th><th>Score</th></tr>";
    for(u in arr){
        tables.innerHTML+="<tr><td style='width: 30px;'>"+(Number(u)+1)+"</td><td>"+arr[u].name+"</td><td>"+arr[u].scores+"</td></tr>";
    }
}

function func_sort(){
        data_arr_sort=data_arr.filter((v)=>{return Number(v.scores)>-10;});
        data_arr_sort.sort(function(a,b){return Number(b.scores) - Number(a.scores);});
        display(data_arr_sort);
}