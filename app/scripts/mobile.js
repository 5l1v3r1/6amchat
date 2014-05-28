$(function() {
  $('.go-to-slide-1').click(function() {
    $('.slide').addClass('js-hide');
    $('#slide-1').removeClass('js-hide');
  });

  $('.go-to-slide-2').click(function() {
    $('.slide').addClass('js-hide');
    $('#slide-2').removeClass('js-hide');
  });

  $('.go-to-slide-3').click(function() {
    $('.slide').addClass('js-hide');
    $('#slide-3').removeClass('js-hide');
  });

  $('.go-to-slide-4').click(function() {
    $('.slide').addClass('js-hide');
    $('#slide-4').removeClass('js-hide');
  });

  $('#send-reminder').submit(function(e) {
    e.preventDefault();

    var self      = $(this),
        submitBtn = self.find("button[type='submit']");

    submitBtn.text('Sending Reminder...');

    $.ajax({
      url: "/emails/reminder",
      type: "POST",
      cache: false,
      data: self.serialize()
    }).done(function() {
      submitBtn.text('Reminder Sent!')
               .attr('disabled', 'disabled')
               .css('cursor', 'default');
    }).fail(function() {
      submitBtn.text('Hm, there was a problem. Try again.');
    });
  });
});