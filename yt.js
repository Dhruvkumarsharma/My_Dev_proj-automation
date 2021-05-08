const p = require("puppeteer");
let url = process.argv[2];
let page;
// let sum = 0;
(async function(){
    let browser = await p.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"],
        // slowMo:50,
    })
    let pages = await browser.pages();
    page = pages[0];
    await page.goto(url);
    let reqTime = await page.evaluate(async function () {
        
        function hmsToSecondsOnly(str) {
            var p = str.split(':'),
            s = 0, m = 1;
            
            while (p.length > 0) {
                s += m * parseInt(p.pop(), 10);
                m *= 60;
            }
            
            return s;
        }
        
        let tVids =  document.querySelector("#stats .style-scope.yt-formatted-string");
        let tno = Number(tVids.innerText);
        let scrolls = Math.ceil(tno/100);

        let timew = await new Promise(function(resolve, reject){
            let interval =  setInterval(function(){
                let vids = document.querySelectorAll('.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer');
                vids[vids.length-1].scrollIntoView();
                
                if(Math.ceil(vids.length/100) == scrolls){
                    clearInterval(interval);
                    let timeArr = document.querySelectorAll("span.style-scope.ytd-thumbnail-overlay-time-status-renderer");
                    let totalTime = 0;
                    for(let i = 0;i<timeArr.length;i++){
                        totalTime += hmsToSecondsOnly(timeArr[i].innerText);
                    }
                    console.log(totalTime/ (60*60));
                    resolve(totalTime/ (60*60));
                };
                
            }, 5000);
            
        })
        return timew;
    });
    browser.close();
    let hrs = reqTime.toString().split(".")[0]; ///before
    let mins = reqTime.toString().split(".")[1]; ///after
    let pow = 1;
    for(let x = 0;x<mins.length;x++){
            pow*=10;
    }
    // console.log(pow);
    mins = mins/pow;
    mins = mins*60;
    let tInMin = mins.toString().split(".")[0]; ///before
    let sec = mins.toString().split(".")[1]; ///after
    pow = 1;
    for(let x = 0;x<sec.length;x++){
        pow+=10;
    }
    sec = sec/pow;
    sec = sec*60;
    sec = sec/100; ///before
    console.log(hrs +":" + tInMin + ":" + sec.toString().substring(0,2));
    // console.log(tInMin);
    // console.log(sec);
    
    
    
    // await page.mouse.wheel({ deltaY: +MAX_VALUE})
    // let remainingScroll  = Math.ceil(noOfVids)
    
    
})();


