export function formatMoney(value: string | number | undefined): string {
  if (!value) return '0,00';
  let newValue = value;
  if (typeof value === 'number') {
    newValue = value.toString();
    if (!newValue.includes('.') && !newValue.includes(',')) {
      newValue = newValue + ',00';
    }
  } else {
    newValue = value.trim();
  }
  const cleanValue = String(newValue).replace(/[^0-9]/g, '');
  const paddedValue = cleanValue.padStart(3, '0');
  const reais = paddedValue.slice(0, -2);
  const centavos = paddedValue.slice(-2);
  const formattedReais = Number(reais).toLocaleString('pt-BR');
  return `${formattedReais},${centavos}`;
}

export function cleanFormatMoney(value: string): number {
  if (!value) return 0;
  if (value === '') return 0;
  if (typeof value === 'number') return value;
  const splited = value.trim().split(',');
  return parseFloat(`${splited[0].replaceAll('.', '')}.${splited[1]}`);
}

export function formatInfinityDecimal(
  value: number | string | undefined,
  decimal?: number,
  integer?: number,
): string {
  //first value to format, MUST be a number, the remaining iterations from the same function can be strings
  let decimalPartNumber = decimal ? decimal : 12;
  let intererPartNumber = integer ? integer : 12;
  if (!value) return '';

  if (value === ',') return '0,';

  let newValue = String(value)
    .trim()
    .replace(/[^0-9,.]/g, '');

  if (!newValue.includes(',')) {
    if (newValue.includes('.')) {
      if (typeof value === 'number') {
        newValue = newValue.replace('.', ',');
      } else {
        newValue = newValue.replaceAll('.', '');
      }
    }
  } else {
    newValue = newValue.replaceAll('.', '');
  }

  const [integralPart, decimalPart] = newValue.split(',');

  let integerMax =
    integralPart.length > intererPartNumber
      ? integralPart.slice(0, intererPartNumber)
      : integralPart;

  const formattedIntegralPart = integerMax.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  let formattedValue = '';
  if (decimalPart && decimalPart.length > 0) {
    if (decimalPart && decimalPart.length > decimalPartNumber) {
      formattedValue = `${formattedIntegralPart},${decimalPart.slice(0, decimalPartNumber)}`;
    } else {
      formattedValue = `${formattedIntegralPart},${decimalPart}`;
    }
  } else {
    if (newValue.includes(',')) {
      formattedValue = formattedIntegralPart + ',';
    } else {
      formattedValue = formattedIntegralPart;
    }
  }

  return formattedValue;
}

export function cleanFormatDecimal(value: string | number): number {
  if (!value) return 0;
  if (value === '') return 0;
  if (typeof value === 'number') {
    return value;
  }
  const splited = value.trim().split(',');
  if (splited[1] !== '') {
    return parseFloat(`${splited[0].replaceAll('.', '')}.${splited[1]}`);
  }
  return parseFloat(`${splited[0].replaceAll('.', '')}`);
}

export function onlyZeros(value: string) {
  if (!value) return false;
  if (value === '') return false;
  for (let i = 0; i < value.length; i++) {
    if (value[i] !== '0') return false;
  }
  return true;
}

export function cleanFormatInfinityDecimal(value: string | number): string {
  if (!value) return '';
  if (value === '') return '';
  if (typeof value === 'number') {
    return value.toString();
  }
  const splited = value.trim().split(',');
  if (onlyZeros(splited[1])) return splited[0];
  if (splited[0] === '' && splited[1] !== '') {
    return `0.${splited[1]}`;
  }
  if (splited[1] && splited[1] !== '') {
    return `${splited[0].replaceAll('.', '')}.${splited[1]}`;
  }
  return `${splited[0].replaceAll('.', '')}`;
}

export function convertNumberToString(value: number) {
  let newValue = value.toString();
  if (!newValue.includes('.')) return newValue + '.00';
  if (newValue.split('.')[1].length === 1) return newValue + '0';
  return newValue;
}

export const brazilianCurrencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const numberFormatterTwoDecimal = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatQuantitativeNumber(value: number | string | undefined): string {
  if (!value) return '';

  let newValue = value;
  if (typeof value === 'number') {
    newValue = value.toString();
  } else {
    newValue = value.trim();
  }

  let formattedValue = newValue.replace('.', ',');

  return formattedValue;
}

export function removeRightZeros(numero: string): string {
  if (!numero) return '';
  if (numero === '') return '';
  if (numero.length === 1) return numero + '0';
  if (numero.length === 2) return numero;

  let indice = numero.length - 1;

  while (indice >= 0 && numero[indice] === '0') {
    indice--;
  }

  return numero.substring(0, indice + 1);
}

export function formatInteger(numero: string, creating?: boolean): string {
  if (!numero) return '';
  if (typeof numero !== 'string') return '';
  const split = numero.split('.');
  return `${split[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
