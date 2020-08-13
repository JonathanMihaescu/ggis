requirejs(['domReady'], function (domReady) {
	domReady(function() {
		setBlurryBgProperties();
	});
	window.addEventListener('resize',function(event){
		setBlurryBgProperties();
	});

	function setBlurryBgProperties(){
		var headingSection = document.querySelector('.heading-section-half');
		var headingWrapper = document.querySelector('#main-heading-wrapper');
		var blurBgElement = document.querySelector('.heading-section-half .blur-bg');
		
		var headingHeight = headingSection.clientHeight;
		var headingWidth = headingSection.clientWidth;

		var wrapperHeight = headingWrapper.clientHeight;
		var wrapperWidth = headingWrapper.clientWidth;
		
		headingWrapper.style.top = (headingHeight/2 - wrapperHeight/2) -6 + "px";
		headingWrapper.style.left = (headingWidth/2 - wrapperWidth/2) -6 + "px";

		blurBgElement.style.top = -1*(headingHeight/2 - wrapperHeight/2 -6) + "px";
		blurBgElement.style.left = -1*(headingWidth/2 - wrapperWidth/2 -6) + "px";
 	
		blurBgElement.style.height = headingHeight + "px";
		blurBgElement.style.width = headingWidth + "px";

	} 
});
		
