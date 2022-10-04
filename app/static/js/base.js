function isMobile(){
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var desktop = 1024;

    return width >= desktop ? false : true;
}

function scrollToFixed(selector, top){

    var padrao = 100;
    if(isMobile()){
        padrao = 70;
    }

    diff = typeof top !== 'undefined' ? top : padrao;
    $('html,body').animate({ scrollTop : $(selector).offset().top-diff}, 0);
}

function scrollTo(selector){
    scrollToElement($(selector));
}

function scrollToElement(element){
    var diff = 220;
    if(isMobile()){
        diff = 70;
    }
    $('html,body').animate({ scrollTop : element.offset().top-diff}, 1000);
}

function getUrlParameters()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var phoneMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
optionsPhoneMask = {
    onKeyPress: function(val, e, field, options) {
        field.mask(phoneMaskBehavior.apply({}, arguments), options);
    }
};

function openMenuMobile(){
    $('#icon-menu').toggleClass('active');
    $('#main-menu').toggleClass('active');
    $('#background-overlay').toggle();
    $('#faixa-menu-mobile').toggleClass('active');    
}

$(function(){
    // FAQ
    $(function(){
        $('.faq-list .pergunta').on('click', function(e){
            e.preventDefault();
            $(this).closest(".item").toggleClass("active");
            $(this).next('.resposta').slideToggle();
        });
    });



    $('.no-link').on('click', function(e){
        e.preventDefault();
    });

    $('.phonemask').mask(phoneMaskBehavior, optionsPhoneMask);
    $('.cpfmask').unmask().mask(('999.999.999-99'), {reverse: true});
    $('.datemask').mask('00/00/0000');
    // $('.cepmask').mask('00000-000');

    $('body').append('<div id="background-overlay" class="left-arrow close-submenu" style="display:none;"></div>');
    $('#icon-menu').on('click', function(){
        $('#icon-menu').toggleClass('active');
        $('#main-menu').toggleClass('active');
        $('#background-overlay').toggle();
        $('#faixa-menu-mobile').toggleClass('active');
    });
    $('#background-overlay').on('click', function(){
        $('#icon-menu').removeClass('active');
        $('#main-menu').removeClass('active');
        $('#faixa-menu-mobile').removeClass('active');
        $('#background-overlay').hide();
        $('.handle-closer-overlay').removeClass('active');
    });

    $('.close-submenu').on('click', function(e){
        e.stopPropagation();
        $(this).closest('.submenu').removeClass('active');
        // $('#main-menu .has-submenu .submenu').removeClass('active');
    });

    $('.close-all-submenu').on('click', function(e){
        e.stopPropagation();
        $('#main-menu .has-submenu .submenu').removeClass('active');
    });

    $('#main-menu .submenu .item').on('click', function(e){
        e.stopPropagation();
    });

    $('#main-menu .has-submenu').on('click', function(e){
        if (isMobile()) {
            e.stopPropagation();
            e.preventDefault();
            $(this).children('.submenu').addClass('active');
        }
    });
    $(window).scroll(function() {
        if (!isMobile()) {
            var scroll = $(window).scrollTop();
            var limit = $('body').hasClass('internas') ? 150 : 100;
            if (scroll >= limit) {
                $("#main-header").addClass("active");
            } else {
                $("#main-header").removeClass("active");
            }
        }
    });

    $('.open-busca').on('click', function(e){
        e.preventDefault();
        $('#box-busca-desktop').slideToggle('fast', function(){
            if (!$(this).is(':hidden')) {
                $('#box-busca-desktop .input-busca').focus();
            }
        });
    });

    $('.scroll-to').on("click", function(e){
        var selector = $(this).data("scroll");
        if ($("body").hasClass("cont")) {
            e.preventDefault();
            scrollTo(selector);
        }

        if (isMobile()){
            closeMenu();
        }
        
        
    });
});


