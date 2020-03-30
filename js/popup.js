$(function() {
    var alertFb = false;
    var alertIns = false;
    var time, time_unit;
    chrome.storage.local.get('trackr_settings', function (data) {
        time = data.trackr_settings.time;
        time_unit = data.trackr_settings.time_unit;

    });

    chrome.storage.local.get('trackr', function(data) {
        if ($.isEmptyObject(data)) {
            var $container = $('.container');
            $container.empty();
            $container.append('<div class="message"><h1>No Time!</h1></div>');
            return;
        }

        $.each(data.trackr, function(i, v) {
            if (v.title === 'www.facebook.com') {
                var timerFb = document.getElementById('timer-facebook');
                timerFb.innerHTML = getHours(v.time)+" : "+getMinutes(v.time)+" : "+getSeconds(v.time);
                if(alertFb === false && v.time >= trans(time, time_unit)) {
                    alert("You have been using facebook for more than " + time + time_unit + " today!");
                    alertFb = true;
                }

            }
            if (v.title === 'www.instagram.com') {
                var timerIns = document.getElementById('timer-ins');
                timerIns.innerHTML = getHours(v.time)+" : "+getMinutes(v.time)+" : "+getSeconds(v.time);
                if(alertIns === false && v.time >= trans(time, time_unit)) {
                    alert("You have been using instagram for more than " + time + time_unit + " today!");
                    alertIns = true;
                }
            }
        });


    });


});






