var firebase, room;

jQuery(document).ready(function() {

room = document.getElementById("room");

firebase = new Firebase('https://eggbutty.firebaseio.com');

var obj = document.getElementById('room');


obj.addEventListener('touchend', function(event) {
    obj.innerHTML = "";
}, false);

obj.addEventListener('touchmove', function(event) {
  if (event.targetTouches.length >= 1) {
  	obj.innerHTML = "no of touches = " + event.targetTouches.length;
    for(var i = 0; i < event.targetTouches.length; i++) {
    	var touch = event.targetTouches[i];
    	if(i === 1) {
    		var x1 = event.targetTouches[1].pageX,
    		x0 = event.targetTouches[0].pageX,
    		y1 = event.targetTouches[1].pageY,
    		y0 = event.targetTouches[0].pageY,
    		dx = x1 - x0,
    		dy = y1 - y0,
    		cx = (x0 + x1) / (2 * obj.clientWidth) - 0.5,
    		cy = (y0 + y1) / (2 * obj.clientWidth) - 0.5;

    		var theta = Math.atan(-dy/dx);// * 180 / Math.PI;
    		obj.innerHTML += ("<br>" + theta);
    		firebase.child('angle').set(theta);
    		firebase.child('centre').set({x:cx, y:cy});
    		}
    	//obj.innerHTML += ("<br>" + touch.identifier + " " + touch.pageX + " " + touch.pageY + " " + touch.radiusX);
 		}
	}
event.preventDefault();
}, false);

});