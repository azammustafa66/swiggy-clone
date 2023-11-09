function insertAtIndex(arr, value, index) {
  for (let i = arr.length; i >= index; i--) {
    arr[i] = arr[i - 1];
  }
  arr[index] = value;
}

const arr = [1, 2, 3, 4, 5];
insertAtIndex(arr, 10, 2);
console.log(arr);