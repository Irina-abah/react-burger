import { TExtendedItem } from './types';

export function countIgredients(data: Array<TExtendedItem>) {

  const counts: any = {};
  const arrayToRender: Array<TExtendedItem> = []
  
  data.forEach((x: any) => { 
    return counts[x._id] = (counts[x._id] || 0) + 1; 
  });
  
  const arrCounts: Array<{}> = Object.keys(counts).map((key) => [(key), counts[key]]);

  // crossmatch each [id, count] with every ingredient in the order
  data.forEach((i: TExtendedItem) => {
    arrCounts.forEach((item: any) => {
      if (i._id === item[0]) {
        arrayToRender.push(i, i['num'] = item[1])
      }
    })
  })

  // array of all ingredients with correct count
  const finalArray = arrayToRender.filter((i: TExtendedItem) => typeof i === 'object')
  console.log(finalArray)

  // array of unique ingredients and correct count
  const uniqueIngredients = finalArray.filter((a: TExtendedItem, i) => finalArray.findIndex((s: any) => a._id === s._id) === i)

  return uniqueIngredients;
}




