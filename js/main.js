$(document).ready(function(){
  let state_icon = ""; // 텍스트 아이콘 -> 이미지로 변경하는 데이터
  // const cityName = []; // 버튼 클릭 또는 검색바에서 입력을 하면 도시명 데이터를 수집함
  let city = "";
  $(".cities button").eq(0).addClass("active");

  cur_city();

  // 현재 위치의 경도, 위도 받아서 도시정보 받아오기
  function cur_city(){
    navigator.geolocation.getCurrentPosition(function(poisition){
      const latitude = poisition.coords.latitude;
      const longitude = poisition.coords.longitude;
      // $(".lon").text(longitude);
      // $(".lat").text(latitude);
      console.log(latitude);
      console.log(longitude);

      $.ajax({
        url : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a4f372d0c9a49963750b2c564a166062`,
        data : "json",
        success : function(data){
          city = data.name;
          console.log("도시명 : " + city);
          const nation = data.sys.country;
          console.log("국가명 : " + nation);

          // cityName.unshift(city); // 현재위치의 도시명을 받아 위의 ajax에서 날씨데이터 받음
          w_info();

          // 텍스트화 : weather 데이터를 이미지로 변경
          // if(weather == "Clear") state_icon = "wi-day-sunny";
          // else if(weather == "Clouds") state_icon = "wi-cloud";
          // else if(weather == "Rain") state_icon = "wi-rain";
          // else if(weather == "Snow") state_icon = "wi-snow";
          // else if(weather == "Mist") state_icon = "wi-fog";
          // $("#weather li").eq(idx).find(".cur_icon i").addClass(state_icon);
          // $("#weather li").eq(idx).find(".temp .degree").text(temp);
          // $("#weather li").eq(idx).find(".temp_min").text(min_temp);
          // $("#weather li").eq(idx).find(".temp_max").text(max_temp)
          // $("#weather li").eq(idx).find("h4").text(weather);
          // $("#weather li").eq(idx).find(".city").text(city);
          // $("#weather li").eq(idx).find(".nation").text(nation);
          // $("#weather li").eq(idx).find(".wind span").text(wind);
          // $("#weather li").eq(idx).find(".humidity span").text(humidity);
          // $("#weather li").eq(idx).find(".cloud span").text(cloud);
        } 
      });
    });
  }

    $(document).on("click", ".cities button", function(){
      $(".cities button").removeClass("active");
      $(this).addClass("active");

      city = $(this).text(); // 클릭한 버튼의 text 추출
      console.log(city);
      // cityName.unshift(city_txt);
      // $(this).remove(); // 클릭한 버튼 제거
      if($(this).index() == 0){
        cur_city();
      }else{
        w_info();
      }
    });

  function w_info(){
    // $("#weather ul").empty();

    // for(v of cityName){
    //   console.log(cityName);
    //   $("#weather ul").append(w_box);
    // }
    // $("#weather ul").append(w_box);
  
    $.ajax({
      url : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a4f372d0c9a49963750b2c564a166062`,
      data : "json",
      error : function(){
        alert("에러");
      },
      success : function(data){
        console.log(data);
        const temp = Math.round(data.main.temp - 273.15);
        console.log("현재 온도 : " + temp);
        const min_temp = Math.round(data.main.temp_min - 273.15);
        console.log("최저 온도 : " + min_temp);
        const max_temp = Math.round(data.main.temp_max - 273.15);
        console.log("최고 온도 : " + max_temp);
        const weather = data.weather[0].main; // Clouds
        console.log("현재 날씨 : " + weather);
        const city = data.name;
        console.log("도시명 : " + city);
        const nation = data.sys.country;
        console.log("국가명 : " + nation);
        const wind = data.wind.speed;
        console.log("현재 풍속 : " + wind);
        const humidity = data.main.humidity;
        console.log("현재 습도 : " + humidity);
        const cloud = data.clouds.all;
        console.log("구름 양 : " + cloud);

        // 텍스트화 : weather 데이터를 이미지로 변경
        if(weather == "Clear") state_icon = "wi-day-sunny";
        else if(weather == "Clouds") state_icon = "wi-cloud";
        else if(weather == "Rain") state_icon = "wi-rain";
        else if(weather == "Snow") state_icon = "wi-snow";
        else if(weather == "Mist") state_icon = "wi-fog";
        $("#weather").find(".cur_icon i").addClass(state_icon);
        $("#weather").find(".temp .degree").text(temp);
        $("#weather").find(".temp_min").text(min_temp);
        $("#weather").find(".temp_max").text(max_temp)
        $("#weather").find(".city").text(city);
        $("#weather").find(".nation").text(nation);
        $("#weather").find(".wind span").text(wind);
        $("#weather").find(".humidity span").text(humidity);
        $("#weather").find(".cloud span").text(cloud);
      } 
    });

  };
  




});