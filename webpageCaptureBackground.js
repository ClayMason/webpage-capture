// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });

EXTID = "hcenmdjkklfnlceadpfoaecpaebecank";

function WebpageCapture(title, url, canvas, time) {
    this.title = title;
    this.url = url;
    this.canvas = canvas;
    this.time = time;
}

function CaptureCollection() {
    this.collection = [];
    this.identify = "Capture Collection for Webpage Capture";
}

// Function Definitions
addToStorage = function (capture_collection_object) {
    window.localStorage.setItem('current_capture', JSON.stringify(capture_collection_object));
}
saveCapture = function(collection_object, capture_object) {
    collection_object.collection.push(capture_object);
    console.log("Collection" + this.collection);
    addToStorage(collection_object);
}
getFromStorage = function (){
    if (window.localStorage.getItem('current_capture') == undefined) {
        new_capture = new CaptureCollection();
        addToStorage(new_capture);
        return new_capture;
    }
    return JSON.parse(localStorage.getItem('current_capture'));
}


current_capture = getFromStorage();
update_popup = new Event('update-popup');

// // know how much is saved in local drive
// console.log(current_capture.collection.length);

sendNotification = function() {
    console.log("Sending notif.");
    
     chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'icon_notif.png',
        title: 'Screenshot Taken!',
        message: 'Your screenshot has been successfully taken. Click to view.'
     }, function(notificationId) {});

    console.log("Notif sent.");
};

setBadge = function () {
    value = current_capture.collection.length + "";
    if (value > 99) chrome.browserAction.setBadgeText({text: "99+"});
    else chrome.browserAction.setBadgeText({text: value});
}

formatCurrentDate = function(){
    date = new Date();

    current_hour = date.getHours() % 12;
    am_or_pm = "AM";
    if (date.getHours() > 11) am_or_pm = "PM";
    if (current_hour == 0) current_hour = 12;
    return date.getMonth() + " / " + date.getDate() + " / " + date.getFullYear() + "\t" + current_hour + ":" + date.getMinutes() + am_or_pm;
}

setBadge();
// // add listener
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){

    // check if it is from print screen event
        if (request.type == "page-contents"){
            console.log("Getting screenshot!");

            capture = new WebpageCapture(request.page_title, request.page_url, request.data, formatCurrentDate() );
            // save the capture and push the collection into local data
            saveCapture(current_capture, capture);
            console.log("Saved to collection.");
            console.log(getFromStorage());

            // create Notification.
            sendNotification();
            setBadge();
        }

    }
);

chrome.notifications.onClicked.addListener(function(){
    console.log("Notification has been clicked.");
    chrome.tabs.create({url: 'info.html'});
});



// $.when(getCurrentCaptureFromStorage()).then(function(x){
//     console.log(typeof x);
// });




// make a javascript class to hold the information of images taken and saved.
// pass an event to update the class instance in the popup javascript file.
