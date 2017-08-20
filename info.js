
current_capture = JSON.parse(localStorage.getItem('current_capture'));

var slider_width = 0;
var slider_height = 0;

convertToImg = function(canvasObject) {
    img = document.createElement("IMG");
    img.src = canvasObject.dataURL;
    img.style.width = canvasObject.width;
    img.style.height = canvasObject.height;

    return img;
};

slider_width = $(window).width() * 3/4;
slider_height = $(window).height() * 3/4;

all_imgs = []; // will contain img nodes
var len = current_capture.collection.length;

for(var i = 0; i < current_capture.collection.length; i++){
    all_imgs.push( convertToImg(current_capture.collection[i].canvas) );
}

// check if there are any screenshots in current_capture collection

if (current_capture.collection.length > 0) {
    console.log("Images available to show.");
// make slider
    $("#slide_container").css("width", slider_width);
    $("#slide_container").css("height", slider_height);
    $("#slide_parent").css("width", slider_width * len);
    $("#slide_controls").css("width", slider_width);
    $("#slide_controls").css("top", slider_height / 2 - $("#slide_controls").height() / 2);
    $("#image-info").css("width", slider_width);
    $("#info-content").css("width", slider_width - 300);

    // add images to slider
    for (var i = 0; i < len; i++){
        $(all_imgs[i]).css("width", slider_width);
        $(all_imgs[i]).css("height", slider_height);
        $("#slide_parent").append( all_imgs[i] );
    }

    slider_position = 1;

    changePosition = function (value) {
        if (slider_position + value < 1) slider_position = len;
        else if (slider_position + value > len) slider_position = 1;
        else slider_position += value;

        updateSliderPosition();
    };

    updateSliderPosition = function () {

        console.log("updating position");
        val = ( slider_position -1 ) * -1;
        new_pos = val * slider_width;
        
        console.log(new_pos);

        $("#slide_parent").css("left", new_pos);
        console.log("position updated");
    };

    updateInfo = function () {
        // update counter
        txt = slider_position + " / " + current_capture.collection.length;
        $("#image-count").text(txt);

        // update image information
        info_title = current_capture.collection[slider_position-1].title;
        if(info_title.length > 50) info_title = info_title.substring(0, 50) + "...";

        info_date = current_capture.collection[slider_position-1].time;

        $("#info-title a").text(info_title);
        $("#info-title a").attr('alt', current_capture.collection[slider_position-1].title);
        $('#info-title a').attr('href', current_capture.collection[slider_position-1].url);

        $("#info-link").text(current_capture.collection[slider_position-1].url);
        $("#info-time").text(info_date);

        // set download link

        $("#download-btn").text("DOWNLOAD");
        $("#download-btn").attr("href", current_capture.collection[slider_position-1].canvas.dataURL);
    };

    $("#left_control").click(function(){
        changePosition(-1);
        updateInfo();
    });
    $("#right_control").click(function(){
        changePosition(1);
        updateInfo();
    });

    $(document).ready(function(){
        updateInfo();
    });

}else {
    console.log("No images available.");

    $("body").html("<div id='no-content'>NO SCREENSHOTS TAKEN<br />USE PRNT SCRN(WINDOWS)<br />OR\nCTRL+\\(MAC)<br />TO TAKE A SCREENSHOT</div>");
}
