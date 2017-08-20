
function Canvas(dataURL, width, height) {
    this.dataURL = dataURL;
}

window.onkeyup = function(e) {
    
    if (e.keyCode == 44){ // 44 keyCode = print screen
        createCanvas();
    }
}

window.onkeydown = function(e) {
    if (e.keyCode == 220 && e.ctrlKey)
        createCanvas();
}


createCanvas = function() {
    console.log("Getting screenshot.");

        html2canvas( document.getElementsByTagName("html")[0], {
            onrendered: function(canvas){
                // canvas to img element
                dataURL = canvas.toDataURL();
                canvas_obj = new Canvas(dataURL, canvas.width, canvas.height);


                console.log("Sending message.");
                chrome.runtime.sendMessage("kahfopkjhchkdajhccmlmfbcaeoeljkl", {
                    "type": 'page-contents', 
                    "data": canvas_obj,
                    "page_title": document.title,
                    "page_url": window.location.href,
                });
            }
        } );
}

/*returns element*/function getContents(){
    return document.getElementsByTagName("head")[0];
}