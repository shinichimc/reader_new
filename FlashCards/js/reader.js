function reader(content, wrp, splitter, speed, nextKey, prevKey, breakLine, shuffle, vanishMode) {

    var isPaused = false;
    var partCount = -1;
    var inertval = 500;	//何秒毎に処理をするか（ここでは5秒）
    var play = false;
    var contentSplit = content.split(splitter);
    if (shuffle) {
        contentSplit = shuffleArray(contentSplit);
    }

    Mousetrap.bind('space', function() {

        play = !play;

        if (play) {
            startTimer();
        } else {
            stopTimer();
        }
    })

    Mousetrap.bind('q', function() {
        stopTimer();
        partCount = 0;
        wrp.html((partCount + 1) + ':' + contentSplit[partCount]);
    })

    $('button[name=shuffle]').on('click', function() {
        contentSplit = shuffleArray(contentSplit);
        partCount = 0;
        alert('array shuffled!');
        wrp.html((partCount + 1) + ':' + contentSplit[partCount]);
    });

    //タイマー開始関数
    function startTimer() {
    	//inertvalの秒数毎にsyori関数を実行する。その情報をtimer変数へ入れている。
    	timer = setInterval(process, inertval);
    }

    //タイマー停止関数
    function stopTimer() {
    	//timer変数を止める
    	clearInterval(timer);
    }

    function process() {
    	wrp.html((partCount + 1) + ':' + contentSplit[partCount]);
        partCount++;
    }

    Mousetrap.bind(nextKey, function() {
        if (partCount < contentSplit.length - 1) {
            partCount++;
        }
        wrp.html((partCount + 1) + ':' + contentSplit[partCount]);
    });

    Mousetrap.bind(prevKey, function() {
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
}
