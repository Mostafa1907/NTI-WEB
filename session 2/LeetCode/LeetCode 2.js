function greaterThanValue(arr,value){
    let result = [];
    for (let i = 0; i < arr.length; i++) {
     if (arr[i]>value) {
     result[result.length] = arr[i];
     }
    }
    return result;
}
console.log(greaterThanValue([2, 7, 4, 9, 1, 6], 5));
console.log(greaterThanValue([10, 20, 30], 15));
