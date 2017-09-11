/**
 * parseStingToSeconds
 *
 * Parse the duration represented by a string and return the length is seconds,
 * parse status, and error message.
 *
 * The following string formats are valid: n n n, n:n:n, nh nm ns
 *
 * An empty string returns NaN.
 *
 * The object returned is a pojo with the following properties:
 *  - duration: int or Nan
 *  - isValid: true/false
 *  - errorMsg: string or null
 *
 * @param {string}
 * @returns {object}
 */
export default function parseStringToSeconds(inputString) {
  if (inputString === undefined) {
    return { duration: NaN, isValid: false, errorMsg: 'Input is undefined'};
  } else if (inputString === '') {
    return { duration: NaN, isValid: false, errorMsg: 'Input is an empty string'};
  } else if (inputString === '0') {
    return { duration: 0, isValid: true, errorMsg: null};
  }

  // 0:0:0 is a form of positional notation. Switch ':' to ' ' and compress multiple
  // spaces to a singe space.
  inputString = inputString.replace(/[ :]+/g, ' ');

  let parsedTime;
  const positionNotation = /^[0-9 ]+$/;
  if (positionNotation.test(inputString)) {
    parsedTime = inputString.split(' ').reverse().reduce((timeCollector, value, index) => {
      let key = Object.keys(timeCollector)[index];
      let intValue = parseInt(value, 10);
      timeCollector[key] = (isNaN(intValue)) ? 0 : intValue;
      return timeCollector;
    }, {seconds: 0, minutes: 0, hours: 0});
  } else {
    parsedTime = inputString.toLowerCase().replace(/hr/, 'h').trim().split(' ').reduce((accumulator, value) => {
      const numericValue = (value.match(/\d+/)    || [''])[0];  // Default '' if no match
      const unitValue    = (value.match(/[a-z]+/) || [''])[0];
      const unit = ['seconds', 'minutes', 'hours'].filter((unitName) => {
        return (unitName.substr(0, unitValue.length) === unitValue);
      })[0];

      if (unit === undefined) {
        accumulator.errorMsg.push(`"${unitValue}" is not a unit of time I understand. Please use h, m, or s.`);
      } else if (accumulator.hasOwnProperty(unit)) {
        accumulator.errorMsg.push(`There are multiple values given for ${unit}`);
      } else if (numericValue.length === 0) {
        accumulator.errorMsg.push(`No value given for ${unit}`);
      } else if (unit.length > 0 && unitValue.length > 0) {
        accumulator[unit] = parseInt(numericValue, 10);
      }
      return accumulator;
    }, {errorMsg: []});
  }

  // Normalize parsed time
  parsedTime = Object.assign({seconds: 0, minutes: 0, hours: 0, errorMsg: []}, parsedTime);

  if (parsedTime.errorMsg.length > 0) {
    return {
      duration: NaN,
      isValid:  false,
      errorMsg: parsedTime.errorMsg.join("\n"),
    }
  }

  return {
    duration: (parsedTime.hours * 3600) + (parsedTime.minutes * 60) + parsedTime.seconds,
    isValid:  true,
    errorMsg: null
  };
}
