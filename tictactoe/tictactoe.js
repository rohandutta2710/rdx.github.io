//0-> Circle Winner
//1-> Cross Winner
var clicksound=new Audio("./new_pop_up1.mp3");
var winsound=new Audio("./complete win sound.wav");
var buttons=document.querySelectorAll("button");
var icon=0; //to check whether cross will come or circle
var code=0;   //0 and 1 to store in the array or user get the row columns on whcih players clicked
var arr=[]; 

//setting the grid row and column of each button
window.onload=()=>{
    var start=0;
        for(i=0; i<3; i++){
            for(k=0; k<3; k++){
                buttons[start].style.gridColumnStart=k+1;
                buttons[start].style.gridRowStart=i+1;
                arr.push(5);
                start++;
            }
        }
}

//which button is pressed by the gamer and displaying the cross and circle sign
for(item of buttons){
    item.addEventListener("click",(e)=>{
        buttonsID=e.target.id;
        for(k in buttons){
            if(buttons[k].id==buttonsID && arr[k]==5){
                if(icon%2==0){
                    buttons[k].innerHTML="<i class=\"far fa-circle\"></i>";
					clicksound.play();
                    code=0;
                }
                else{
                    buttons[k].innerHTML="<i class=\"fas fa-times\"></i>";
					clicksound.play();
                    code=1;
                }
                icon++;
                arr[k]=code;
                if(icon>4){
                    var result=winnercheck();
					if(result==0){
						alert ("Player1 won.");
						winsound.play();
						buttons=[];
					}
					else if(result==1){
						alert ("Player2 won.");
						winsound.play();
						buttons=[];
					}
                    else if(icon==9 && result==2){
                        alert("No one win.")
                    }
                }
                break;
            }
        }
    });
}

function winnercheck(){
	var lamda;
	var check=1;
	for(var i=0;i<3;i++)
	{
			if(i==0 && check<3)			//checking pattern column wise
			{
				for(var j=0;j<3;j++)
				{
					check=1;
					lamda=arr[j];
					for(var k=j+3;k<9;k++)
					{
						if(lamda==arr[k])
						{
							check+=1;
						}
						else
						{
							break;
						}
						k=k+2;
					}
					if(check==3){
						return lamda;
					}
				}
			}
			else if(i==1 && check<3)		//checking pattern row wise
			{
				for(var j=0;j<9;j++)
				{
					check=1;
					lamda=arr[j];
					for(var k=j+1;k<j+3;k++)
					{
						if(lamda==arr[k]){
							check+=1;
						}
						else{
							break; 
						}
					}
					if(check==3){
						return lamda;
					}
					j=j+2;
				}
			}
			else if(i==2 && check<3){		//checking diagonal pattern 
					check=1;
					lamda=arr[0];
					for(var k=4;k<9;k++){
						if(lamda==arr[k]){
							check++;
						}
						else{
							break;
						}
						k=k+3;
					}
					if(check<3){
						check=1;
						lamda=arr[2];
						if(lamda==arr[4] && lamda==arr[6]){
							return lamda;
						}
					}
					else{
						return lamda;
					}
				}
	}
    return 2;
}
