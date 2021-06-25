

let screen=document.getElementById('screen');
buttons=document.querySelectorAll('button');
let screenvalue='';
let screeneval='';
// console.log("Delhi.")
for(item of buttons)
{
    item.addEventListener('click',(e)=>{
        buttonText = e.target.innerText;
        //console.log('Text=',buttonText);
        
        //operators
        if(buttonText=='x')                  //else
        {
            screenvalue += buttonText;
            screeneval += '*';
            screen.value=screenvalue;
        }
        else if(buttonText=='÷')             //else
        {
            screenvalue +=buttonText;
            screeneval += '/';
            screen.value=screenvalue;
        }
        else if(buttonText=='+')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='-')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='%')               
        {
            screenvalue +=buttonText;
            screeneval += '/100';
            screen.value=screenvalue;
        }
        else if(buttonText=='⌫')                
        {
            if(screenvalue.endsWith("sin(") || screenvalue.endsWith("cos(")||screenvalue.endsWith("tan("))
            {
                screenvalue=screenvalue.substring(0,screenvalue.length - 4); //4
                screeneval =screeneval.substring(0,screeneval.length-9);    //9
                screen.value=screenvalue;
            }
            else if(screenvalue.endsWith("sec(") || screenvalue.endsWith("cot(") || screenvalue.endsWith("cosec("))
            {
                screenvalue=screenvalue.substring(0,screenvalue.length - 4);    //4
                if(screenvalue.endsWith("co"))
                {
                    screenvalue=screenvalue.substring(0,screenvalue.length - 2);  
                }
                screeneval =screeneval.substring(0,screeneval.length-11);   //11
                screen.value=screenvalue;
            }
            else if(screenvalue.endsWith("sin-1(") || screenvalue.endsWith("cos-1(")|| screenvalue.endsWith("tan-1("))
            {
                screenvalue=screenvalue.substring(0,screenvalue.length - 6);
                screeneval =screeneval.substring(0,screeneval.length-10);
                screen.value=screenvalue;
            }
            else if(screenvalue.endsWith("sec-1(") ||screenvalue.endsWith("cot-1(") || screenvalue.endsWith("cosec-1("))
            {
                screenvalue=screenvalue.substring(0,screenvalue.length - 6);
                if(screenvalue.endsWith("co"))
                {
                    screenvalue=screenvalue.substring(0,screenvalue.length - 2);
                }
                screeneval =screeneval.substring(0,screeneval.length- 12);
                screen.value=screenvalue;
            }
            else if(screenvalue.endsWith("^"))
            {
                screenvalue=screenvalue.substring(0,screenvalue.length - 1);
                screeneval =screeneval.substring(0,screeneval.length-2);
                screen.value=screenvalue;
            }
            else if(screenvalue.endsWith("%"))
            {
                screenvalue=screenvalue.substring(0,screenvalue.length - 1);
                screeneval =screeneval.substring(0,screeneval.length-4);
                screen.value=screenvalue;
            }
            else if(screenvalue.endsWith("𝝅"))  
            {
                screenvalue=screenvalue.substring(0,screenvalue.length - 2); //because pi is removing from 2 backspaces
                screeneval =screeneval.substring(0,screeneval.length-7);
                screen.value=screenvalue;
            }
            else if(screenvalue.length==0)
            {
               screen.value="Error";
            }
            else
            {
                screenvalue=screenvalue.substring(0,screenvalue.length - 1);
                screeneval =screeneval.substring(0,screeneval.length-1);
                screen.value=screenvalue;
            }
        }
        else if(buttonText=='C')
        {
            screenvalue ="";
            screeneval ="";
            screen.value=screenvalue;
        }
        else if(buttonText=='𝝅')                
        {
            screenvalue +='𝝅';
            screeneval += 'Math.PI'/*.toFixed(3)*/;
            screen.value=screenvalue;
        }
        else if(buttonText=='(')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText==')')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }

        //Numeric buttons
        else if(buttonText=='1')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='2')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='3')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='4')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='5')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='6')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='7')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='8')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='9')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='0')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='.')
        {
            screenvalue +=buttonText;
            screeneval += buttonText;
            screen.value=screenvalue;
        }
        else if(buttonText=='=')
        {
            if(Math.abs(eval(screeneval))<0.0000000001)
            {
                screen.value='0'
                screenvalue ='';
                screeneval =screenvalue;
            }
            else if(Math.abs(eval(screeneval))>999999999999999)
            {
                screen.value='infinity';
                screenvalue ='';
                screeneval =screenvalue;
            }
            else
            {
                screen.value=eval(screeneval);
                screenvalue =''+screen.value;
                screeneval =screenvalue;
            }
        }
        else if(buttonText=='xy')              //power button
        {
            screenvalue +='^';
            screeneval += '**';
            screen.value=screenvalue;
        }

        //trigo functions   changed
        else if(buttonText=='sin')
        {
            screenvalue +=buttonText+'(';
            screeneval += 'Math.'+buttonText+'(';
            screen.value=screenvalue;
        }
        else if(buttonText=='cos')
        {
            screenvalue +=buttonText+'(';
            screeneval += 'Math.'+buttonText+'(';
            screen.value=screenvalue;
        }
        else if(buttonText=='tan')
        {
            screenvalue +=buttonText+'(';
            screeneval += 'Math.'+buttonText+'(';
            screen.value=screenvalue;
        }
         else if( buttonText=='sec')        
        {
            screenvalue +=buttonText+'(';
            screeneval += '1/Math.cos(';
            screen.value=screenvalue;
        }
        else if(buttonText=='cosec')    
        {
            screenvalue +=buttonText+'(';
            screeneval += '1/Math.sin(';
            screen.value=screenvalue;
        }
        else if(buttonText=='cot')       
        {
            screenvalue +=buttonText+'(';
            screeneval += '1/Math.tan(';
            screen.value=screenvalue;
        }
        
        //Inverse Trigo
        else if(buttonText=='sin-1')
        {
            screenvalue +=buttonText+'(';
            screeneval += 'Math.asin(';
            screen.value=screenvalue;
        }
        else if(buttonText=='cos-1')
        {
            screenvalue +=buttonText+'(';
            screeneval += 'Math.acos(';
            screen.value=screenvalue;
        }
        else if(buttonText=='tan-1')
        {
            screenvalue +=buttonText+'(';
            screeneval += 'Math.atan(';
            screen.value=screenvalue;
        }   
        else if(buttonText=='cosec-1')      
        {
            screenvalue +=buttonText+'(';
            screeneval += 'Math.asin(1/';
            screen.value=screenvalue;
        }
        else if(buttonText=='sec-1')        
        {
            screenvalue +=buttonText+'(';
            screeneval += 'Math.acos(1/';
            screen.value=screenvalue;
        }
        else if(buttonText=='cot-1')         
        {
            screenvalue +=buttonText+'(';
            screeneval += 'Math.atan(1/';
            screen.value=screenvalue;
        }
        else 
        {
            //edited
            //screen.value("Error");
            //screenvalue=screen.value;
            //screeneval+=screen.value;
            //screen.value=screenvalue;
        }

    })
}
