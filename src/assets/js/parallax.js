'use strict';
window.onload = function () {
	var dots = document.getElementsByClassName('background_dot')
		, container = document.getElementById('background')
		, backgroundImage = document.getElementById('background_image');

	var getRandomNumber = function (min, max) {
			return Math.round(Math.random() * (max - min) + min);
		};

	for(var i = 0; i <  dots.length; i++){
		var brake = getRandomNumber(2, 10)/5;
		new mouseMoveParralax({
			container: container
			, element: dots[i]
			, braking: brake
			, units: 'px'
			, translateScale: 0.8/brake
			// , isOposite: getRandomNumber(0, 1)
		});
	}
		new mouseMoveParralax({
			container: container
			, element: backgroundImage
			, braking: 14
			, isRotate: true
			, isOposite: true
		});
};
'use strict';
var mouseMoveParralax = function (userParams) {

	var defaultParams = {
		container: null //container element
		, element: null //parallax element
		, braking: 5 // offset brake
		, units: '%' // units type
		, translateScale: 1 // scale element for translate
		, isOposite: false // for mouse oposite move
		, isRotate: false // for 3D rotate
	};

	var thisFunc = this;

	var params = thisFunc.extendParams(defaultParams, userParams);

	//init scale
	params.element.style.transform = 'scale(' + params.translateScale +')';
	params.element.style['-webkit-transform'] = 'scale(' + params.translateScale +')';
	params.element.style['-moz-transform'] = 'scale(' + params.translateScale +')';

	var lastMove = 0;
	var myEventInterval = 25;
	params.container.addEventListener('mousemove', function (event) {
			if(Date.now() - lastMove > myEventInterval) {
				var translateValue = thisFunc.calculatePositionValue(event, params);

				params.element.style.transform = translateValue;
				params.element.style['-webkit-transform'] = translateValue;
				params.element.style['-moz-transform'] = translateValue;

				lastMove = Date.now();
			}

	});
};

mouseMoveParralax.prototype.extendParams = function(defaultParams, userParams){
	for(var key in userParams)
		if(userParams.hasOwnProperty(key))
			defaultParams[key] = userParams[key];
	return defaultParams;
};


mouseMoveParralax.prototype.calculatePositionValue = function(event, params){
	var	x = event.clientX
		, y = event.clientY
		, moveWayRelataiveMouse = params.isOposite ? -1 : 1
		, containerWidth = params.container.offsetWidth
		, containerHeight = params.container.offsetHeight

		, xMousePositionFromCenter = Math.round(moveWayRelataiveMouse * Math.round((x/containerWidth) * 200 - 100) / params.braking)
		, yMousePositionFromCenter = Math.round(moveWayRelataiveMouse * Math.round((y/containerHeight) * 200 - 100) / params.braking)

		, tiltx = yMousePositionFromCenter * 90 /100
		, tilty = xMousePositionFromCenter * 90 / 100

		, translateValue = 'translate(' + xMousePositionFromCenter + params.units + ', ' + yMousePositionFromCenter + params.units +')' + 'scale(' + params.translateScale +')'
		, rotateValue = 'rotateY( '+tilty*-1+'deg ) rotateX( '+tiltx+'deg )' ;

		return params.isRotate ? rotateValue : translateValue;
};