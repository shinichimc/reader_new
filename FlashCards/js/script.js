// http://www.html5rocks.com/ja/tutorials/file/dndfiles/
// http://www.shurey.com/js/labo/FileAPI.html

//////////////////////////////////////
//////////////////////////////////////
////////ファイル読み取り部分/////////////
//////////////////////////////////////
//////////////////////////////////////
(function() {
    var isSet = false;

    var c = '';
    var SEPARATOR = '\n';
    var SHUFFLE = false;
    $(document).ready(function() {

        // ファイル選択
        document.getElementById('files').addEventListener('change', handleFileSelectByButton, false);

        // ファイルを選ぶ
        Mousetrap.bind('enter', function() {
            $('#files').click();
        });

        $('.modal-bg').click(function(e) {;
            if ($(e.target).attr('class') == 'modal-bg') {
                closeModal();
            }
        });
    });

    /**
    * ファイル選択
    */
    function handleFileSelectByButton(evt) {
        var files = evt.target.files; // FileList object

        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                      f.size, ' bytes, last modified: ',
                      f.lastModifiedDate.toLocaleDateString(), '</li>');

          // Only process image files.
          if (!f.type.match('text.*')) {
            alert('invalid file.');
            continue;
          }

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = function(evt){
      			var txt = evt.target.result; //ファイル内容を読み出し
                c = txt;
                loadFile();
      	  }

          // Read in the image file as a data URL.
          reader.readAsText(f, 'shift-js');
        }
        // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    }

    /**
    * 読み込んだファイルをセットする
    */
    function loadFile() {
        if (isSet) return;

        var wrp = $('.main');
        reader(c, wrp, SEPARATOR, SHUFFLE);
        wrp
            .css('text-align', 'center')
            .css('margin-top', '275px');

        if (c.length > 0) {
            alert('file loaded.');
            isSet = true;
            $('.sample').hide();
            $('#files').remove();
            $('.instruction').hide();
        } else {
            alert('failed loading a file. try again')
        }
    }
})();


//////////////////////////////////////
//////////////////////////////////////
//////////////表示側//////////////////
//////////////////////////////////////
//////////////////////////////////////

var showIndex = false; // UIからの操作のためグローバルにする

function toggleIdxNum() {
    showIndex = !showIndex;
    $('.idxNum').toggle();
}

function reader(content, wrp, splitter, shuffle) {

    var isPaused = false;
    var partCount = -1;
    var play = false;
    var interval = 1500;
    var contentSplit = content.split(splitter);
    if (shuffle) {
        contentSplit = shuffleArray(contentSplit);
    }

    function display() {
        wrp.html('<span class="idxNum">' + (partCount + 1) + ':</span>' + contentSplit[partCount]);
        if (!showIndex) $('.idxNum').hide();
    }

    function nextCard() {
        if (partCount < contentSplit.length - 1) {
            partCount++;
        } else {
            play = null;
            stopTimer();
            $('.operator').html('stopped');
        }
        display();
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
        display();
    });

    Mousetrap.bind('s', function() {

        play = false;
        stopTimer();

        contentSplit = shuffleArray(contentSplit);
        partCount = 0;
        display();
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
        display();
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

//////////////////////////////////////
//////////////////////////////////////
///////////////UI系///////////////////
//////////////////////////////////////
//////////////////////////////////////
function openModal() {
    $('.modal-bg').show();
}

function closeModal() {
    $('.modal-bg').hide();
}

function toggleVanish() {
    $('div.main').toggleClass('vanish');
}
