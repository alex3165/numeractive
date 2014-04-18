var slide = 0;


$(document).ready(function(){
	setInterval(function(){
		timerslide(4);
	},2000);
});

function timerslide (nbmax) {
	if (slide<nbmax) {
		$('#background').css('background', '');
		slide++;
	}else{
		slide=0;
	}
	
}