
$(".editable").on('input', function() {
	var scroll_height = $(".editable").get(0).scrollHeight;

	$(".editable").css('height', scroll_height + 'px');
});

