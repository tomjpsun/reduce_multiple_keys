function DataSrc() {
    fetch('http://localhost:3000/transaction/')
        .then((resp) => resp.json())
        .then((data) => {
            const result = data.data.reduce((accumulator, currentValue, index) => {
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
            console.log('result = ', data.data)
        })

}

function DataDisplay() {
    return (
        <p> DataDisplay </p>
    )
}

export { DataDisplay, DataSrc }