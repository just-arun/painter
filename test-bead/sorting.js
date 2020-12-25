let arr = [];
let sortedArr = [];

let oC = (itm, key) =>
  typeof itm == "object" ?
  itm[key] : itm;

const benchMark = (name, cb) => {
  console.log(`\n[${name}] start ********************`);
  let start = Date.now();
  console.log("[start]", start);
  cb();
  let end = Date.now();
  console.log("[end]", end)
  console.log("[time taken]", end - start);
  console.log(`[${name}] end ********************\n`);
}

const populate = () => {
  benchMark("populate", () => {
    for (let i = 0, count = 9999999; i < count; i++) {
      let id = Math.floor(Math.random() * count);
      let name = `name-${id}`;
      arr.push({
        id,
        name
      });
    }
  });
  arr = [...new Set(arr)]
  //   console.log(arr);
}


const defaultSort = () => {
  benchMark("default sort", () => {
    let sorted = arr.sort((a, b) => oC(a, 'id') > oC(b, 'id') ? 1 : -1);
  });
}

const swap = (items, leftIndex, rightIndex) => {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

const partition = (items, left, right, key) => {
  var pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;


  while (i <= j) {
    while (oC(items[i], key) < oC(pivot, key)) {
      i++;
    }
    while (oC(items[j], key) > oC(pivot, key)) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

const quickSort = (items, left, right, key) => {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, key);
    if (left < index - 1) {
      quickSort(items, left, index - 1, key);
    }
    if (index < right) {
      quickSort(items, index, right, key);
    }
  }
  return items;
}

const quickSortFun = () => {
  benchMark("quickSort", () => {
    sortedArr = quickSort(arr, 0, arr.length - 1, "id");
  })
}

const binarySearch = (array, target, key) => {

  let startIndex = 0;
  let endIndex = array.length - 1;

  while (startIndex <= endIndex) {

    let middleIndex = Math.floor((startIndex + endIndex) / 2);

    if (target === oC(array[middleIndex], key)) {
      //   return console.log("Target was found at index " + middleIndex);
      return middleIndex;
    }

    if (target > oC(array[middleIndex], key)) {
      startIndex = middleIndex + 1;
    }

    if (target < oC(array[middleIndex], key)) {
      endIndex = middleIndex - 1;
    }
  }

  return null;
}

const normalFilter = () => {
  benchMark("normal find", () => {
    let findEle = sortedArr[sortedArr.length / 2].id;
    let value = sortedArr.find((res) => {
      if (res.id == findEle) {
        return res;
      }
    });
    // console.log(value);
  })
}

const findingElement = () => {
  benchMark("finding element", () => {
    let findEle = sortedArr[sortedArr.length / 2].id;
    console.log("findingElement", findEle);
    let indx = binarySearch(sortedArr, findEle, "id");
    if (indx != null) {
      console.log(indx, sortedArr[indx]);
    } else {
      console.log("not found", indx);
    }
  })
}

populate();

defaultSort();

quickSortFun();

// normalFilter();

// findingElement();
