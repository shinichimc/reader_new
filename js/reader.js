function reader(content, wrp, splitter, speed, nextKey, prevKey, breakLine, shuffle, vanishMode) {

    var INTERVAL = 100; // ms
    var isPaused = false;
    var partCount = 0;

    var contentSplit = content.split(splitter);
    if (shuffle) {
        contentSplit = shuffleArray(contentSplit);
    }
    for (var i = 0; i < contentSplit.length; i++) {
        var part = '<span class="part' + i + '">' + (i + 1) + ' ' + contentSplit[i] + '</span>' + (breakLine ? '<br>' : '');
        wrp.append(part);
        $('.part' + i).css('display', 'none');

    }

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
