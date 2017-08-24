export default function stringToSeconds(inputString) {
  if (!inputString) {
    return 0;
  }

  // 0:0:0 a form of positional notation. Switch ':' to ' ' and compress multiple
  // spaces to a singe space.
  inputString = inputString.replace(/[ :]+/g, ' ');

  let parsedTime = {seconds: 0, minutes: 0, hours: 0};
  const positionNotation = /^[0-9 ]+$/;
  if (positionNotation.test(inputString)) {
    parsedTime = inputString.split(' ').reverse().reduce((timeCollector, value, index) => {
      let key = Object.keys(timeCollector)[index];
      let intValue = parseInt(value, 10);
      timeCollector[key] = (isNaN(intValue)) ? 0 : intValue;
      return timeCollector;
    }, parsedTime);
  } else {
    parsedTime = inputString.toLowerCase().split(' ').reduce((timeCollector, value) => {
      let numericValue = (value.match(/\d+/)    || [''])[0];  // Default '' if no match
      let unitValue    = (value.match(/[a-z]+/) || [''])[0];
      if (numericValue !== '' && unitValue !== '') {
        var unit = Object.keys(timeCollector).filter((unitName) => {
          return (unitName.substr(0, unitValue.length) === unitValue);
        })[0];
        timeCollector[unit] = parseInt(numericValue, 10);
      }
      return timeCollector;
    }, parsedTime);
  }

  return (parsedTime.hours * 3600) + (parsedTime.minutes * 60) + parsedTime.seconds;
}
