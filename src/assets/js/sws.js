/*eslint-disable*/
// 취소버튼
function cancle(e) {
    switch (e) {
        case 'back':
            history.back();
            break;
        case 'reload':
            location.reload();
            break;
        case 'close':
            window.close();
            break;

    }

}