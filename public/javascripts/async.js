/**
 * created by changyoung on 17. 10. 10.
 */

function downloadCSV(){
    $.ajax({
        url: '/users/download',
        timeout: 30000,
        type: "GET",
        success : function(msg) {
            window.open('/users/download');
            alert('success');
        },
        error : function(err, textStatus){
            alert('error');
        }
    });
}

function downloadUploadedFiles(filename){
    alert(1);
    $.ajax({
        url: './download/' + filename,
        timeout: 10000,
        type: "GET",
        success: function (msg) {
            windows.open('./downloaded' + filename);
        },
        error: function (err, textStatus) {
            alert('error');
        }
    });
}
$(document).ready(function(){
    $('.contactForm').on('submit', function(e) {
        e.preventDefault();
        var params = $(this).serializeArray();
        var data = {};
        $.each(params, function(i, v){
            data[v.name] = v.value;
        });
        var s_data = JSON.stringify(data);
        alert(s_data);
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: s_data,
            contentType: 'application/json',
            timeout: 10000,
            success: function () {
                $("#sendmessage").show();
            },
            error: function (err, textStatus) {
                $("#errormessage").show();
            }
        });
    });

});

