import Ember from 'ember';

export function formatLength(length) {
  let hms = [
    { unitName: 'h', value: Math.floor(length / 3600) },
    { unitName: 'm', value: Math.floor((length / 60) % 60) },
    { unitName: 's', value: length % 60 }
  ];

  let displayTime = hms.reduce((display, unit) => {
    // Don't display 0unit unless a higher unit is present
    if (unit.value == 0 && display == '') {
      return display;
    }
    let unitDisplay = unit.value.toString() + unit.unitName;
    if (display != '') {
      unitDisplay = ' ' + unitDisplay;
    }

    return display + unitDisplay;
  }, '');

  return displayTime;
}

export default Ember.Helper.helper(formatLength);
