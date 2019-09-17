function init(){

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var days = 0;
    var hour = 0;

    for (var i=0; i<=31; i++) {
        var tmp_day = i < 10 ? "0" + i.toString() : i;
        var tmp_month = month <10 ? "0" + month.toString() : month;
        $.get( "https://ezkhuman.bizmeka.com/product/golvwkmng/onedaygolvwkmngpers/readOnedayGolvwkMngPers.do?viewMenuCode=PJ02&enplcCd=G001&workDate=" 
            + year + "." 
            + tmp_month + "." 
            + tmp_day)
        .done(function(response) {
            console.log(response);
            if(response.workHour !== "00:00" && response.workHour) {
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

            if (i > 0 && !response.workHour) {
                document.body.innerHTML = "KT 비즈메카 근태관리에서 로그인 해주세요. (<a href='https://ezkhuman.bizmeka.com'>https://ezkhuman.bizmeka.com</a>) "
                    + "<br><br>비즈메카의 근태관리 메뉴 클릭 후 이용하실 수 있습니다.";
                return;
            }
        })
        .fail(function() {
            document.body.innerHTML = "KT 비즈메카 근태관리에서 로그인 해주세요. (<a href='https://ezkhuman.bizmeka.com'>https://ezkhuman.bizmeka.com</a>) "
                + "<br><br>비즈메카의 근태관리 메뉴 클릭 후 이용하실 수 있습니다.";
           return;
         });         
    }
}
window.onload = init;

