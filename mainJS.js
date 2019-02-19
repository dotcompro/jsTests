$(document).ready(function(){

		//  One scroll page
			var winWidth = $(window).width();
			var winHeight = $(window).height();
			$('.spam').text('Width: ' + winWidth + ', Height: ' + winHeight);
			$('.pages').css({
				'height': winHeight,
		 		'width': winWidth,
			});


			function returnPageToTop() {
		 	$(document).scrollTop(0);
		 }

		 function adjustScreenSize(winWidth, winHeight) {
		 	$('.pages').css({
		 		'height': winHeight,
		 		'width': winWidth
		 	});
		 }


		 $(window).resize(function(){
		 	var winWidth = $(window).width();
			var winHeight = $(window).height();
		 	$('.spam').text(winWidth + ', ' +winHeight);
		 	
		 	adjustScreenSize(winWidth,winHeight);
		 	getactiveMenuLength();
		 });

		// further readings about used plugin and functions read here https://github.com/jquery/jquery-mousewheel
		$('html').css('overflow', 'hidden');
		var viewportHeight = $(window).height();

		$(window).on('resize', function() {
	    	viewportHeight = $(window).height();
	    });

		$('.slides').on('mousewheel', function(event, delta, deltaX, deltaY) {

			//delta Y yra -1 kada skrolina ZEMYN ir 0 kada skrolina AUKSTYN
			//scroll down
			if (deltaY < 0)
			{
				// window.scrollBy(0, viewportHeight);
				scrollDown();
			}
			//scroll up
		    else
		    {
		    		// window.scrollBy(0, -viewportHeight);
		    	scrollUp();    	
		    }            
		});

	    $(document).on('keypress', function(){
			return false;
		});


	    // Scroll on arrow up/down keys
	    $(document).on('keydown', function(event){
	        // arrow down key
	        if (event.which == 40)
	            window.scrollBy(0, viewportHeight);
	        // arrow up key
	        if (event.which == 38)
	            window.scrollBy(0, -viewportHeight);
	    });


	function scrollUp(event) {
		setTimeout(function(){
			$(this).slideUp(800);
	    		window.scrollBy(0, -viewportHeight);
	    	}, 800);
	}


	function scrollDown() {
		setTimeout(function(){
	    		window.scrollBy(0, viewportHeight);
	    	}, 800);
	}


	//  navigation and menu functionality

	  var navContainer = $('.navContainer');
	  var Nav = $('nav.active');
	  var menuItem = $('nav ul li');
	  var timing = 0;


	  function hideNavigation() {
	  	setTimeout(function(){
	  		Nav.animate({
	  		top: '-4rem'  			
	  		}, 400);
	  	}, 1500);
	  }

	  function callMenu() {
		$.each(menuItem, function(index, item){
			setTimeout(function(){
				$(item).animate({
					top: 0
				}, 50);
			}, 50 + (index * 50));
		});
	  }
		
		function hideMenu() {
			$.each(menuItem, function(index, item){
				setTimeout(function(){
					$(item).animate({
						top: '-4rem'
					}, 100);
				}, 50 + (index * 50));
			});
		}

	  Nav.mouseenter(function() {
	  	$(this).css('top', '0rem');
	  });

	  navContainer.mouseenter(function(){
	  		// Nav.stop(true, false).animate({
	  			Nav.stop().animate({
	  			top: 0
	  		}, 400, function(){
	  			setTimeout(function(){
	  				callMenu();
	  			}, 50);
	  		});
	  }).mouseleave(function(){
			hideMenu();
			setTimeout(function(){
				Nav.stop().animate({
	  				top: '-4rem'
	  			}, 400);
			}, 300);
	});

	//  end of navigation and menu functionality

	// bubble following mouse 

		var bb = $('.bubble');
		var animationFunk;

		
		var xmouse, ymouse;

		$('#page-1').on('mousemove', function(e){
			xmouse = e.clientX || e.pageX;
			ymouse = e.clientY || e.pageY;
		});

		var x = void 0,
			y = void 0,
			dx = void 0,
			dy = void 0,
			tx = void 0,
			ty = void 0,
			key = -1;


		 function followMouse() {

			if(!x || !y) {
				x = xmouse;
				y = ymouse;
			} else {
				dx = (xmouse - x) * 0.05;
				dy = (ymouse - y) * 0.05;

				if(Math.abs(dx) + Math.abs(dy) < 0.1) {
					x = xmouse;
					y = ymouse;
				} else {
					x += dx;
					y += dy;
				}
			}
			key = requestAnimationFrame(followMouse);
				bb.css({
					top: y + "px",
					left: x + "px"
				})

		};
		  followMouse();


		  hideNavigation();
		  returnPageToTop();

	
	//page 2 navigation

	//set undescore line length to active menu length
		
	var activeWidth = $('li.active2').width();
	var undescoreLine = $('.line');
	var navListArray = $('.newNav ul li'); // list array
	var prevIndex;
		undescoreLine.css({width: activeWidth + 'px'});

	
	function getactiveMenuLength() {
		var len = $('.active2').width();
		undescoreLine.css('width', len);
	}


	$('.newNav ul li').on('click', function(event) {
		event.preventDefault();

		var thisIndex = navListArray.index(this); 	// returns clicked menu indexa
			thisIndex++; 							//  counting purposes				
		var position = $(this).position(); 			// returns clicked menu position px from right.
		var wd;

		// returns previous index which has active2 class

		$.each(navListArray, function(index, value){
			if($(navListArray[index]).hasClass('active2')) {
				prevIndex = index;
				prevIndex++;
			}
		});

		if($(this).hasClass('active2')) {
			return false;
		} else {
			$('.newNav ul li').removeClass('active2');
			$(this).addClass('active2');
		}

		if(thisIndex>prevIndex) {
			var indexDiff = thisIndex - prevIndex;			
			wd = activeWidth + (indexDiff * activeWidth);
			undescoreLine.animate({
				width: wd + 'px'
			}, 300, function(){
				undescoreLine.animate({
					width: activeWidth + 'px',
					left: position.left + 'px'
				}, 400);
			});
		} else if ( thisIndex < prevIndex) {
			indexDiff = prevIndex - thisIndex;
			wd = activeWidth + (indexDiff * activeWidth);
			undescoreLine.animate({
				left: position.left + 'px',
				width: wd + 'px'
			},300, function() {
				undescoreLine.animate({
					width: activeWidth + 'px'					
				}, 400);
			});

		} else {
			return false;
		}


		
	});


//-------------------------------------------------------------------------------------------------
// fading-in letter text	


  var demo = $('.demo');
  var btn = $('#startBtn');
  var txt = $('#nano2').text();
  var txtArr = txt.split('');
  var arrLength = txtArr.length;
  var randomNr;
  var timing;
  
  btn.on('click', function() {
  	replaceItems();
  	startAnimation();
  });
  

	function getRandomNumber(arrLength) {
  		var numbersArray = [] ;
		while(numbersArray.length < 343) {  		
			randomNr = Math.floor(Math.random()* 343);
			if (numbersArray.indexOf(randomNr) === -1) numbersArray.push(randomNr);
		}
			return  numbersArray;
	}

  
   function getTiming() {
      timing = Math.ceil(Math.random() * 10) * Math.floor(Math.random() * Math.floor(100));
      // Math.floor(100) is to change in order to change time length of function
      return timing;
    }
  
  
  function startAnimation() {
    $('#nano2').hide(500);
    changeFontSize(getRandomNumber(arrLength));
  }

  
  function replaceItems(i) {
  	$(txtArr).each(function(i, v) {
    	demo.append('<p>' + v);
    });
  }  

  function mission(i,j,k, all_p_elem, numbersArray) {
  	$(all_p_elem[numbersArray[i]]).animate({
			opacity: 1,
			fontSize: '20px'
		}, getTiming(), function() {
			i++;
				while (i<j) {
					mission(i,j,k, all_p_elem, numbersArray);
					break;
				}
		});
  }

   function mission2(i,j,k, all_p_elem, numbersArray) {
  	$(all_p_elem[numbersArray[j]]).animate({
    		opacity: 1,
    		fontSize: '20px'
    	}, getTiming(), function() {
    		j++;
    		while (j<k) {
    			mission2(i,j,k, all_p_elem, numbersArray);
    			break;
			}
    	});
  }

   function mission3(i,j,k, all_p_elem, numbersArray) {
  	$(all_p_elem[numbersArray[k]]).animate({
    		opacity: 1,
    		fontSize: '20px'
    	}, getTiming(), function() {
    		k++;
    		while (k<=all_p_elem.length) {
    			mission3(i,j,k, all_p_elem, numbersArray);
    			break;
    		}
    	});
  }

  function changeFontSize(numbersArray) {

    var all_p_elem = $('.demo').children(); //new generated text with opacity: 0;
    	var i = 0;
    	var j = Math.floor(all_p_elem.length/3);
    	var k = Math.floor((all_p_elem.length/3)*2);

    	$(all_p_elem[numbersArray[i]]).animate({
    		opacity: 1,
    		fontSize: '20px'
    	}, getTiming(), function() {
    		i++;
    		j++;
    		k++;
    			mission(i,j,k, all_p_elem, numbersArray);
    			mission2(i,j,k, all_p_elem, numbersArray);
    			mission3(i,j,k, all_p_elem, numbersArray);
    	
    	});
         
         
  } // end of changeFontSize function

// --------------------------------------------------------------------------------------
		


// --------------------------------------------------------------------------------------

							// page 3 gallery javascript



	var exitBtn = $('.exit');
	var slideLeftArrow = $('#arrowLeft');
	var slideRightArrow = $('#arrowRight');
	var slideshowWrapper = $('.slideShowWrapper');
	var activeImage = $('.activeSlideshowImage');
	var galleryImages = $('.galleryMainScreen');
	var galleryListContainer = $('.gallery-wrapper');
	var galleryList = document.querySelectorAll('.galleryMainScreen > li'); //javascript
	var clickedImageIndex; 


	$(galleryList).on('click',function() {
		clickedImageIndex = $(this).index();
		var newUL = document.createElement('ul');
		newUL.setAttribute('class', 'slideshowMainScreen');

		var newULposition = $('#arrowLeft');
		newULposition.after(newUL);
		
		// 301, 302 are number id's of images
		var array = [];
		var i = 301;
		for(i = 301; i < 315; i++) {
			array.push(i);
		}

		array.forEach(function(element) {
			var newIL = document.createElement('li');
			var newIMG = document.createElement('img');
			//element == image name: 301, 302, 303...
			var src = 'gallery_img/' + element + '.jpeg';
			var alt = 'gallery_image_' + element;
			create_img(newIMG, src, alt);
			newIL.append(newIMG);
			newUL.append(newIL);
		});

		var slideshowGalleryList = document.querySelectorAll('.slideshowMainScreen > li');
			$(slideshowGalleryList[clickedImageIndex]).addClass('activeSlideshowImage');
	});
		//launches gallery lightbox
	$(galleryList).on('click', function() {
		slideshowWrapper.fadeIn(600).css('display', 'flex');
	});
	
	$('.exit').on('click', function() {
		slideshowWrapper.fadeOut(1000);
		$('.slideshowMainScreen').remove();
	});

	function create_img(img, src, alt) {

		img.src = src;
		if (alt !== null) img.alt = alt;
		return img;
	}


	var arrows = $('.arrows');
	var count = 0;
	$(arrows).on('click', function() {
		if($(this).is('#arrowLeft')) {
			count = -1;
		} else if($(this).is('#arrowRight')) {
			count = 1;
		}
		
		slideImage(count);
	});

	function slideImage(count)  {

		var slideImageIndex;
		var thisSlide = document.querySelectorAll('.slideshowMainScreen > li');
		var xxx = $('li.activeSlideshowImage');

		$(thisSlide).each(function(index, element) {
			if($(element).hasClass('activeSlideshowImage')) {
				slideImageIndex = index;
			return slideImageIndex;
				
			}
		})

		if (count < 0) {
			// xxx = $('li.activeSlideshowImage');
			slideImageIndex -= 1;
			slideInLeftImage(slideImageIndex, xxx, thisSlide); // deliveres reduced index left next

		} else if ( count > 0) {
			slideImageIndex += 1;
			slideInRightImage(slideImageIndex, xxx, thisSlide); // delivers enlarged right next
		}
	}

	function slideInLeftImage(slideImageIndex, xxx, thisSlide) {
		if(slideImageIndex == -1) {
			slideImageIndex = 13;
		}

		$(xxx).animate({
			opacity: 0
		}, 500, 'swing', function(){
			$(xxx).removeClass('activeSlideshowImage');
		});

		$(thisSlide[slideImageIndex]).animate({
			opacity: 1
		}, 500, 'swing', function() {
			$(this).addClass('activeSlideshowImage');
		})

	}

	function slideInRightImage(slideImageIndex, xxx, thisSlide) {
		if(slideImageIndex == 14) {
			slideImageIndex = 0;
		}
		$(xxx).animate({
			opacity: 0
		}, 700, 'swing', function() {
			$(xxx).removeClass('activeSlideshowImage');

		})

		$(thisSlide[slideImageIndex]).animate({
			opacity: 1
		}, 500, 'swing', function() {
			$(this).addClass('activeSlideshowImage');
		})
	
	}

	// --------------------------------------------------------------------------------------
									// page 4 scroll effect





});