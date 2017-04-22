birthOrigin = [0,64,128,192,256];
miss = 0
out = 1000;
play = 1;
point = 0;
playerCol = 128;
document.getElementById('player').style.left = playerCol+'px'
document.getElementsByTagName('body')[0].onkeydown = function(){
	key = event.code;
	console.log(key);
	switch(key) {
		case 'Enter':
		document.getElementById('start').click();
		break;
		case 'NumpadEnter':
		document.getElementById('start').click();
		break;
		case 'ArrowLeft':
		document.getElementById('ll').click();
		break;
		case 'ArrowRight':
		document.getElementById('rr').click();
		break;
	}
}

function darand(num){
	var x = Math.floor((Math.random() * num));
	return x;
}
function birth(){
	var g = darand(3)+1;
	var col = birthOrigin[darand(5)];
	var gid = genID();
	var gift = document.createElement("div");
	gift.setAttribute("id","g-"+gid);
	gift.setAttribute("class","dagift gift-"+g);
	gift.setAttribute("data-col",col);
	gift.setAttribute("data-type",g);
	gift.innerHTML = '<div id="draw-gift-'+g+'"><iframe src="gift-'+g+'.html" scrolling="no"></iframe></div>'
	gift.style.left = col+'px';
	if (play == 1) {
		document.getElementById('gift-wrap').appendChild(gift);
		fall(gid,0);
		return 'created '+gid;
	}
}
function fall(id,count){
	if (play == 1) {
		if (count<7) {
			var top = count*64;
			document.getElementById('g-'+id).style.top = top+'px';
			count = count+1;
			if (count == 6) {
				gcol = document.getElementById('g-'+id).getAttribute('data-col');
				if (gcol == playerCol) {
					pluspoint(id);
				}
				else{
					missgift(id);
				}
			}
			else{
				setTimeout(function(){ fall(id,count); }, out);
			}
		}
	}
}

function genID() {
	var d = new Date();
	var n = d.getTime();
	return n;
}

function start(){
	stb = darand(2);
	if (play == 1) {
		setTimeout(function(){ 
			if (stb == 1) {
				birth();
			}
			start();
		}, out);
	}
}
function clear(id){
	var element = document.getElementById('g-'+id);
	element.parentNode.removeChild(element);
}
function pluspoint(id){
	point = point+1;
	window.navigator.vibrate(150);
	document.getElementById('point').innerHTML = point;
	console.log(point);
	setTimeout(function(){ clear(id); }, (out/10));
}
function missgift(id){
	document.getElementById('g-'+id).setAttribute("data-miss","1")
	document.getElementById('g-'+id).style.opacity = 0;
	document.getElementById('g-'+id).style.top = '388px';
	miss = miss+1;
	document.getElementById('life').innerHTML = (9-miss);
	console.log("miss "+id)
	if (miss == 9) {
		play = 0;
		window.navigator.vibrate([500,200,1000]);
	}
	setTimeout(function(){ clear(id); }, (500));
}

function play_r(){
	if (playerCol<=192) {
		window.navigator.vibrate(50);
		playerCol = playerCol+64;
		document.getElementById('player').style.left = playerCol+'px'
	}
}

function play_l(){
	window.navigator.vibrate(50);
	if (playerCol>=64) {
		playerCol = playerCol-64;
		document.getElementById('player').style.left = playerCol+'px'
	}
}
function letsplay(){
	document.getElementById('start-wrap').style.display = 'block';
	document.getElementById('ready-wrap').style.display = 'none';
	start();
}
setTimeout(function(){ out = 800; }, (20000));
setTimeout(function(){ out = 600; }, (60000));
setTimeout(function(){ out = 500; }, (120000));
setTimeout(function(){ out = 300; }, (10000000));
setTimeout(function(){ out = 200; }, (20000000));