export default function secondsToDisplayLength(lengthInSeconds, format) {
  if (isNaN(lengthInSeconds) || lengthInSeconds === 0) {
    return '---';
  }
  let hms = [
    { unitName: 'h', value: Math.floor(lengthInSeconds / 3600) },
    { unitName: 'm', value: Math.floor((lengthInSeconds / 60) % 60) },
    { unitName: 's', value: lengthInSeconds % 60 }
  ];
  let displayTime = '';

  if (format === 'colon') {
    displayTime = hms.reduce((display, unit) => {
      if (display !== '') {
        display = display + ':';
      }
      return display = display + ('0' + unit.value.toString()).substr(-2);
    }, '');
  } else {
    displayTime = hms.reduce((display, unit) => {
      // Don't display a 0unit (eg: 0m) unless a higher unit is already displayed
      if (unit.value == 0 && display == '') {
        return display;
      }
      let unitDisplay = unit.value.toString() + unit.unitName;
      if (display != '') {
        unitDisplay = ' ' + unitDisplay;
      }

      return display + unitDisplay;
    }, '');
  }

  return displayTime;
}
