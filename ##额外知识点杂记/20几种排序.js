//【大 -> 小】

function bubble(arr) {
    let n = arr.length;
    let swapped = true;
    while(swapped){
        swapped = false;
        for (let i=1; i<n; i++){
            if (arr[i-1]<arr[i]){
                [arr[i-1],arr[i]] = [arr[i],arr[i-1]];
                swapped = true;
            };
        };
        n--;
    };
    return arr;
};

function select(arr) {
    for (let i=0; i<arr.length; i++){
        let curMaxId = i;
        for (let j=i; j<arr.length; j++){
            if (arr[j]>arr[curMaxId]) curMaxId = j;
        };
        [arr[i],arr[curMaxId]] = [arr[curMaxId],arr[i]];
    };
    return arr;
};

function insert(arr) {
    for (let i=0; i<arr.length-1; i++){
        let curId = i+1;
        while (arr[curId]>arr[curId-1] && curId>0){
            [arr[curId], arr[curId-1]] = [arr[curId-1], arr[curId]];
            curId--;
        };
    };
    return arr;
};

function merge(arr) {
    function subMerge(left, right){
        let i=0, j=0;
        let res = [];
        while (i<left.length && j<right.length){
            left[i]>right[j] ? res.push(left[i++]) : res.push(right[j++]);
        };
        return res.concat(left.slice(i)).concat(right.slice(j));
    };
    if (arr.length<=1) return arr;
    let mid = Math.floor(arr.length/2);
    let left = merge(arr.slice(0,mid));
    let right = merge(arr.slice(mid));
    return subMerge(left, right);
};

function quick(arr) {
    if (arr.length<=1) return arr;
    let mid = Math.floor(arr.length/2);
    let p = arr.splice(mid,1)[0];
    let left = [];
    let right = [];
    for (let i=0; i<arr.length; i++){
        arr[i]>p ? left.push(arr[i]) : right.push(arr[i]);
    };
    return [...quick(left), p, ...quick(right)];
};

const testArr = [28, 23, 78, 1, 3, 4, 8, 92, 11, 36, 44];
console.log(bubble([...testArr]));
console.log(select([...testArr]));
console.log(insert([...testArr]));
console.log(merge([...testArr]));
console.log(quick([...testArr]));