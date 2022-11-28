import { useEffect, useState } from 'react';

const { DateTime } = require("luxon");

const useCountDown = (countDownDateAndDuration) => {
    // Get today's date and time
    var now = new Date().getTime();
    let countDownDate = countDownDateAndDuration.dateAndTime.toJSDate();
    // Find the distance between now and the count down date
    let distance = countDownDate - now;
    
    
    const [countDown, setCountdown] = useState(distance);

    useEffect(() => {

      const interval = setInterval(() => {
        setCountdown(distance)
      }, 1000);

      return () => clearInterval(interval);
    }, [countDownDate]);

    return getCountDownValues(countDownDate, distance);
  };

function getCountDownValues(countDownDate, distance){

    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);


    return {'date': countDownDate,
            'year': countDownDate.getFullYear(),
            'month': countDownDate.getMonth(),
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
            };
}



export { useCountDown };

