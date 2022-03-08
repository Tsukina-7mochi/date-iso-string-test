const daysFromY1M1D1 = (_year: number, _month: number, day: number): number => {
  const year  = (_month > 2) ? _year  : _year  -1;
  const month = (_month > 2) ? _month : _month + 12;

  return 365 * year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400) + Math.floor(306 * (month + 1) / 10) + day - 428;
}

const parseISODate = function(isoDate: string): number {
  const matchResult = isoDate.match(/^(?<year>\d\d\d\d)-(?<month>\d\d)-(?<day>\d\d)T(?<hour>\d\d):(?<minute>\d\d):(?<second>\d\d)\.(?<millisecond>\d\d\d)Z$/);

  const getGroupInt = (captureName: string) => {
    if(!matchResult?.groups?.[captureName]) {
      return NaN;
    }

    return parseInt(matchResult.groups[captureName]);
  };

  const year  = getGroupInt('year');
  const month = getGroupInt('month');
  const day   = getGroupInt('day');
  const hour  = getGroupInt('hour');
  const min   = getGroupInt('minute');
  const sec   = getGroupInt('second');
  const ms    = getGroupInt('millisecond');


  // date from 1970-01-01
  const daysFromEpoch = daysFromY1M1D1(year, month, day) - daysFromY1M1D1(1970, 1, 1);

  return daysFromEpoch * 86400000 + hour * 3600000 + min * 60000 + sec * 1000 + ms;
}

const formatToISODate = function(date: number): string {
  const daysFromEpoch = Math.floor(date / 86400000) + daysFromY1M1D1(1970, 1, 1);
  const timeOfDay = date % 86400000;

  let year = 1970;
  let month = 1;
  let day = 1;
  while(daysFromY1M1D1(year, month, day) <= daysFromEpoch) {
    year += 1;
  }
  year -= 1;
  while(daysFromY1M1D1(year, month, day) <= daysFromEpoch) {
    month += 1;
  }
  month -= 1;
  while(daysFromY1M1D1(year, month, day) <= daysFromEpoch) {
    day += 1;
  }
  day -= 1;

  const hour = Math.floor(timeOfDay / 3600000);
  const min  = Math.floor((timeOfDay % 3600000) / 60000);
  const sec  = Math.floor((timeOfDay % 60000) / 1000);
  const ms   = (timeOfDay % 1000);

  return `${('0000' + year).slice(-4)}-${('00' + month).slice(-2)}-${('00' + day).slice(-2)}T`
       + `${('00' + hour).slice(-2)}:${('00' + min).slice(-2)}:${('00' + sec).slice(-2)}.${('000' + ms).slice(-3)}Z`;
}


export {
  parseISODate,
  formatToISODate
}