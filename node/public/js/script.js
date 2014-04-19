var slide = 2;

$(document).ready(function() {
    setInterval(function() {
        timerslide(6);
    }, 10000);
});

function timerslide(nbmax) {
	var url = '../images/slider/bg'+slide+'.jpg';
    if (slide <= nbmax) {
    	$('#background').fadeTo('slow',0.3, function() {
    		$(this).css({background: 'url('+url+')'});
    	}).fadeTo('slow',1);
        slide++;
    } else {
        slide = 1;
    }

}