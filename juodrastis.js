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
      sleep(getTiming_dee());
      paint(shuffledLetters[i]);
    }
  };

  function paint(letter)
  {
    const element = document.querySelector('#nano');
    var spanElement = '<p style="color: red; display: inline; opacity: 1;">'+ letter +'</p>';

    console.log('shuffledLetters: ', shuffledLetters + ' and: ', letter);
    //uzduotis: replace pritaikyti NE html elemento raidei, o tik teksto raidei
    //tips: keisti elementa ne pagal tai kur raide, o pagal position number

    element.append('<p>' + letter);
    console.log(spanElement);
    

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


  // kodas kuris yra geresnis. is youtube tutorials nurasytas
    // sitas kodas yra menu gyvateles funkcija

      //    var nav = $('nav');
      // var line = $('<div />').addClass('line');

      // line.appendTo(nav);

      // var active = nav.find('.active');
      // var pos = 0;
      // var wid = 0;

      // if(active.length) {
      //   pos = active.position().left;
      //   wid = active.width();
      //   line.css({
      //     left: pos,
      //     width: wid
      //   });
      // }

      // nav.find('ul li a').click(function(e) {
      //   e.preventDefault();
      //   if(!$(this).parent().hasClass('active') && !nav.hasClass('animate')) {
          
      //     nav.addClass('animate');

      //     var _this = $(this);

      //     nav.find('ul li').removeClass('active');

      //     var position = _this.parent().position();
      //     var width = _this.parent().width();

      //     if(position.left >= pos) {
      //       line.animate({
      //         width: ((position.left - pos) + width)
      //       }, 300, function() {
      //         line.animate({
      //           width: width,
      //           left: position.left
      //         }, 150, function() {
      //           nav.removeClass('animate');
      //         });
      //         _this.parent().addClass('active');
      //       });
      //     } else {
      //       line.animate({
      //         left: position.left,
      //         width: ((pos - position.left) + wid)
      //       }, 300, function() {
      //         line.animate({
      //           width: width
      //         }, 150, function() {
      //           nav.removeClass('animate');
      //         });
      //         _this.parent().addClass('active');
      //       });
      //     }

      //     pos = position.left;
      //     wid = width;
      //   }
      // });