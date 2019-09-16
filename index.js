function init(){

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var days = 0;
    var hour = 0;

    for (var i=1; i<=31; i++) {
        var tmp_day = i < 10 ? "0" + i.toString() : i;
        var tmp_month = month <10 ? "0" + month.toString() : month;
        $.get( "https://ezkhuman.bizmeka.com/product/golvwkmng/onedaygolvwkmngpers/readOnedayGolvwkMngPers.do?viewMenuCode=PJ02&enplcCd=G001&workDate=" 
            + year + "." 
            + tmp_month + "." 
            + tmp_day)
        .done(function(response) {
            if(response.workHour !== "00:00") {
                days++;
                hour += Number(response.workHour.split(":")[0])
                hour += Number(response.workHour.split(":")[1]) / 60
            } 
            if (tmp_day == 31) {
                $("#month").text(month + "월");
                $("#days").text(days + "일");
                $("#total_hour").text(hour.toFixed(2) + "시간");
                $("#mid_hour").text((hour/days).toFixed(2) + "시간");
          }
        })
        .fail(function() {
           document.body.innerText = "KT 비즈메카에서 로그인 해주세요.";
           return;
         });         
    }
}
window.onload = init;

