export default function stringToSeconds(inputString) {
  const positionNotation = /^[0-9 ]+$/;
  let parsedTime = {seconds: 0, minutes: 0, hours: 0};
  inputString = inputString.replace(/[ :]+/g, ' ');

  function positionalParse(timeString) {
    return timeString.split(' ').reverse().reduce((units, value, index) => {
      let key = Object.keys(units)[index];
      units[key] = parseInt(value, 10);
      return units;
    }, parsedTime);
  }

  function unitsParse(timeString) {
    return timeString.split(' ').reduce((timeUnits, unitEntry) => {
      let valueString = unitEntry.match(/\d+/)[0];
      let unitString  = unitEntry.match(/[a-zA-Z]+/)[0].toLowerCase();
      var unit = Object.keys(timeUnits).filter((timeUnit) => {
        return (timeUnit.substr(0, unitString.length) == unitString);
      })[0];
      parsedTime[unit] = parseInt(valueString, 10);

      return parsedTime;
    }, parsedTime);
  }

  if (positionNotation.test(inputString)) {
    parsedTime = positionalParse(inputString);
  } else {
    parsedTime = unitsParse(inputString);
  }

  return (parsedTime.hours * 3600) + (parsedTime.minutes * 60) + parsedTime.seconds;
}
