const arrayToCSV=(arr)=> {
if(!arr || arr.length ===0) return null;
  return arr.join(", ");
}

const capitalizeFirstLetter =(string)=>{
  if(!string) return "";
  return string.charAt(0).toUpperCase()+string.slice(1).toLowerCase();
}

export {arrayToCSV,capitalizeFirstLetter};