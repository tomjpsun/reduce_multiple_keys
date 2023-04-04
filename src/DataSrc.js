/*這是一個用來將 JavaScript 陣列中的物件，根據指定的屬性值進行去重的函式。

首先，將這個函式定義為一個常數 arrayUniqueByKey。該函式使用了一個 map() 方法來對原陣列 array 中的每個物件進行處理。

這個 map() 方法的參數是一個箭頭函式 (item => [item[key], item])，其中 key 是一個變數，表示要根據哪個屬性值進行去重。對於陣列中的每個物件 item，這個箭頭函式都會將其轉換為一個新的陣列，該陣列包含兩個元素：item[key] 和 item。

接下來，這個 map() 方法會返回一個新的陣列，該陣列包含了原始陣列中的每個物件，轉換為上述格式後得到的新陣列。這個新陣列中，每個元素都是一個包含兩個值的子陣列，第一個值是要進行去重的屬性值，第二個值是原始的物件。

接著，這個新陣列會被傳遞給一個 Map() 的建構子，用來建立一個新的 Map 物件。Map 是一個內建的 JavaScript 類別，用來存儲鍵值對。在這裡，我們使用陣列中的第一個元素作為鍵，第二個元素作為值，來建立一個新的 Map 物件。

接著，我們調用了 Map 的 values() 方法，以獲取 Map 物件中的所有值，並將它們轉換為一個陣列。這個新的陣列包含了所有不重複的物件。

最後，使用 ES6 中的展開運算符 ...，將這個包含不重複物件的陣列展開成一個新的陣列，並賦值給 arrayUniqueByKey 常數。

綜上所述，這個 JavaScript 片段的作用是將一個陣列中的物件根據指定的屬性值進行去重，並返回一個包含不重複物件的新陣列。*/

function DataSrc() {
    fetch('http://localhost:3000/transaction/')
        .then((resp) => resp.json())
        .then((data) => {
            const records = data.data
            /* if ITEM_ID === n, result[n] will be the sum, or
               NoDefine if n is not a valid ITEM_ID
            */
            const result = records.reduce((accumulator, currentValue, index) => {
                const itemId = currentValue.ITEM_ID
                if (!accumulator[itemId]) {
                    accumulator[itemId] = 0
                }
                if (currentValue.TYPE === 1501) {
                    accumulator[itemId] += currentValue.QUANTITY
                } else if (currentValue.TYPE === 2301) {
                    accumulator[itemId] -= currentValue.QUANTITY
                }
                return accumulator
            }, {})

            const key = 'ITEM_ID';

            const arrayUniqueByKey = [...new Map(
                records.map(item => [item[key], item])
            ).values()];
            // replace the sum with the QUANTITY from the unique array 
            arrayUniqueByKey.map(e => e.QUANTITY = result[e.ITEM_ID])
            console.log(arrayUniqueByKey);
        })

}

export default DataSrc