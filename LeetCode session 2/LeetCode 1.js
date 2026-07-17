function Sort(arr) {
for(let i = 0; i < arr.length - 1; i++){
    if(arr[i]>arr[i+1]) {
        return false
        }
    }
    return true;
}
console.log(Sorted([1, 2, 3, 4, 5]))
console.log(Sorted([1, 5, 3, 4]))
console.log(Sorted([7]))