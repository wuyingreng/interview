function a() {
    console.log(1);
}
(function () {
    if (false) {
        function a() {
            console.log(2);
        }
    }
    console.log('typeof a==>', typeof a);
    a(); //1
})()


