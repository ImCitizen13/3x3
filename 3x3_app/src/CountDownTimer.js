import React from 'react';
import { useCountDown} from './useCountDown';

const ExpiredNotice = () => {
    return (
      <div className="expired-notice">
        <span>Expired!!!</span>
        <p>Please select a future date and time.</p>
      </div>
    );
  };

function zeroPadding(num, digit) {
    var zero = '';
    for(var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}

function formatCountDown(countDown) {
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let clockTime = zeroPadding(countDown.hours, 2) 
                    + ':' + zeroPadding(countDown.minutes, 2) 
                    + ':' + zeroPadding(countDown.seconds, 2);
    let clockDate = zeroPadding(countDown.year, 4) 
                    + '-' + zeroPadding(countDown.month+1, 2) 
                    + '-' + zeroPadding(countDown.date.getDate(), 2) 
                    + ' ' + week[countDown.date.getDay()];

    return({
      time: clockTime,
      date: clockDate
      });
  };

const CountDownTimer = ({ targetDate }) => {
    const countDown = useCountDown(targetDate);

    const formattedCountDown = formatCountDown(countDown);

    if (countDown.days + countDown.hours + countDown.minutes + countDown.seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <div>
                <div id="clock">
                    <p class="date">{formattedCountDown.date }</p>
                    <p class="time">{formattedCountDown.time }</p>
                    <p class="text">Time for next mint</p>
                </div>
            </div>
        );
    }
}

export default CountDownTimer;