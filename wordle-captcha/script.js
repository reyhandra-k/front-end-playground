$('#divCaptchaTries').on('keyup', "input", function(e) {
    if ($(this).val()&& e.key.length == 1) {
        $(this).next().focus();
    }
});

$('#divCaptchaTries').on('keydown',"input", function(e) {
    if ($(this).val() && e.key.length == 1) {
        $(this).val("");
    }
});

let captcha = []
const captchaLenght = 6;
let numberOfTries = 0;

let captchaTries = () => {
    var box = $('<input type=\"text\" class=\"letterInput\" maxlength=\"1\"></input>');
    for (var i = 0; i < captchaLenght; i++) {
        // console.log(i);
        $('#divCaptchaTries').append(box.clone());
    }
    $('#divCaptchaTries').append($('<br>'))
    // console.log("Test")
};

let captchaInit = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i <= captchaLenght-1; i++) {
        captcha[i] = (chars[Math.floor(Math.random() * chars.length)])
    }
    // console.log(captcha);
    return captcha
};

$('#startCaptcha').click(function() {
    captchaTries();
    captcha = captchaInit();
    $('#captchaString').text("Your captcha is "+captcha);
});


// Main Function
let captchaCheck = (e) => {
    const key = e.key;

    if (key === "Enter") {
        // CHECKING CORRECTNESS
        let ans = [];
        $('input.letterInput').each(function (index, value) {
            ans.push($(this).val());
            console.log(index);
            if ($(this).val() == captcha[index-(6*numberOfTries)]) {
                $(this).css('background-color','green');
            } else if (captcha.includes($(this).val())) {
                $(this).css('background-color','yellow');
            }
        });
        if(JSON.stringify(ans.slice(-6)) === JSON.stringify(captcha)) {
            console.log("Correct")
        } else {
            captchaTries();
            numberOfTries = numberOfTries + 1
        }
        // ISSUE: ON SECOND TRY INDEX IS >6
        // COLORING CORRECTNESS
        // CREATING NEW ROW
    }
};

$('#divCaptchaTries').on('keypress','input',captchaCheck);