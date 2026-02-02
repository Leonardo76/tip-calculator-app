export function writeNumberAsStringWithTwoDecimals(number: number) {
   return writeNumberAsStringWithMultipleDecimals(number, 2);
}

/**
 * Given a number, return a string containing that number with given number of decimals
 * @param number - input number
 * @param numberOfDecimals - needed number of decimals. numberOfDecimals MUST be a positive integer
 */
export function writeNumberAsStringWithMultipleDecimals(number: number, numberOfDecimals: number) {
   if (numberOfDecimals < 0) {
      return number.toString();
   }

   const resultAsNumber = round(number, numberOfDecimals);
   const resultAsString = resultAsNumber.toString();

   if (!resultAsString.includes('.')) {
      //integer
      if(numberOfDecimals === 0)
      {
         return resultAsString;
      }
      return (`${resultAsString}.`).padEnd(resultAsString.length + numberOfDecimals + 1, "0");
   }

   const existingNumberOfDecimals = resultAsString.split('.')[1].length;
   const numberOfNeededZeros = numberOfDecimals - existingNumberOfDecimals;

   return resultAsString.padEnd(resultAsString.length + numberOfNeededZeros, "0");
}

/**
 * Round a number to the specified number of decimals
 * @param value - number to be rounded
 * @param places - number of decimals
 */
export function round(value: number, places: number) {
   return Number(Number.parseFloat(value.toString()).toFixed(places));
}
