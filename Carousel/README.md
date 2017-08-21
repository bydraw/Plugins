# View it
https://bydraw.github.io/carousel.html

Version: 0.1 beta
Author: Bydraw    
Demo:
    1.Import the css and js. 
      <link rel="stylesheet" href="carousel.css">
      <script src="carousel.js"></script>
    2.Define a container in HTML.
      <div id="ele_id"></div>
    3.New a carousel in javascript.
         new BDCarousel({
            id: 'ele_id',               //Element's id. Required
            num:5,                      //Numbers of pics. Default 5
            imgSrcs:["url1","url2"...]  //Srcs of pics. Default pure colors          
            width: 760,                 //Carousel's width. Default 760px
            height: 240,                //Carousel's height. Default 240px
            autoPlay: true,             //Does the carousel switchs automatically? Default true
            interVal: 2000,             //The interval of switching. Default 2000s
            callback: function () {}    //Callback function. Default none
        })
 Updated at: 2017.8.18
