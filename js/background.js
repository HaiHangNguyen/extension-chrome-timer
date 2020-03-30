var interval = null;
var updateTime = 1000;
var currentTabInfo = {};
var userActive = true;

var getURL = function(url) {
    chrome.storage.local.get('trackr', function(data) {
        var index, found;
        var hostname = new URL(url).hostname;

        if ($.isEmptyObject(data)) {

            currentTabInfo.title = hostname;
            currentTabInfo.time = 0;
            var obj = {
                'trackr': [{
                    'title': currentTabInfo.title,
                    'time': currentTabInfo.time,
                    'date': new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()
                }]
            };
            chrome.storage.local.set(obj);
            return;
        }

        $.each(data.trackr, function(i, v) {
            if (v.title === hostname && v.date === (new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear())) {
                index = i;
                found = true;
                return false;
            }
        });

        if (found) {
            var retrieved = data.trackr[index];
            currentTabInfo.title = retrieved.title;
            currentTabInfo.time = retrieved.time;
        } else {
            currentTabInfo.title = hostname;
            currentTabInfo.time = 0;
            currentTabInfo.date = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();

            data.trackr.push({
                'title': currentTabInfo.title,
                'time': currentTabInfo.time,
                'date': currentTabInfo.date
            });
        }
        chrome.storage.local.set(data);
    });
};

var updateURL = function() {
    if (userActive) {
        chrome.storage.local.get('trackr', function(data) {
            var index;
            $.each(data.trackr, function(i, v) {
                if (v.title === currentTabInfo.title) {
                    index = i;
                    return false;
                }
            });
            data.trackr[index].time = data.trackr[index].time + 1;

            chrome.storage.local.set(data);
        });
    }
};

var getCurrentTab = function() {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tabs) {
        var hostname = new URL(tabs[0].url).hostname;
        if(hostname === 'www.facebook.com' || hostname === 'www.instagram.com') {
            getURL(tabs[0].url);
            clearInterval(interval);
            interval = null;
            interval = setInterval(function() {
                updateURL();
            }, updateTime);
        }

    });
};

getCurrentTab();

chrome.tabs.onUpdated.addListener(getCurrentTab);
chrome.tabs.onActivated.addListener(getCurrentTab);
