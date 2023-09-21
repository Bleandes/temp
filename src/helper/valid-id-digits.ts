export function validIeDigitos(uf: string, ie: string) {
  ie = ie.replace(/\D/g, '');

  let a = parseInt(ie.slice(0, 1));
  let b = parseInt(ie.slice(1, 2));
  let c = parseInt(ie.slice(2, 3));
  let d = parseInt(ie.slice(3, 4));
  let e = parseInt(ie.slice(4, 5));
  let f = parseInt(ie.slice(5, 6));
  let g = parseInt(ie.slice(6, 7));
  let h = parseInt(ie.slice(7, 8));
  let i = parseInt(ie.slice(8, 9));
  let j = parseInt(ie.slice(9, 10));
  let k = parseInt(ie.slice(10, 11));
  let l = parseInt(ie.slice(11, 12));
  let m = parseInt(ie.charAt(ie.length - 1));

  switch (uf.toUpperCase()) {
    case 'AC':
      if (ie.length != 13) {
        return false;
      }

      if (a != 0 && b != 1) {
        return false;
      }

      let resultAc =
        (4 * a + 3 * b + 2 * c + 9 * d + 8 * e + 7 * f + 6 * g + 5 * h + 4 * i + 3 * j + 2 * k) %
        11;

      let primeiroDiditoAc = 11 - resultAc;

      if (primeiroDiditoAc != l) {
        return false;
      }

      let result2 =
        (5 * a +
          4 * b +
          3 * c +
          2 * d +
          9 * e +
          8 * f +
          7 * g +
          6 * h +
          5 * i +
          4 * j +
          3 * k +
          2 * l) %
        11;

      let segundoDigito1 = 11 - result2;

      if (segundoDigito1 != m) {
        return false;
      }

      return true;
    case 'AL':
      if (ie.length != 9) {
        return false;
      }

      if (a != 2 && b != 4) {
        return false;
      }

      let resultAl = (9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * g + 2 * h) % 11;

      let digitoVerificadorAl = 11 - resultAl;

      if (digitoVerificadorAl == 10 && i != 0) {
        return false;
      }

      if (digitoVerificadorAl != i) {
        return false;
      }

      return true;
    case 'AM':
      if (ie.length != 9) {
        return false;
      }

      let resultAm = (9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * g + 2 * h) % 11;

      let digitoVerificadorAm = 11 - resultAm;

      if (digitoVerificadorAm == 10 && i == 0) {
        return true;
      }

      if (digitoVerificadorAm != i) {
        return false;
      }

      return true;
    case 'AP':
      if (ie.length != 9) {
        return false;
      }

      let ieNumber = a + b + c + d + e + f + g + h;

      let p3 = 0;
      let y3 = 0;

      let x1 = 0 + 3 + 0 + 0 + 0 + 0 + 0 + 1;
      let x2 = 0 + 3 + 0 + 1 + 7 + 0 + 0 + 0;
      let x3 = 0 + 3 + 0 + 1 + 7 + 0 + 0 + 1;
      let x4 = 0 + 3 + 0 + 1 + 9 + 0 + 2 + 2;

      if (ieNumber >= x1 || ieNumber <= x2) {
        p3 = 5;
        y3 = 0;
      } else {
        if (ieNumber >= x3 || ieNumber <= x4) {
          p3 = 9;
          y3 = 1;
        } else {
          p3 = 0;
          y3 = 0;
        }
      }

      let result3 = (p3 + 9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * g + 2 * h) % 11;

      let digitoVerificardor3 = 11 - result3;

      if ((i == 0 && digitoVerificardor3 == 10) || (digitoVerificardor3 == 11 && i == y3)) {
        return true;
      }

      if (digitoVerificardor3 != i) {
        return false;
      }

      return true;
    case 'BA':
      if (ie.length == 8) {
        if (a == 0 || a == 1 || a == 2 || a == 3 || a == 4 || a == 5 || a == 8) {
          let result5 = 7 * a + 6 * b + 5 * c + 4 * d + 3 * e + 2 * f;
          // Calculo diferente da documentação
          // Refatorar
          let result51 = 8 * a + 7 * b + 6 * c + 5 * d + 4 * e + 3 * f + 2 * g;

          let resto5 = result5 % 10;
          let resto51 = result51 % 10;

          let digitoVerificador5 = 10 - resto5;
          let digitoVerificador51 = 10 - resto51;

          if (digitoVerificador5 != h || digitoVerificador51 != g) {
            return false;
          }
        } else {
          if (a == 6 || a == 7 || a == 9) {
            let result52 = 7 * a + 6 * b + 5 * c + 4 * d + 3 * e + 2 * f;
            let result53 = 8 * a + 7 * b + 6 * c + 5 * d + 4 * e + 3 * f + 2 * g;

            let resto52 = result52 % 11;
            let resto53 = result53 % 11;

            let digitoVerificador52 = 11 - resto52;
            let digitoVerificador53 = 11 - resto53;

            if (digitoVerificador52 != h) {
              return false;
            }

            if (digitoVerificador53 != g) {
              return false;
            }
          }
        }
      }

      if (ie.length == 9) {
        let result6 = 8 * a + 7 * b + 6 * c + 5 * d + 4 * e + 3 * f + 2 * g;
        let result7 = 9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * h + 2 * i;

        let modulo = 10;

        if (i == 6 || i == 7 || i == 9) {
          modulo = 11;
        }

        let resto61 = result6 % 10;
        let resto62 = result7 % modulo;

        let digitoVerificardor6 = 10 - resto61;
        let digitoVerificardor7 = modulo - resto62;

        if (digitoVerificardor6 == 0 && j != 0) {
          return false;
        }

        if (digitoVerificardor6 != j) {
          return false;
        }

        if (digitoVerificardor7 != i) {
          return false;
        }
      }

      return true;
    case 'CE':
      if (ie.length != 11) {
        return false;
      }

      let resultCe = (9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * g + 2 * h) % 11;

      let digitoVerificadorCe = 11 - resultCe;

      if (i == 0 && (digitoVerificadorCe == 10 || digitoVerificadorCe == 11)) return true;

      if (digitoVerificadorCe != i) {
        return false;
      }

      return true;
    case 'DF':
      if (ie.length != 13) {
        return false;
      }

      let primeiroDigitoDf = false;

      let resultDf =
        (4 * a + 3 * b + 2 * c + 9 * d + 8 * e + 7 * f + 6 * g + 5 * h + 4 * i + 3 * j + 2 * k) %
        11;

      let digitoVerificadorDf = 11 - resultDf;

      let resultDf2 =
        (5 * a +
          4 * b +
          3 * c +
          2 * d +
          9 * e +
          8 * f +
          7 * g +
          6 * h +
          5 * i +
          4 * j +
          3 * k +
          2 * l) %
        11;

      let digitoVerificadorDf2 = 11 - resultDf2;

      if (l == 0) {
        if (digitoVerificadorDf == 10) {
          primeiroDigitoDf = true;
        }
        if (digitoVerificadorDf == 11) {
          primeiroDigitoDf = true;
        }
      }

      if (m == 0) {
        if (digitoVerificadorDf2 == 10) {
          if (primeiroDigitoDf) {
            return true;
          }
        }
        if (digitoVerificadorDf2 == 11) {
          if (primeiroDigitoDf) {
            return true;
          }
        }
      }

      if (digitoVerificadorDf != l || digitoVerificadorDf2 != m) {
        return false;
      }

      return true;
    case 'ES':
      if (ie.length != 9) {
        return false;
      }

      let resultEs = (9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * g + 2 * h) % 11;

      let digitoVerificadorEs = 11 - resultEs;

      if (resultEs < 2 && digitoVerificadorEs == 0) return true;

      if (digitoVerificadorEs != i) return false;

      return true;
    case 'GO':
      return IeComTamanhoNove(ie);
    case 'MA':
      return IeComTamanhoNove(ie);
    case 'MG':
      if (ie.length != 13) {
        return false;
      }

      let primeiroDigitoMg = false;

      let a1 = a * 1;
      let a2 = b * 2;
      let a3 = c * 1;
      let a4 = d * 1;
      let a5 = e * 2;
      let a6 = f * 1;
      let a7 = g * 2;
      let a8 = h * 1;
      let a9 = i * 2;
      let a10 = j * 1;
      let a11 = k * 2;

      let resultMg =
        a1 +
        Calcular(a2) +
        a3 +
        0 +
        a4 +
        Calcular(a5) +
        a6 +
        Calcular(a7) +
        a8 +
        Calcular(a9) +
        a10 +
        Calcular(a11);

      let digitoVerificadorMg = 40 - resultMg;

      let resultMg2 =
        (a * 3 +
          b * 2 +
          c * 11 +
          d * 10 +
          e * 9 +
          f * 8 +
          g * 7 +
          h * 6 +
          i * 5 +
          j * 4 +
          k * 3 +
          l * 2) %
        11;

      let digitoVerificadorMg2 = 11 - resultMg2;

      if (l == 0) {
        if (digitoVerificadorMg == 10) {
          primeiroDigitoDf = true;
        }
        if (digitoVerificadorMg == 11) {
          primeiroDigitoDf = true;
        }
      }

      if (m == 0) {
        if (digitoVerificadorMg2 == 10) {
          if (primeiroDigitoMg) {
            return true;
          }
        }
        if (digitoVerificadorMg2 == 11) {
          if (primeiroDigitoMg) {
            return true;
          }
        }
      }

      if (digitoVerificadorMg != l || digitoVerificadorMg2 != m) {
        return false;
      }

      return true;
    case 'MS':
      if (ie.length != 9) return false;

      let resultMs = (a * 9 + b * 8 + c * 7 + d * 6 + e * 5 + f * 4 + g * 3 + h * 2) % 11;

      if (resultMs == 0 && i == 0) return true;

      let digitoVerificadorMs = 11 - resultMs;

      if (digitoVerificadorMs > 9 && i != 0) return false;

      if (digitoVerificadorMs != i) return false;

      return true;
    case 'MT':
      if (ie.length != 11) return false;

      let resultMt =
        (3 * a + 2 * b + 9 * c + 8 * d + 7 * e + 6 * f + 5 * g + 4 * h + 3 * i + 2 * j) % 11;

      if ((resultMt == 0 || resultMt == 1) && k == 0) return true;

      let digitoVerificadorMt = 11 - resultMt;

      if (digitoVerificadorMt != k) return false;

      return true;
    case 'PA':
      if (a != 1 && b != 5) return false;

      return IeComTamanhoNove(ie);
    case 'PB':
      return IeComTamanhoNove2(ie);
    case 'PE':
      if (ie.length != 9) return false;

      let resultPe = (8 * a + 7 * b + 6 * c + 5 * d + 4 * e + 3 * f + 2 * g) % 11;

      let primeiroDigitoBool = false;

      if ((resultPe == 0 || resultPe == 1) && h == 0) primeiroDigitoBool = true;

      let digitoVerificadorPe = 11 - resultPe;

      if (digitoVerificadorPe != h && !primeiroDigitoBool) {
        return false;
      }

      let resultPe1 = (9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * g + 2 * h) % 11;

      if ((resultPe1 == 0 || resultPe1 == 1) && k == 0) {
        if (primeiroDigitoBool) return true;
      }

      let digitoVerificadorPe1 = 11 - resultPe1;

      if (digitoVerificadorPe1 != i) {
        return false;
      }

      return true;
    case 'PI':
      return IeComTamanhoNove2(ie);
    case 'PR':
      if (ie.length != 10) return false;

      let resultPr = (a * 3 + b * 2 + c * 7 + d * 6 + e * 5 + f * 4 + g * 3 + h * 2) % 11;

      let digitoVerificadorPr = 11 - resultPr;

      if (digitoVerificadorPr != i) {
        return false;
      }

      let resultPr1 = (a * 4 + b * 3 + c * 2 + d * 7 + e * 6 + f * 5 + g * 4 + h * 3 + i * 2) % 11;

      let digitoVerificadorPr1 = 11 - resultPr1;

      if ((digitoVerificadorPr1 == 10 || digitoVerificadorPr1 == 11) && j == 0) return true;

      if (digitoVerificadorPr1 != j) {
        return false;
      }

      return true;
    case 'RJ':
      if (ie.length != 8) return false;

      let resultRj = (a * 2 + b * 7 + c * 6 + d * 5 + e * 4 + f * 3 + g * 2) % 11;

      if (resultRj <= 1 && h == 0) return true;

      let digitoVerificadorRj = 11 - resultRj;

      if (digitoVerificadorRj != h) return false;

      return true;
    case 'RN':
      if (a != 2 && b != 0) return false;

      if (ie.length == 9) {
        let resultRn = 11 - ((9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * g + 2 * h) % 11);

        if (resultRn == 10 && i == 0) return true;

        if (resultRn != i) return false;
      }

      if (ie.length == 10) {
        let resultRn = (3 * a + 7 * b + 9 * c + 10 * d + 5 * e + 8 * f + 4 * g + 2 * h) % 11;

        const digitoVerificadorRn = resultRn <= 1 ? 0 : 11 - resultRn;

        if (digitoVerificadorRn != i + j) return false;
      }

      return true;
    case 'RO':
      if (ie.length !== 14) return false;

      const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      let soma = 0;

      for (let i = 0; i < 13; i++) {
        soma += parseInt(ie.charAt(i)) * pesos[i];
      }

      let digitoVerificadorRo = 11 - (soma % 11);

      if (digitoVerificadorRo === 10 || digitoVerificadorRo === 11) {
        digitoVerificadorRo = 0;
      }

      return digitoVerificadorRo === parseInt(ie.charAt(13));
    case 'RR':
      if (ie.length != 9) return false;

      let digitoVerificadorRr = (1 * a + 2 * b + 3 * c + 4 * d + 5 * e + 6 * f + 7 * g + 8 * h) % 9;

      return digitoVerificadorRr == i;
    case 'RS':
      if (ie.length != 10) return false;

      let codigoVerificadorRs =
        11 - ((2 * a + 9 * b + 8 * c + 7 * d + 6 * e + 5 * f + 4 * g + 3 * h + 2 * i) % 11);

      if (codigoVerificadorRs === 10 || codigoVerificadorRs === 1) codigoVerificadorRs = 0;

      return codigoVerificadorRs === j;
    case 'SC':
      if (ie.length != 9) return false;

      let codigoVerificadorSc =
        11 - ((9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * g + 2 * h) % 11);

      if ((codigoVerificadorSc === 0 || codigoVerificadorSc === 1) && i == 0) return true;

      return codigoVerificadorSc === i;
    case 'SE':
      if (ie.length != 9) return false;

      let codigoVerificadorSe =
        11 - ((9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * g + 2 * h) % 11);

      if ((codigoVerificadorSe === 0 || codigoVerificadorSe === 1) && i == 0) return true;

      return codigoVerificadorSe === i;
    case 'SP':
      if (ie.length != 12) return false;

      let digitoVerificadorSp =
        (a * 1 + b * 3 + c * 4 + d * 5 + e * 6 + f * 7 + g * 8 + h * 10) % 11;

      if (digitoVerificadorSp != i) return false;

      let digitoVerificadorSp1 =
        (a * 3 + b * 2 + c * 10 + d * 9 + e * 8 + f * 7 + g * 6 + h * 5 + i * 4 + j * 3 + k * 2) %
        11;

      if (digitoVerificadorSp1 != l) return false;

      return true;
    case 'TO':
      if (ie.length != 11) return false;

      let digitoVerificadorTo =
        (a * 9 + b * 8 + e * 7 + f * 6 + g * 5 + h * 4 + i * 3 + j * 2) % 11;

      if (digitoVerificadorTo < 2) {
        digitoVerificadorTo = 0;
      } else {
        digitoVerificadorTo = 11 - digitoVerificadorTo;
      }

      return digitoVerificadorTo === k;
    default:
      return false;
  }
}

