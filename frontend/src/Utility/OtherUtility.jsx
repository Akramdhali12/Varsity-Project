const arrayToCSV=(arr)=> {
if(!arr || arr.length ===0) return null;
  return arr.join(", ");
}

const capitalizeFirstLetter =(string)=>{
  if(!string) return "";
  return string.charAt(0).toUpperCase()+string.slice(1).toLowerCase();
}

const addZeroMonths = (data,monthKey,valueKey)=>{
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const result = months.map((month)=>{
    const found = data.find((item)=>item[monthKey]===month);
    return found ? found : {[monthKey]:month,[valueKey]:0};
  });
  return result;
}

const convertReasonChartData = (data)=>{
  const colors = ['#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0', '#00bcd4', '#ffc107', '#8bc34a'];
  return data.map((item,index)=>({
    name: item.reason,
    value: item.count,
    color: colors[index % colors.length],
  }));
}

export {arrayToCSV,capitalizeFirstLetter,addZeroMonths,convertReasonChartData};