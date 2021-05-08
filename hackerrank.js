const p = require("puppeteer");
// let browser;//use to store the instance of browser
let page;// use to store the instance of page
// let code;
// let lang;


//using async await

(async function(){
    let browser = await p.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"],
        slowMo:50,
    })
    let pages = await browser.pages();
    page = pages[0];
    await page.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");


    await page.type("#input-1","fibipoy513@httptuan.com")
    
    await page.type("#input-2","12345678");
    await clickselect( ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");

    await clickselect("[title ='Interview Preparation Kit'] a");
    await clickselect( ".ui-card.ui-layer-3.active-card");


    await clickselect(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");

    let flag = true;
    while(flag){
        try{
                await clickselect( "[data-attr2='Editorial']");
                await handleLockBtn();
                await page.waitForSelector("h3");
                let lang = await page.evaluate(function () {
                    return document.querySelector("h3").innerText;
                });
                await page.waitForSelector("pre");
                let code = await page.evaluate(function () {
                    return document.querySelector("pre").innerText;
                });
                await page.click("[data-attr2='Problem']");
                await page.waitForSelector(".custom-select.select-language");
                await page.click(".custom-select.select-language");
                await page.type(".custom-select.select-language",lang);
                await page.keyboard.press('Enter');
                await page.waitForSelector(".checkbox-input");
                await page.click(".checkbox-input");
                await page.type(".custominput",code);
                await page.keyboard.down('Control');
                await page.keyboard.press('A');
                await page.keyboard.press('X');
                await page.click(".monaco-editor.no-user-select .vs");
                await page.keyboard.press('A');
                await page.keyboard.press('V');
                await page.keyboard.up('Control');
                await page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
                await page.waitForTimeout(2000);
                await clickselect(".ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link.ui-btn-styled");
            
            // await page.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link.ui-btn-styled");
            // await page.click(".ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link.ui-btn-styled");
                    //.ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link.ui-btn-styled
                    // ui-btn ui-btn-normal ui-btn-secondary submission-wrapper-next-entity-btn ui-btn-link ui-btn-styled
        }catch(err){
            flag = false;
        }
    }
    console.log(1);
        

})();




//using promise
// p.launch({
//     headless:false,
//     defaultViewport:null,
//     args:["--start-maximized"],
//     // slowMo:50,
// })
// .then(function(b){
//     browser = b;
//     return b.pages();
// }).then(function(p){
//     page = p[0];
//     return page.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
// }).then(function(){
//     return page.type("#input-1","dofokiv702@tripaco.com")
// }).then(function(){
//     return page.type("#input-2","12345678");
// }).then(function(){
//     return clickselect( ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
// }).then(function () {
//     return clickselect("[title ='Interview Preparation Kit'] a");
// }).then(function(){
//     return clickselect( ".ui-card.ui-layer-3.active-card");
// }).then(function(){
//     return clickselect(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");
// })

// // yha se kaam baar baar krna ha 


// .then(function(){
//     return clickselect( "[data-attr2='Editorial']");
// }).then(function(){
//     return handleLockBtn();
// }).then(function () {
//     return page.waitForSelector("h3");
// }).then(function(){
//     return page.evaluate(function () {
//         return document.querySelector("h3").innerText;
//       });
// }).then(function(a){
//     lang = a;
//     // return page.click("[data-attr2='Problem']");
// })





// .then(function () {
//     return page.waitForSelector("pre");
// }).then(function(){
//     return page.evaluate(function () {
//         return document.querySelector("pre").innerText;
//       });
// }).then(function(v){
//     code = v;
//     return page.click("[data-attr2='Problem']");
// }).then(function(){
//     return page.waitForSelector(".custom-select.select-language");
// })
// .then(function(){
//     return page.click(".custom-select.select-language");
// })
// .then(function(){
//     // console.log(lang);
//     return page.type(".custom-select.select-language",lang);
// }).then(function(){
//     return page.keyboard.press('Enter');
// })




// .then(function(){
//     return page.waitForSelector(".checkbox-input");
// }).then(function(){
//     return page.click(".checkbox-input");
// }).then(function(){
//     return page.type(".custominput",code);
// }).then(function(){
//     return page.keyboard.down('Control');
// }).then(function(){
//     return page.keyboard.press('A');
// })
// .then(function(){
//     return page.keyboard.press('X');
// }).then(function(){
//     return page.click(".monaco-editor.no-user-select .vs");
// }).then(function(){
//     return page.keyboard.press('A');
// }).then(function(){
//     return page.keyboard.press('V');
// }).then(function(){
//     return page.keyboard.up('Control');
// })
// .then(function(){
//     return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
// }).then(function(){
//     return page.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link.ui-btn-styled");
// }).then(function(){
//     return page.click(".ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link.ui-btn-styled");
// })

// this is the function for selector wait and when selector is present then click that selector
async function clickselect(cla){
    await page.waitForSelector( cla, {visible: true})
    
        await Promise.all([
            page.waitForNavigation({ waitUntil: "networkidle2" }),
            page.click(cla),
        ])
    
}
async function handleLockBtn(){
    try{
        await page.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled", {visible: true,})  
        await page.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
    }catch(err){
            return 0;
    }
}





