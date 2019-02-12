$(document).ready(function(){
	//sitas siek tiek pataisytas

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
		 });

		// apie naudota plugina ir jo kitas funkcijas gali pasiskaityti cia https://github.com/jquery/jquery-mousewheel
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
				//console.log('deltaY ' + deltaY);
				// window.scrollBy(0, viewportHeight);
				scrollDown();
			}
			//scroll up
		    else
		    {
		    	//console.log('deltaX '+ deltaX);
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
	  			//console.log('praejo 600ms. enter'); 
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
			console.log(xmouse +", " + ymouse);
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
			console.log(dx);

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
			undescoreLine.css({width: activeWidth + 'px'});
		var prevIndex;


	$('.newNav ul li').on('click', function(event) {
		event.preventDefault();

		var thisIndex = navListArray.index(this); 	// grazina paspausto menu indexa
			thisIndex++; 							//  del skaiciavimu tikslu				
		var position = $(this).position(); 			// grazina paspausto menu position px nuo kaires.
		var wd;

		// grazina previous index kuris turi active2 klase

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
      // Math.floor(100) galima keisti 100 verte i 500 ar 1000 keiciant proceso laika
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

    var all_p_elem = $('.demo').children(); //visos raides naujam tekste su opacity: 0;
    console.log(all_p_elem[45]);
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
         
         
  } // baigiasi changeFontSize funkcija

// --------------------------------------------------------------------------------------
		
// fading-in letter text

	// Doviles kodas

  var startButton = $('#startAnimation');
  var oneText = $('.rndText').text();
  var arr = oneText.split('');
  var arrLength = arr.length; // 895
  var randomNumber;
  var timing;

  // var newArray = $('#nano').text().split('');


  function getRandomNumber_dee() {
    randomNumber_dee = Math.floor(Math.random() * Math.floor(895));
    return  randomNumber_dee;
  }

  function getTiming_dee() {
    timing_dee = Math.ceil(Math.random() * 10) * Math.floor(Math.random() * Math.floor(500));
    //console.log(timing);
    return timing_dee;
  }
    var Letters = [];
    var shuffledLetters = []; 

  function startAnimation_dee() {
    startButton.fadeOut(getTiming_dee()); // veikia kai as argument perduodi funcija
    setTimeout(function(){      // nuo cia puikiai veikia iki ---
      startButton.fadeIn(getTiming_dee());
    }, getTiming_dee());
    //-----------------------------------
    // for each character call function animation, get the index of the char 
    
    
    //var TextHtmlElement = $('#nano');
    var Text = document.getElementById('nano').innerHTML;
    console.log(Text);
    var TextWithNoSpaces = Text.replace(/\s/g, '');
    var TextWithNoSpacesLength = TextWithNoSpaces.length;

    createArrayFromText(TextWithNoSpaces);
    shuffle(Letters);
      

    for (var i = 0; i<shuffledLetters.length; i++)
    {
      // sleep(getTiming_dee());
      paint(shuffledLetters[i]);
    }
  }

  function paint(letter)
  {
    const element = document.querySelector('#nano');
    var spanElement = '<p style="color: red; display: inline; opacity: 1;">'+ letter +'</p>';

    //uzduotis: replace pritaikyti NE html elemento raidei, o tik teksto raidei
    //tips: keisti elementa ne pagal tai kur raide, o pagal position number

    element.append(letter);
    

    //element.innerHTML = element.innerHTML.replace(letter, spanElement);
  }


  function sleep(milliseconds) 
  {
      var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds)
          {
              break;
          }
        }
  }


  function createArrayFromText(TextWithNoSpaces)
  {
    for (var i = 0; i < TextWithNoSpaces.length; i++) 
    {
      var letter = TextWithNoSpaces.charAt(i);
      Letters.push(letter);
    }
  }

  function shuffle(array)
  {
    for (let i = array.length - 1; i > 0; i--) 
    {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      shuffledLetters = array;
  }


  startButton.on('click', startAnimation_dee);

// --------------------------------------------------------------------------------------

								//javascript testas

	var yyy = $('ul.galleryMainScreen li');
	// console.log('yyy: ',yyy); // NodeList(14)[li,li,li,li,li,li,li,li,li,li];
		yyy.on('click', function() {  // veikia
		// console.log('clicked yyy be $ zenklo');
	});
	$(yyy).on('click', function() { // veikia
		// console.log('clicked yyy su $ zenklu');
	});
	// $(xxx).click(function() { //is not a function
	// 	console.log('clicked xxx be $ zenklo');
	// })

	// $(xxx).click(function() { // neveikia visai nei click nei on('click'). nei klaidos meta nei console.log
	// 	console.log('clicked xxx su $ zenklu');
	// })
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
		console.log(clickedImageIndex);
		var newUL = document.createElement('ul');
		newUL.setAttribute('class', 'slideshowMainScreen');

		var newULposition = $('#arrowLeft');
		newULposition.after(newUL);
		
		var array = [];
		var i = 301;
		for(i = 301; i < 315; i++) {
			// array.push(newLI);
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
			slideInLeftImage(slideImageIndex, xxx, thisSlide); // perduoda sumazinta index left next

		} else if ( count > 0) {
			slideImageIndex += 1;
			slideInRightImage(slideImageIndex, xxx, thisSlide); // perduoda padidinta right next
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

		// $(xxx).animate({
		// 	opacity: 0
		// }, 500, 'swing', function() {
		// 	console.log('baigta');
		// 	$(this).removeClass('activeSlideshowImage');
		// 	console.log('slideImageIndex: ', slideImageIndex );
		// })
		// $(thisSlide[slideImageIndex]).delay(200).animate({
		// 	opacity: 1
		// }, 500,  'swing',function() {
		// 	$(this).addClass('activeSlideshowImage');
		// });

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
		// console.log('opacity right',$(xxx).css('opacity'));
		// $(xxx).animate({ // front image
		// 	opacity: 0
		// }, 500, 'swing', function() {
		// 	$(this).removeClass('activeSlideshowImage');		
		// });
		// $(thisSlide[slideImageIndex]).animate({ // turi buti next image
		// 	opacity: 1
		// }, 500, 'swing', function() {
		// 	$(this).addClass('activeSlideshowImage');
		// })
	}

	// --------------------------------------------------------------------------------------
									// page 4 scroll effect





});