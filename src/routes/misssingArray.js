//===========//Missing array//=========================



const arr=[1,2,3,4,5,7]
 let n=arr.length+1
let sn=n*(n+1)/2  //

var sum = 0;
for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
}
let result=sn-sum
console.log(result)
