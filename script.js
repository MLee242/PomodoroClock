const container = document.querySelector("#container");
const buttons = document.querySelectorAll("button");
const d1 = document.getElementById("d1");
const d2 = document.getElementById("d2");
const d3 = document.getElementById("d3");
const menu = container.getElementsByClassName("menu");
const ba1 = document.getElementById("bar1");
const ba2 = document.getElementById("bar2");

let session = 25;
let br = 5;
let ticking = false;
let disable = true;
let id = true;
let s = 1;
let b = 1;
let textcolor = "#008000";
let totalwid = 0;
let totalwid2 = 450;
let i = 0;
let j = 0;
const MAXSESSION = 1000;
const MINSESSION = 1;
const MAXBR = 1000;
const MINBR = 1;


const wid = 450;


function outputbuttonid(button){
    console.log(button.id)
    if(disable){
       if(button.id == 1){
            if(session > MINSESSION){
                session = session - 1;
            }
       }else if(button.id == 2){
            if(session < MAXSESSION){
                session = session + 1;
            }
       }else if(button.id == 3){
           if(br > MINBR){
               br = br - 1;
           }
       }else if(button.id == 4){
           if(br < MAXBR){
               br = br + 1;
           }
        }
        updateDisplay();
    }
    if(button.id == 5){
        if(ticking){
            button.textContent = "START";
            menu[0].style.color = "#666";
            clearInterval(id);
            id = true;
        }else{
            if(disable){
                disable = false;
                s = session*60;
                b = br*60; 
                i = wid/s;
                j = wid/b;
            }
            button.textContent = "STOP";
            menu[0].style.color = textcolor;
            d3.style.color = textcolor;
            id = setInterval(decrement, 1000);
        }
        ticking = !ticking;
    }else if(button.id == 6){
       reset();
    }


    

    function decrement(){
        if(ticking){
            
            let curr = 0;
            
            let incre = 0;
            if(s > 0){
                s = s-1;
                curr = s;
                incre = i;
            }else if(s == 0 && b > 0){
                menu[0].textContent = "BREAK";
                curr = b;
                b = b-1;
                incre = j;

            }else if(b == 0){
                s = session*60;
                b = br*60;
                menu[0].textContent = "SESSION";
                curr = s;
                incre = i;
            }
            
            let hour = Math.floor(curr / 3600); 
            let min = Math.floor((curr % 3600) / 60);
            let sec = Math.floor(curr % 3600 % 60);
          
            
            if(min < 10){
                min = '0' + min;
            }
            if(sec < 10){
                sec = '0' + sec;
            }
            if(hour < 10){
                hour = '0' + hour;
            }

            if(hour > 0){
                d3.textContent = `${hour}:${min}:${sec}`;
            }else{
                d3.textContent = `${min}:${sec}`;
            }
            if(curr <= 5){
                textcolor = '#FF0000';
            }else if(curr <= 15){
                textcolor = '#FFF000';
            }else{
                textcolor = '#008000';
            }
            if(curr != br*60 && curr != session*60){
                totalwid = totalwid + incre;
                totalwid2 = wid-totalwid;
                ba1.style.borderColor = "#464686";
            }else{
                ba1.style.borderColor = "#DCDCDC";
                totalwid = 0;
                totalwid2=wid;
            }
            
           
            ba1.style.paddingRight = `${totalwid}px`;
            ba2.style.paddingLeft = `${totalwid2}px`;
           
            menu[0].style.color = textcolor;
            d3.style.color = textcolor;


        }else{
            console.log("h");
        }
    }



    button.blur();
    
}



function reset(){
    textcolor = "#008000";
    disable = true;
    ticking = false;
    buttons[4].textContent = "START";
    menu[0].style.color = "#666";
    d3.style.color = "#999";
    menu[0].textContent = "SESSION";
    updateDisplay();
    clearInterval(id);
    totalwid = 0;
    totalwid2 = wid;
    ba1.style.borderColor = "#DCDCDC";
    ba1.style.paddingRight = `${totalwid}px`;
    ba2.style.paddingLeft = `${totalwid2}px`;
}
function updateDisplay(){
    d1.textContent = `${session}`;
    d2.textContent = `${br}`;
    
    if(session >= 60){
        
        let h = Math.floor(session / 60);
        if(h < 10){
            h = '0' + h;
        }
        let min = session % 60;
        if(min < 10){
            min = '0' + min;
        }
        d3.textContent = `${h}:${min}:00`;
    }else{
        d3.textContent = `${session}:00` ;
        if(session < 10){
            d3.textContent = '0' + d3.textContent;
        }
    }


    
}



buttons.forEach(button =>{ 
    button.addEventListener('click', function(){
        
        outputbuttonid(button);
    });
});

updateDisplay();