var chat_langs = {
    "RU": {
        "hello": "Здравствуйте! У вас есть вопрос или вам нужна какая-либо помощь?",
        "hello2": "Напишите, пожалуйста, что вас интересует и я вам обязательно помогу.",
        "order": "Давайте я вам отвечу детально по телефону. Консультация бесплатна и не обязывает вас к покупке. Все консультации конфиденциальны.",
        "order2": "Оставьте, пожалуйста, свои контактные данные и отвечу на все ваши вопросы",
    },
    "VN": {
        "hello": "Xin chào! Bạn có câu hỏi hoặc đang cần sự trợ giúp?",
        "hello2": "Hãy viết điều bạn đang quan tâm đến và tôi nhất định sẽ giúp bạn.",
        "order": "Tôi sẽ trả lời chi tiết cho bạn qua điện thoại. Tư vấn hoàn toàn miễn phí và chúng tôi không ép bạn mua sản phẩm. Tất cả tư vấn đều được bảo mật. ",
        "order2": "Hãy để lại thông tin liên lạc và tôi sẽ trả lời tất cả các câu hỏi của bạn",
    },
}
var lang = window.kma_chat_lang ? window.kma_chat_lang : "RU";

function hideChat() {
    var offset = $("#kma-chat .kma-chat-body").outerHeight();
    $("#kma-chat").css("transform", "translate3d(0," + offset + "px, 0)");
    $("#kma-chat").addClass("chat-hidden");
}

function showChat() {
    if (!$("#kma-chat").hasClass("chat-hidden"))
        return false;
    var offset = $("#kma-chat .kma-chat-body").outerHeight();
    $("#kma-chat").css("transform", "translate3d(0, 0, 0)");
    $("#kma-chat").removeClass("chat-hidden");

    if (!window.firstMessage)
        sendMessage()
}

function sendMessage() {
    var msgs = [{
        msg: chat_langs[lang].hello,
        timeout: 2500
    }, {
        msg: chat_langs[lang].hello2,
        timeout: 6500
    }];
    writeMessage(msgs);
}

function writeMessage(msgs) {
    var pause = 0;
    msgs.forEach(function(item) {
        setTimeout(function() {
            $("#kma-chat .dialog-wrapper p.statusText").show();
            setTimeout(function() {
                var date = new Date();
                var time = date.getHours() + ((date.getMinutes() < 10) ? ":0" : ":") + date.getMinutes();
                var msgBlock = "<div class='clearfix message-container'><div class='message first-message'><p>" + item.msg + "</p></div><div class='message-time'>" + time + "</div></div>";
                $("#kma-chat .dialog-wrapper p.statusText").hide();
                $("#kma-chat .dialog-wrapper .dialog-inner").append(msgBlock);
                $("#kma-chat .dialog-wrapper").animate({
                    scrollTop: $('#kma-chat .dialog-wrapper').prop("scrollHeight")
                }, 100);
            }, item.timeout);
        }, (pause) ? pause : pause);
        pause = pause + item.timeout + 100;
    });
    window.firstMessage = true;
}

function showOrderForm() {
    var msgs = [{
        msg: chat_langs[lang].order,
        timeout: 2500
    }, {
        msg: chat_langs[lang].order2,
        timeout: 3500
    }];
    writeMessage(msgs);
    setTimeout(function() {
        $("#kma-chat .dialog-form").fadeOut("fast", function() {
            $("#kma-chat .send-form").fadeIn("fast")
        });
    }, 6000);

}

$(function() {
    if ($('#kma-chat').is(":visible")) hideChat();
    window.firstMessage = false;
    $(document).on('keypress', '#kma-chat .dialog-form textarea', function(e) {
        if (((e.keyCode === 13) || (e.keyCode === 10)) && e.ctrlKey) {
            $(this).val(function(i, val) {
                return val + "\n";
            });
        } else
        if (e.keyCode === 13 && !e.ctrlKey) {
            formSubmit($(this).parent());
            return false;
        }
    });

    $(document).on("click", "#kma-chat .kma-chat-head .kma-chat-close", function(e) {
        hideChat();
        e.preventDefault();
        e.stopPropagation();
    });


    $(document).on("click", "#kma-chat .kma-chat-head", function(e) {
        e.preventDefault();
        e.stopPropagation();
        showChat();
    });

    setTimeout(showChat, 15000);

    $(document).on('click', '#kma-chat .dialog-form button', function(e) {
        e.preventDefault();
        formSubmit($(this).parent());
        e.stopPropagation();
        return false;
    });

    function formSubmit(form) {
        var msg = $(form).find("textarea").val();
        if (!msg) {
            return false;
        }
        //если нецелевое сообщение, сделать другую ветку и выводить приветствие оператора
        var date = new Date();
        var time = date.getHours() + ((date.getMinutes() < 10) ? ":0" : ":") + date.getMinutes();
        var msgBlock = "<div class='clearfix message-container user-message'><div class='message-time'>" + time + "</div><div class='message second-message'><p>" + msg + "</p></div></div>";
        $("#kma-chat .dialog-wrapper .dialog-inner").append(msgBlock);
        $("#kma-chat .dialog-wrapper").animate({
            scrollTop: $('#kma-chat .dialog-wrapper').prop("scrollHeight")
        }, 100);
        $(form).find("textarea").val("");
        $(form).find("textarea").attr("disabled", "disabled");
        setTimeout(showOrderForm, 3000);
    };

    $(document).on("submit", "#kma-chat .send-form", function(e) {
        //ym_id - id яндекс метрики, ym_goal - действие для яметрики, ga_goal - действие для гугл, ga_goal_cat - категория для гугл
        let ym_id = window.kma_yacounter_id,
            ym_goal = "chatsubmit",
            ga_goal = "ga_chat_submit",
            ga_goal_cat = "";

        if (window.metricDebug === true) {
            console.log(ym_id, ym_goal, ga_goal, ga_goal_cat);
        }
        try {
            if (typeof ym_id !== undefined && typeof ym_goal !== undefined) {
                $.globalEval("yaCounter" + ym_id + ".reachGoal('" + ym_goal + "');")

            }
            if (typeof ga_goal !== undefined) {
                if (typeof gtag === "function") {
                    gtag('event', ga_goal, ga_goal_cat ? {
                        event_category: ga_goal_cat
                    } : {});

                } else {
                    ga('send', ga_goal, ga_goal_cat ? {
                        eventCategory: ga_goal_cat
                    } : {});

                }
            }
        } catch (e) {
            if (window.metricDebug === true) {
                console.log("metric doesnt install", e);
            }
        }

    });

});