export function IeComTamanhoNove(ie: string) {
  if (ie.length != 9) return false;

  ie = ie.replace(/\D/g, '');

  let a = parseInt(ie.slice(0, 1));
  let b = parseInt(ie.slice(1, 2));
  let c = parseInt(ie.slice(2, 3));
  let d = parseInt(ie.slice(3, 4));
  let e = parseInt(ie.slice(4, 5));
  let f = parseInt(ie.slice(5, 6));
  let g = parseInt(ie.slice(6, 7));
  let h = parseInt(ie.slice(7, 8));
  let i = parseInt(ie.charAt(ie.length - 1));

  let resultGo = 9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * g + 2 * h;

  let restoGo = resultGo % 11;

  let digitoVerificadorGo = 11 - restoGo;

  if (digitoVerificadorGo == 0 && (restoGo == 0 || restoGo == 1)) return true;

  if (digitoVerificadorGo != i) return false;

  return true;
}

function Calcular(numero: number) {
  let num = numero.toString();

  numero = 0;

  for (var i = 0; i < num.length; i++) {
    numero += parseInt(num.charAt(i));
  }
  return numero;
}

function IeComTamanhoNove2(ie: string) {
  if (ie.length != 9) return false;

  ie = ie.replace(/\D/g, '');

  let a = parseInt(ie.slice(0, 1));
  let b = parseInt(ie.slice(1, 2));
  let c = parseInt(ie.slice(2, 3));
  let d = parseInt(ie.slice(3, 4));
  let e = parseInt(ie.slice(4, 5));
  let f = parseInt(ie.slice(5, 6));
  let g = parseInt(ie.slice(6, 7));
  let h = parseInt(ie.slice(7, 8));
  let i = parseInt(ie.charAt(ie.length - 1));

  let resultPb = 9 * a + 8 * b + 7 * c + 6 * d + 5 * e + 4 * f + 3 * g + 2 * h;

  let restoPb = resultPb % 11;

  if ((restoPb == 10 || restoPb == 11) && i == 0) return true;

  let digitoVerificadorPb = 11 - restoPb;

  if (digitoVerificadorPb != i) return false;

  return true;
}
