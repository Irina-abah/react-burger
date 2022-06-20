import { TItem } from './types';

export function countIgredients(data: Array<TItem>) {

  const counts: any = {};
  const arrayToRender: Array<TItem> = [];
  
  data.forEach((x) => { 
    return counts[x._id] = (counts[x._id] || 0) + 1; 
  });
  
  const arrCounts: Array<{}> = Object.keys(counts).map((key) => [(key), counts[key]]);

  // crossmatch each [id, count] with every ingredient in the order
  data.forEach((i) => {
    arrCounts.forEach((item: any) => {
      if (i._id === item[0]) {
        arrayToRender.push(i, i['num'] = item[1])
      }
    })
  })

  // array of all ingredients with correct count
  const finalArray = arrayToRender.filter((i) => typeof i === 'object')

  // array of unique ingredients and correct count
  const uniqueIngredients = finalArray.filter((a, i) => finalArray.findIndex((s) => a._id === s._id) === i)

  return uniqueIngredients;
}




