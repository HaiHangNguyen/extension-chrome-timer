$(function() {
    var time = $('#time');
    var time_unit = $('#time-unit');
    chrome.storage.local.get('trackr_settings', function(data) {
        data = data.trackr_settings;
        $('#time').val(data.time);
        $("select.select").val(data.time_unit);
    });
    chrome.storage.local.get('trackr', function (data) {
        if ($.isEmptyObject(data)) {
            var $container = $('.container');
            $container.empty();
            $container.append('<div class="message"><h1>No Time!</h1></div>');
            return;
        } else {
            var dataFb = "Facebook: </br>";
            var dataIns = "</br>Instagram: </br>";
            $.each(data.trackr, function (i, v) {
                if (v.title === 'www.facebook.com') {
                    dataFb = dataFb + v.date + ' : ' + getHours(v.time) + 'h' + getMinutes(v.time) + 'm' + getSeconds(v.time) + 's </br>';
                }
                if (v.title === 'www.instagram.com') {
                    dataIns = dataIns + v.date + ' : ' + getHours(v.time) + 'h' + getMinutes(v.time) + 'm' + getSeconds(v.time) + 's </br>';
                }
            });
            var totalTimerFb = document.getElementById('total-timer-facebook');
            totalTimerFb.innerHTML = dataFb;
            var totalTimerIns = document.getElementById('total-timer-instagram');
            totalTimerIns.innerHTML = dataIns;

        }
    });
});

$("#clear-time").on('click', function () {
    chrome.storage.local.remove('trackr');
});

$("#save").on('click', function () {
    var time = $('#time').val();
    var time_unit = $('#time-unit').val();
    var obj = {
        "trackr_settings": {
            "time": time,
            "time_unit": time_unit
        }
    };
    chrome.storage.local.set(obj);
});