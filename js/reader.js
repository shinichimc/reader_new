///////////////////
///////////////////
//コンテンツセット ///
///////////////////
///////////////////
(function() {
    // http://www.html5rocks.com/ja/tutorials/file/dndfiles/
    // http://www.shurey.com/js/labo/FileAPI.html

    var isSet = false;

    var c = '';
    var SPEED = 300;
    var SEPARATOR = '\n';
    var NEXT_KEY = 'right';
    var PREV_KEY = 'left';
    var BREAK_LINE = true;
    var SHUFFLE = false;
    var VANISH_MODE = false;
    $(document).ready(function() {

        // ファイル選択
        document.getElementById('files').addEventListener('change', handleFileSelectByButton, false);

        // ファイルを選ぶ
        Mousetrap.bind('enter', function() {
            $('#files').click();
        });

        // ドラッグドロップ
        var dropZone = document.getElementById('drop_zone');
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);


    });

    /**
    * 読み込んだファイルをセットする
    */
    function loadFile() {
        if (isSet) return;

        var wrp = $('.main');
        reader(c, wrp, SEPARATOR, SPEED, NEXT_KEY, PREV_KEY, BREAK_LINE, SHUFFLE, VANISH_MODE);
        wrp
            .css('font-size', '13px')
            .css('line-height', '1.5em')

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
      			txt = txt.replace(/</g, "&lt;"); //置き換え
      			txt = txt.replace(/>/g, "&gt;"); //置き換え
                txt = txt.replace(/[\[](.+?)[\]]/g,'<span class="mark">$1</span>');
                txt = txt.replace(/[\*「](.+?)[\*」]/g,'<span class="strong">$1</span>');
                c = txt;
                loadFile();
      	  }

          // Read in the image file as a data URL.
          reader.readAsText(f, 'shift-js');
        }
      }


    /**
    * ドラッグドロップ
    */
    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.

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
      			txt = txt.replace(/</g, "&lt;"); //置き換え
      			txt = txt.replace(/>/g, "&gt;"); //置き換え
                txt = txt.replace(/[\[](.+?)[\]]/g,'<span class="mark">$1</span>');
                txt = txt.replace(/[\*「](.+?)[\*」]/g,'<span class="strong">$1</span>');
                c = txt;
                loadFile();
      	  }

          // Read in the image file as a data URL.
          reader.readAsText(f, 'utf-8');

        }
    }

    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

})();


///////////////////
///////////////////
///// Reader //////
///////////////////
///////////////////
function reader(content, wrp, splitter, speed, nextKey, prevKey, breakLine, shuffle, vanishMode) {
s
    var partCount = 0;

    // コンテンツを取得
    var contentSplit = content.split(splitter);

    // コンテンツをシャッフルする
    if (shuffle) {
        contentSplit = shuffleArray(contentSplit);
    }

    // コンテンツを生成しbodyに埋め込む
    for (var i = 0; i < contentSplit.length; i++) {
        var part = '<span class="part' + i + '">' + contentSplit[i] + '</span>' + (breakLine ? '<br>' : '');
        wrp.append(part);
        $('.part' + i).css('display', 'none');
    }

    // Nextkeyで次の行に進む
    Mousetrap.bind(nextKey, function() {
        if ($('.part' + partCount)[0] && $('.part' + partCount).text() == '') {
            partCount++;
        }
        $('.part' + partCount).fadeIn(speed);

        if (vanishMode) {
            if ($('.part' + (partCount-1))[0]) {
                $('.part' + (partCount-1)).fadeOut(speed);
            }
        }

        if (partCount < contentSplit.length) {
            partCount++;
        }

    });

    // PreviousKeyで前の行に戻る
    Mousetrap.bind(prevKey, function() {
        if (partCount > 0) {
            partCount--;
        }

        if ($('.part' + partCount).text() == '') {
            partCount--;
        }

        $('.part' + partCount).fadeOut(speed);
        if (vanishMode) {
            $('.part' + (partCount - 1)).fadeIn(speed);
        }
    });
}

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

// var INTERVAL = 100; // ms
// var isPaused = false;
// var partCount = 0;
//
// $(document).ready(function() {
//     var wrp = $('.main');
//     var content = 'blah blah';
//
//
//
//     var contentSplit = content.split('。');
//     for (var i = 0; i < contentSplit.length; i++) {
//         var part = '<span class="part' + i + '">' + contentSplit[i] + '。</span><br>';
//         wrp.append(part);
//         $('.part' + i).css('display', 'none');
//
//     }
//
//
//
//
//     content = content.replace(/。/g,'。      ');
//
//
//
//
//     /**
//     *   順番に点灯
//     */
//     // var ctr = 0;
//     // var intervalId = setInterval(function() {
//     //     if (!isPaused) {
//     //         wrp.append(content.charAt(ctr));
//     //         ctr++;
//     //         if (ctr == content.length) {
//     //             clearInterval(intervalId);
//     //         }
//     //     }
//     // }, INTERVAL);
//
//
//     $('.btn1').on('click', function(e) {
//         e.preventDefault();
//         isPaused = true;
//     });
//
//     $('.btn2').on('click', function(e) {
//         e.preventDefault();
//         isPaused = false;
//     });
//
//
//     Mousetrap.bind('enter', function() {
//         $('.part' + partCount).fadeIn('slow');
//         partCount++;
//     });
//
//     Mousetrap.bind('p', function() {
//         partCount--;
//         $('.part' + partCount).fadeOut('slow');
//
//     });
//
// });
