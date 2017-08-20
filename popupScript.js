// get collection object

current_collection = JSON.parse(window.localStorage.getItem('current_capture'));

// make links work
$(document).ready(function(){
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});