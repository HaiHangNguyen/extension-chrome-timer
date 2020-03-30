function getSeconds(t){
    t=""+(parseInt(t)%60);
    if(t.length==1) t="0"+t;
    return t;
}

function getMinutes(t){
    t=""+(parseInt(t/60)%60);
    if(t.length==1) t="0"+t;
    return t;
}

function getHours(t){
    t=""+parseInt(t/3600);
    if(t.length==1) t="0"+t;
    return t;
}

function trans(t, unit) {
    switch (unit) {
        case 'h':
            return t*3600;
        case 'm':
            return t*60;
        case 's':
            return t;
    }
}