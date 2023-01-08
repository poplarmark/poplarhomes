$('#owner').click(function() {
    $('#subscriber_type').val('owner');
    $('#content_type').text('New owner content will be delivered to you every week.');

});

$('#renter').click(function() {
    $('#subscriber_type').val('renter');
    $('#content_type').text('New renter content will be delivered to you every week.');
});