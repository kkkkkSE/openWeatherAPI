$(document).ready(function(){
    var $pop_active = $("popup").hasClass("active");

    $("#dark, #popup .close").click(function(){
        $("#dark").removeClass("active");
        $("#popup").removeClass("active");
    });

});

function setCookie(name, value, expirehours){
    var todayDate = new Date(); // 함수 실행 시의 시각

    //현재시간으로부터 만료시간을 더하여 todayDate의 시간을 새로 설정
    todayDate.setHours(todayDate.getHours() + expirehours);

    console.log(todayDate); //한국 표준 시의 쿠키 만료시간
    console.log(document.cookie); 

    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"; // 만료시간(한국 > GMT로 변경) 설정
    

    console.log(todayDate.toGMTString()); // (한국보다 -9시간)

    // escape() : 알파벳, 숫자, 특수문자(*, @, -, _, +, ., /)를 제외한 문자를 16진수로 변경(, ; 등이 쿠키열에서 충돌하는 것을 방지)
    // , 의 용도 : 객체 구분 // ;의 용도 : 문장의 종료를 의미
    // toGMTString() : 표준시(GMT)를 사용하여 문자열로 변환된 일자를 반환

}

function todayClosePop(){
    setCookie("ncookie_1h", "done_1h", 1);

    //둘중 하나 사용
    // document.getElementById("dark").setAttribute("class", "");
    document.getElementById("dark").classList.remove("active");
    document.getElementById("popup").classList.remove("active");

}

//화면이 열리면서 브라우저 내의 쿠키상태를 체크
cookiedata = document.cookie;
console.log(cookiedata); //bHideResizeNotice=1; PHPSESSID=kjg68bhls40s82t42541do4khl; ncookie_1h=done_1h
if(cookiedata.indexOf("ncookie_1h=done_1h") < 0){
    document.getElementById("dark").classList.add("active");
    document.getElementById("popup").classList.add("active");
}else{
    document.getElementById("dark").classList.remove("active");
    document.getElementById("popup").classList.remove("active");
}
