// Register SW
let postselect,postscontainer;
window.addEventListener('load', async function(){

    if(this.navigator.serviceWorker){
        // aviabale 

        // to register service worker use register with serviceworker 
        await this.navigator.serviceWorker.register('./sw.js');
        console.log("Service Worker Exist ");

    }else{
        // not Availiable
        console.log("Service Worker Not Exist ");
    }
});//end of load