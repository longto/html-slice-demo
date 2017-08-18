
function renderCarousel(uniqeuId, numDesktopSlides, numTabletSlides, autoplay, dots, arrows) {

    var element = '.' + uniqeuId + ' .carousel-container';
    $(element).slick({
        slidesToShow: numDesktopSlides,
        slidesToScroll: 1,
        autoplay: autoplay,
        autoplaySpeed: 2000,
        dots: dots,
        arrows: arrows,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: numTabletSlides,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}