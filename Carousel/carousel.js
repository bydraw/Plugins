/**
 * Version: 0.1 beta
 * Author: Bydraw    
 * Demo:
    * 1.Import the css and js. 
        <link rel="stylesheet" href="carousel.css">
        <script src="carousel.js"></script>
    * 2.Define a container in HTML.
        <div id="ele_id"></div>
    * 3.New a carousel in javascript.
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
 * Updated at: 2017.8.18
 */

function BDCarousel(args) {
    //Init 
    var this_Carousel = document.getElementById(args.id);
    var c_width = args.width ? args.width : 760;
    var c_height = args.height ? args.height : 240;
    var pic_num = args.num ? args.num : 5;
    var imgSrcs = args.imgSrcs ? args.imgSrcs : undefined;
    var swap_interval = args.interVal ? args.interVal : 2000;
    var carouselHtmlStr = '<div id="crs_showbox"><div id="crs_pics" style="left:0px"><div class="crs_pic" id="c"></div><div class="crs_pic"></div><div class="crs_pic"></div><div class="crs_pic"></div><div class="crs_pic"></div></div><div id="crs_swapButtons"><div class="crs_on"></div><div></div><div></div><div></div><div></div></div><a href="javascript:; " id="crs_prev" class="crs_arrow">&lt;</a><a href="javascript:; " id="crs_next" class="crs_arrow">&gt;</a></div>';
    this_Carousel.innerHTML = carouselHtmlStr;
    var showbox = this_Carousel.querySelector('#crs_showbox');
    var pics = this_Carousel.querySelector('#crs_pics');
    var pic_item = this_Carousel.querySelectorAll('.crs_pic');
    var next = this_Carousel.querySelector("#crs_next");
    var prev = this_Carousel.querySelector("#crs_prev")
    var swapButtons = this_Carousel.querySelectorAll("#crs_swapButtons div");

    //Ajust the styles
    showbox.style.width = c_width + "px";
    showbox.style.height = c_height + "px";
    this_Carousel.querySelector("#crs_swapButtons").style.left = (c_width - pic_num * 14) / 2 + "px";
    for (var i = 0; i < pic_item.length; i++) {
        pic_item[i].style.width = c_width + "px";
        pic_item[i].style.height = c_height + "px";
    }
    for (i = 0; i < swapButtons.length; i++) {
        if (i >= pic_num) {
            swapButtons[i].style.display = "none";
        }
        if (imgSrcs && imgSrcs[i]) {
            console.log("url('" + imgSrcs[i] + "')")
            pic_item[i].style.background = "url('" + imgSrcs[i] + "')";
        }
    }

    //Events
    function swap(x) {
        var picsleft = parseInt(pics.style.left) + x;
        pics.style.left = picsleft + 'px';
        if (picsleft == -c_width * pic_num) {
            pics.style.left = 0 + 'px';
        }
        if (picsleft == c_width) {
            pics.style.left = -c_width * 2 + 'px';
        }
    }

    next.onclick = function (e) {
        swap(-c_width);
        showButton();
    }

    prev.onclick = function () {
        swap(c_width);
        showButton();
    }

    function play() {
        timer = setInterval(function () {
            next.onclick();
        }, swap_interval);
    }

    function stop() {
        clearInterval(timer);
    }
    showbox.onmouseover = stop;
    showbox.onmouseout = play;
    play();

    function showButton() {
        var leftCount = ((parseInt(pics.style.left)) / (-c_width));
        for (var i = 0; i < swapButtons.length; i++) {
            swapButtons[i].className = '';
        }
        swapButtons[leftCount].className = 'crs_on';
    }

    for (var i = 0; i < swapButtons.length; i++) {
        swapButtons[i].onclick = btnChange.bind(null, i);
    }

    function btnChange(index) {
        if (swapButtons[index].style.className == 'on') {
            return;
        }
        for (var i = 0; i < swapButtons.length; i++) {
            swapButtons[i].className = '';
        }
        swapButtons[index].className = 'crs_on';
        pics.style.left = -(c_width * index) + "px";
    }
    if (args.callback) args.callback();
}