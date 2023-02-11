import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export const formatToCurrency = (
  value: any,
  withoutCommaSeparator: boolean = false
) => {
  const a = value.toString();
  let b = a.split('.')[0];

  b = b === '' ? '0' : b.replace(/[,.]/g, '').toString();
  if (!withoutCommaSeparator) {
    b = b.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  return `${b}.00`;
};

export const parseToDate = (e: NgbDateStruct) => {
  const DELIMITER = '/';
  return e.day + DELIMITER + e.month + DELIMITER + e.year;
};
