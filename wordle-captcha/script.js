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
    // console.log(numberOfTries);
    var divTries = $('<div id=\"divCaptchaIteration' + numberOfTries + '\">')
    var box = $('<input type=\"text\" class=\"letterInput\" maxlength=\"1\"></input>');

    $('#divCaptchaTries').append(divTries);
    for (var i = 0; i < captchaLenght; i++) {
        $('#divCaptchaIteration'+numberOfTries).append(box.clone());
    }
    $('#divCaptchaTries').append($('</div>'));
};

let captchaInit = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i <= captchaLenght-1; i++) {
        captcha[i] = (chars[Math.floor(Math.random() * chars.length)])
    }
    console.log(captcha);
    return captcha
};

$('#startCaptcha').click(function() {
    captchaTries();
    captcha = captchaInit();
    $('#captchaString').text("Solve the puzzle below to prove you are not a robot");
});


// Main Function
let captchaCheck = (e) => {
    const key = e.key;

    if (key === "Enter") {
        // CHECKING CORRECTNESS
        let ans = [];
        $('#divCaptchaIteration' + numberOfTries + ' input').each(function (index, value) {
            ans.push($(this).val());
        });
        
        // console.log(ans);
        if (ans.includes('')) {
            // alert("Please Fill Form")
            return
        };

        $.each(ans, function(index,value) {
            if (value == captcha[index]) {
                $('#divCaptchaIteration' + numberOfTries + ' input:eq(' + index + ')').css('background-color','#39FF14');
            } else if (captcha.includes(value)) {
                $('#divCaptchaIteration' + numberOfTries + ' input:eq(' + index + ')').css('background-color','yellow');
            }
        });

        if(JSON.stringify(ans.slice(-6)) === JSON.stringify(captcha)) {
            console.log("Correct")
            $('#captchaResults').text("You have proved your human nature");    
        } else {
            $('#divCaptchaIteration' + numberOfTries + ' input').prop('disabled',true);
            if (numberOfTries < 5) {
            numberOfTries = numberOfTries + 1
            captchaTries();
            $('#divCaptchaIteration' + numberOfTries + " input:first").focus();
            } else {
                console.log("You Failed")
                $('#captchaResults').text("Loser robot, your captcha is "+captcha);

            }
        }
        // COLORING CORRECTNESS
        // CREATING NEW ROW
    }
};

$('#divCaptchaTries').on('keypress','input',captchaCheck);