export default function convertTo12HourFormat(time) {
    const timeParts=time.split(':')
    let hours=parseInt(timeParts[0])
    let mins=parseInt(timeParts[1])
    let meridiem='AM'
    if(hours>=12)
    {
      meridiem='PM'
      if(hours>12)
      {
        hours-=12
      }
    }
    return hours.toString().padStart(2) +":"+ mins.toString().padStart(2,'0')+" " + meridiem
  }