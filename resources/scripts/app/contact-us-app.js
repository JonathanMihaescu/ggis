requirejs(['domReady','blurryBg'],function (domReady){

	domReady(function() {
		setMainHeight();
		setMapHeight();
	});

	window.addEventListener('orientationchange',function(){
		setMainHeight();
		setTimeout(setMapHeight, 500);
	});

	window.addEventListener('resize',function(event){
		setMainHeight();
	});

	/* Change the height limit once footer is ready*/
	function setMainHeight(){
		var footerHeight = document.getElementsByTagName("footer")[0].offsetHeight;
		var headerHeight = document.getElementsByTagName("header")[0].offsetHeight;

  		var heading = document.getElementById("contact-heading-section");
  		var content = document.getElementsByClassName("section-container")[0];
		var headingStyle = getComputedStyle(heading);
		var contentStyle = getComputedStyle(content);
		var mainHeight = parseInt(headingStyle.marginTop) + parseInt(headingStyle.marginBottom) +
			parseInt(contentStyle.marginTop) + parseInt(contentStyle.marginBottom) +
			heading.offsetHeight + content.offsetHeight;
		var main = document.getElementsByTagName("main")[0];
		var restOfHeight = window.screen.height - footerHeight - headerHeight;
		if(mainHeight < restOfHeight ){
			main.style.marginBottom = restOfHeight - mainHeight +  "px"; 
		}else{
			main.style.marginBottom = 0 + "px";
		}
	} 
	function setMapHeight(){
		if(window.innerHeight<467){
			var map = document.getElementsByTagName("iframe")[0];
			map.style.height = window.innerHeight - 20 + "px";
				
		}
	}
});