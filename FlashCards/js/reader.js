function reader(content, wrp, splitter, shuffle) {

    var isPaused = false;
    var partCount = -1;
    var play = false;
    var interval = 10;
    var contentSplit = content.split(splitter);
    if (shuffle) {
        contentSplit = shuffleArray(contentSplit);
    }

    function nextCard() {
        if (partCount < contentSplit.length - 1) {
            partCount++;
        } else {
            play = null;
            $('.operator').html('stopped');
        }
        wrp.html((partCount + 1) + ':' + contentSplit[partCount]);
    }

    Mousetrap.bind('space', function() {

        if (play == null) {
            Mousetrap.trigger('q');
            return;
        }

        play = !play;

        if (play) {
            startTimer();
        } else {
            stopTimer();
        }
    });

    Mousetrap.bind('q', function() {
        play = false;
        stopTimer();

        partCount = 0;
        wrp.html((partCount + 1) + ':' + contentSplit[partCount]);
    });

    Mousetrap.bind('s', function() {

        play = false;
        stopTimer();

        contentSplit = shuffleArray(contentSplit);
        partCount = 0;
        wrp.html((partCount + 1) + ':' + contentSplit[partCount]);
    });

    //タイマー開始関数
    function startTimer() {
    	//inertvalの秒数毎にsyori関数を実行する。その情報をtimer変数へ入れている。
    	timer = setInterval(process, interval);
        $('.operator').html('playing');
    }

    //タイマー停止関数
    function stopTimer() {
    	//timer変数を止める
    	clearInterval(timer);
        $('.operator').html('paused');
    }

    function process() {
    	nextCard();
    }

    Mousetrap.bind('right', function() {
        stopTimer();
        play = false;

        nextCard();
    });

    Mousetrap.bind('left', function() {
        stopTimer();
        play = false;

        if (partCount > 0) {
            partCount--;
        }
        wrp.html((partCount + 1) + ':' + contentSplit[partCount]);
    });

    /**
    * Fisher–Yates shuffle
    */
    function shuffleArray(array) {
        var n = array.length, t, i;

        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }
        return array;
    }

    $(document).ready(function() {
        $('button[name=submitSpeed]').click(function() {
            closeModal();
            SPEED = $('input[name=speed]').val();
            console.log($('input[name=speed]').val());
        });
    });
}
