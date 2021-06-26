buttons=document.querySelectorAll("button");
var complete_win=document.getElementById('complete_win_sound'); //complete win
var button_sound=document.getElementById('button_sound');       //button sound
var spinner=document.getElementById('spinner');                 //spinner
var arrow=document.getElementById("arrow");
var a;  //random number for rotation
var remainder; //to divide the number present in a by 360
var num,ids;  //for checking the number comes on wheel
var data,data1;      //data for storing the end data name and all
var username=document.getElementById("fullname");   //fullname entered by user
var phoneno=document.getElementById("phoneno");     //phoneno entered by user
var scoreboard_track,unload_save,op;
var tables=document.getElementById("table");
var scoreboard=document.getElementById("boards");
// Login page to Main page
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
                    if(username.value[b]=="$"||username.value[b]=="!"||username.value[b]=="@"||username.value[b]=="#"||username.value[b]=="^"||username.value[b]=="*"||username.value[b]=="&"||username.value[b]=="%"||username.value[b]=="+"||username.value[b]=="-"||username.value[b]=="("||username.value[b]==")"||username.value[b]==":"||username.value[b]==";"){
                        l=1;
                        w=1;
                        break;
                    }
                }
                if(w==0){
                    for(b=0;b<phoneno.value.length;b++){
                        if(phoneno.value[b]=="$"||phoneno.value[b]=="!"||phoneno.value[b]=="@"||phoneno.value[b]=="#"||phoneno.value[b]=="^"||phoneno.value[b]=="*"||phoneno.value[b]=="&"||phoneno.value[b]=="%"||phoneno.value[b]=="("||phoneno.value[b]==")"||phoneno.value[b]=="+"||phoneno.value[b]=="-"||phoneno.value[b]==":"||phoneno.value==";"){
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
//click arrow spinning
arrow.addEventListener("dblclick",Spin_wheel);
function Spin_wheel(){
        arrow.removeEventListener("dblclick",Spin_wheel);
        playbutton(button_sound);
        a=(Math.floor(Math.random()*30)+1)*1734;
        spinner.style.transform="rotateZ("+a+"deg)";
        setTimeout(func,7000);
}

// button sound or musics
function playbutton(x){
        x.play();
}

// main program to find at which number spinner stopped
function func()
{
        remainder=a%360;
        if(remainder>=15 & remainder<=36)
        {
                num=16;
        }
        else if(remainder>=37 & remainder<=58)
        {
                num=15;
        }
        else if(remainder>=59 & remainder<=80)
        {
                num=14;
        }
        else if(remainder>=81 & remainder<=103)
        {
                num=13;
        }
        else if(remainder>=104 & remainder<=127)        
        {
                num=12;
        }
        else if(remainder>=128 & remainder<=149)
        {
                num=11;
        }
        else if(remainder>=150 & remainder<=171)        
        {
                num=10;
        }
        else if(remainder>=172 & remainder<=192)
        {
                num=9;
        }
        else if(remainder>=193 & remainder<=215)
        {
                num=8;
        }
        else if(remainder>=216 & remainder<=236)
        {
                num=7;
        }
        else if(remainder>=237 & remainder<=260)
        {
                num=6;
        }
        else if(remainder>=261 & remainder<=283)
        {
                num=5;
        }
        else if(remainder>=284 & remainder<=307)
        {
                num=4;
        }
        else if(remainder>=308 & remainder<=328.5)
        {
                num=3;
        }
        else if(remainder>=329 & remainder<=352)
        {
                num=2;
        }
        else
        {
                num=1;
        }
        data1="\n"+Date()+"     "+username.value+"	                  "+phoneno.value+"         	"+(num*10);
        data="\n^"+username.value+"$"+phoneno.value+"!"+(num*10);
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
                data:{data1:data1}
                
              })
        .done(function( response ) {
                });
        setTimeout(complete_winner,1000);
}
// complete winner page
function complete_winner(){
        unload_save=10;
        document.getElementById("main_page").style.display="none";
        scoreboard.style.display="none";
        document.getElementById("complete_win_page").style.display="block";
        document.getElementById("scoring").innerHTML="Your score is "+(num*10)+".";
        playbutton(complete_win_sound);
}

// scoreboard Display
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
    
window.onbeforeunload=function() {
        if(unload_save==0){
                return "Are you sure to cut the tab?";
        } 
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