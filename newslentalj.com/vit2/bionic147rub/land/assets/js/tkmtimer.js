function initTimer(a) {
    var b = 0,
        c = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = Math.floor(a / 3600),
        i = a % 3600,
        j = Math.floor(i / 60),
        k = i % 60,
        l = k;
    b = Math.floor(h / 10), c = h % 10, d = Math.floor(j / 10), e = j % 10, f = Math.floor(l / 10), g = l % 10, setTime(b, c, d, e, f, g, fl), changetime(b, c, d, e, f, g)
}

function changetime(a, b, c, d, e, f) {
    if (fl = 0, f > 0) f--, fl = 1;
    else if (e > 0) f = 9, e--, fl = 2;
    else if (d > 0) f = 9, e = 5, d--, fl = 3;
    else if (c > 0) f = 9, e = 5, d = 9, c--, fl = 4;
    else if (b > 0) f = 9, e = 5, d = 9, c = 5, b--, fl = 5;
    else {
        if (!(a > 0)) return !1;
        f = 9, e = 5, d = 9, c = 5, b = 9, a--, fl = 6
    }
    setTimeout(function() {
        setTime(a, b, c, d, e, f, fl), changetime(a, b, c, d, e, f)
    }, 1e3)
}

function setTime(a, b, c, d, e, f, g) {
    1 == g && ($(".second.ones").text(f), $(".second.ones").toggleClass("flip"), setTimeout(function() {
        $(".second.ones").toggleClass("flip")
    }, 100)), 2 == g && ($(".second.ones").text(f), $(".second.tens").text(e), $(".second.ones, .second.tens").toggleClass("flip"), setTimeout(function() {
        $(".second.ones, .second.tens").toggleClass("flip")
    }, 100)), 3 == g && ($(".second.ones").text(f), $(".second.tens").text(e), $(".minute.ones").text(d), $(".second.ones, .second.tens, .minute.ones").toggleClass("flip"), setTimeout(function() {
        $(".second.ones, .second.tens, .minute.ones").toggleClass("flip")
    }, 100)), 4 == g && ($(".second.ones").text(f), $(".second.tens").text(e), $(".minute.ones").text(d), $(".minute.tens").text(c), $(".second.ones, .second.tens, .minute.ones, .minute.tens").toggleClass("flip"), setTimeout(function() {
        $(".second.ones, .second.tens, .minute.ones, .minute.tens").toggleClass("flip")
    }, 100)), 5 == g && ($(".second.ones").text(f), $(".second.tens").text(e), $(".minute.ones").text(d), $(".minute.tens").text(c), $(".hour.ones").text(b), $(".second.ones, .second.tens, .minute.ones, .minute.tens, .hour.ones").toggleClass("flip"), setTimeout(function() {
        $(".second.ones, .second.tens, .minute.ones, .minute.tens, .hour.ones").toggleClass("flip")
    }, 100)), 6 == g && ($(".second.ones").text(f), $(".second.tens").text(e), $(".minute.ones").text(d), $(".minute.tens").text(c), $(".hour.ones").text(b), $(".hour.tens").text(a), $(".second.ones, .second.tens, .minute.ones, .minute.tens, .hour.ones, .hour.tens").toggleClass("flip"), setTimeout(function() {
        $(".second.ones, .second.tens, .minute.ones, .minute.tens, .hour.ones, .hour.tens").toggleClass("flip")
    }, 100)), 0 == g && ($(".second.ones").text(f), $(".second.tens").text(e), $(".minute.ones").text(d), $(".minute.tens").text(c), $(".hour.ones").text(b), $(".hour.tens").text(a)), sec = 3600 * (10 * a + b) + 60 * (10 * c + d) + (10 * e + f), localStorage.setItem("___ts", sec)
}
timerstart = 15913, fl = 0, timerclass = ".other-timer", $(document).ready(function() {
    if ($(timerclass).length > 0) {
        $(timerclass).append('<div class="timer-wrapper clearfix"><div class="digit clearfix"><div class="digit-items hours">Часов</div><div class="item hour tens"></div><div class="item hour ones"></div></div><div class="digit clearfix"><div class="digit-items minutes">Минут</div><div class="item minute tens"></div><div class="item minute ones"></div></div><div class="digit clearfix"><div class="digit-items seconds">Секунд</div><div class="item second tens"></div><div class="item second ones"></div></div></div>');
        var a = new Date,
            b = parseInt(a.getDate());
        if (localStorage.getItem("___dn")) {
            var c = parseInt(localStorage.getItem("___dn"));
            b - c == 0 ? timerstart = parseInt(localStorage.getItem("___ts")) : localStorage.setItem("___dn", b)
        } else localStorage.setItem("___dn", b), localStorage.setItem("___ts", timerstart);
        timerstart >= 0 && initTimer(timerstart)
    }
});