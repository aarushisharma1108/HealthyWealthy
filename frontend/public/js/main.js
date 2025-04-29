$(document).ready(function(){
  //  This ensures that the script runs only after the webpage (DOM) is fully loaded.
    $('.fa-bars').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });
//When the hamburger menu icon (.fa-bars) is clicked:It toggles the fa-times class on itself (to change the icon to a close (×) symbol).It also toggles the nav-toggle class on the navbar, which likely shows/hides the menu.
    $(window).on('scroll load',function(){
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
//If the user scrolls or reloads the page, it removes:The fa-times class (so the hamburger icon returns to its default look).The nav-toggle class (so the menu closes automatically).
        if($(window).scrollTop()  >  30){
            $('header').addClass('header-active');
        }else{
            $('header').removeClass('header-active');
        }
//If the user scrolls more than 30px, it adds the class header-active to the <header> (likely changing its style for a sticky effect).If the scroll is less than 30px, it removes the header-active class.
    });

    
});