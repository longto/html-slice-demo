//count tabs
$(".controls li").each(function (index) {
    var tabid = $(this).index() + 1
    $(this).attr('id', 'tab' + tabid);

    $('.controls li:first-child').addClass('active');

    //apply click to match IDs
    $('.controls #tab' + tabid).click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.tabs #tab' + tabid).siblings().hide();
        $('.tabs #tab' + tabid).show();
    });
});

//count panes
$(".tabs .pane").each(function (index) {
    var paneid = $(this).index() + 1
    $(this).attr('id', 'tab' + paneid);
});

$('#tab1').show();