requirejs(['swiper','domReady'],function (swiper,domReady){
	var swiperElement; 

	domReady(function() {
		swiperElement = new swiper('.swiper-container', {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: '#testimonial-next-button',
				prevEl: '#testimonial-prev-button',
			},
			autoplay: {
				delay: 5000,
			},
		});
		setAdmissionsSeparatorsClass();
		setAcademicsParagraphsHeight();
	});
	window.addEventListener('orientationchange',function(){
		setAdmissionsSeparatorsClass();
		swiperElement.update();
		setAcademicsParagraphsHeight();
		setTestimonialFontSize();
	});

	window.addEventListener('resize',function(event){
		setAdmissionsSeparatorsClass();
		swiperElement.update();
		setAcademicsParagraphsHeight();
	});

	function setAdmissionsSeparatorsClass(){
		var topSeparator = document.getElementById("admission-top-separator");
		var rightSeparator = document.getElementById("admission-right-separator");
		var leftSeparator = document.getElementById("admission-left-separator");
		var bottomSeparator = document.getElementById("admission-bottom-separator");
		if(window.innerWidth<568){
			topSeparator.classList.add('vertical-hr');
			bottomSeparator.classList.add('vertical-hr');
			rightSeparator.classList.remove('vertical-hr');
			leftSeparator.classList.remove('vertical-hr');
		}else{
			topSeparator.classList.remove('vertical-hr');
			bottomSeparator.classList.remove('vertical-hr');
			rightSeparator.classList.add('vertical-hr');
			leftSeparator.classList.add('vertical-hr');
		}
	} 
	function setAcademicsParagraphsHeight(){
		var paragraphs = document.querySelectorAll('.academics-sub-section p');
		if(window.innerWidth>=1024){
			var heights = [];
			for (var i = 0; i < paragraphs.length; i++) {
				heights.push(paragraphs[i].offsetHeight);
			}
			const allEqual = arr => arr.every( v => v === arr[0] );
			if(!allEqual(heights)){
				var maxHeight = Math.max(...heights);
				for (var i = 0; i < paragraphs.length; i++) {
					paragraphs[i].style.marginBottom = maxHeight - heights[i] + "px" ;
				}
			}
		}else if(window.innerWidth >=568 ){
			var buttonHeight = document.querySelector('.academics-sub-section .red-button').offsetHeight;
			var headingHeight = document.querySelector('.academics-sub-section h3').offsetHeight;
			var imageHeight = document.querySelector('.academics-sub-section img').offsetHeight;

			for (var i = 0; i < paragraphs.length; i++) {
				paragraphs[i].style.height = imageHeight - headingHeight - buttonHeight + "px" ;
			}

		}else{
			for (var i = 0; i < paragraphs.length; i++) {
				paragraphs[i].style.height = 100 + "%" ;
			}
		}
	}
	function setTestimonialFontSize(){
		if(window.innerWidth<window.innerHeight && window.innerWidth<=567){
			var quotes = document.querySelectorAll('.testimonial-quote');
			for (var i=0; i<quotes.length; i++){
				quotes[i].style.fontSize = "0.5em";
			}
		}

	}
	
});