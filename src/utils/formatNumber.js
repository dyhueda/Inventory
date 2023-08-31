export default function formatNumber(number){

    let formattedNumber = number.toFixed(3);
    if (formattedNumber.endsWith('.000')) {
      formattedNumber = formattedNumber.replace('.000', '');
      return formattedNumber
    }else{
      return formattedNumber
    }
}