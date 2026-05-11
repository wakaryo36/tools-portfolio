// --------------------
// 1. HTMLの部品を取得する
// --------------------

// チェックボックスを全部取る
const items = document.querySelectorAll(".item");

// 数量入力欄を全部取る
const quantities = document.querySelectorAll(".quantity");

// 値引き入力欄
const discountInput = document.getElementById("discount");

// 内訳を表示する場所
const breakdownList = document.getElementById("breakdownList");

// 計算結果を表示する場所
const subtotal = document.getElementById("subtotal");
const discountAmount = document.getElementById("discountAmount");
const discountedSubtotal = document.getElementById("discountedSubtotal");
const tax = document.getElementById("tax");
const total = document.getElementById("total");

// 備考欄、見積もり文、コピーボタン
const note = document.getElementById("note");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");


// --------------------
// 2. 合計を計算する関数
// --------------------
function calculateTotal() {
    // 小計を入れる箱
    let sum = 0;

    // 内訳をいったん空にする
    breakdownList.innerHTML = "";

    // 各項目を1つずつ見る
    items.forEach(function(item, index) {
        // チェックされている項目だけ計算する
        if (item.checked) {
            // 項目名
            const name = item.dataset.name;

            // 単価
            const price = Number(item.dataset.price);

            // 数量
            const quantity = Number(quantities[index].value);

            // この項目の小計
            const itemTotal = price * quantity;

            // 全体の小計に足す
            sum = sum + itemTotal;

            // 内訳1行を作る
            const li = document.createElement("li");
            li.textContent =
                name + "："
                + price.toLocaleString() + "円 × "
                + quantity + " = "
                + itemTotal.toLocaleString() + "円";

            // 内訳リストに追加する
            breakdownList.appendChild(li);
        }
    });

    // 値引き額を取得する
    let discount = Number(discountInput.value);

    // 値引き額が小計より大きい場合は、小計と同じ金額にする
    if (discount > sum) {
        discount = sum;
        discountInput.value = sum;
    }

    // 値引き後小計
    const afterDiscount = sum - discount;

    // 消費税（10%）
    const taxAmount = Math.floor(afterDiscount * 0.1);

    // 最終合計
    const finalTotal = afterDiscount + taxAmount;

    // 画面に表示する
    subtotal.textContent = sum.toLocaleString();
    discountAmount.textContent = discount.toLocaleString();
    discountedSubtotal.textContent = afterDiscount.toLocaleString();
    tax.textContent = taxAmount.toLocaleString();
    total.textContent = finalTotal.toLocaleString();

    // 見積もり文も更新する
    generateText();
}


// --------------------
// 3. 見積もり文を作る関数
// --------------------
function generateText() {
    // 最初の文章
    let text = "見積もり内容\n\n";

    // チェックされた項目だけ文章に入れる
    items.forEach(function(item, index) {
        if (item.checked) {
            const name = item.dataset.name;
            const price = Number(item.dataset.price);
            const quantity = Number(quantities[index].value);
            const itemTotal = price * quantity;

            text +=
                "・" + name
                + "：" + price.toLocaleString() + "円 × "
                + quantity + " = "
                + itemTotal.toLocaleString() + "円\n";
        }
    });

    // 合計まわりを追加
    text += "\n";
    text += "小計：" + subtotal.textContent + "円\n";
    text += "値引き：" + discountAmount.textContent + "円\n";
    text += "値引き後小計：" + discountedSubtotal.textContent + "円\n";
    text += "消費税：" + tax.textContent + "円\n";
    text += "合計：" + total.textContent + "円\n\n";

    // 備考を追加
    text += "備考：\n" + note.value;

    // textareaに表示
    output.value = text;
}

// --------------------
// 4. イベントを設定する
// --------------------

// チェックが変わったら再計算
items.forEach(function(item) {
    item.addEventListener("change", calculateTotal);
});

// 数量が変わったら再計算
quantities.forEach(function(quantity) {
    quantity.addEventListener("input", calculateTotal);
});

// 値引きが変わったら再計算
discountInput.addEventListener("input", calculateTotal);

// 備考が変わったら見積もり文を更新
note.addEventListener("input", generateText);


// --------------------
// 5. コピー機能
// --------------------
copyBtn.addEventListener("click", async function() {
    try {
        await navigator.clipboard.writeText(output.value);
        alert("コピーしました！");
    } catch (error) {
        alert("コピーに失敗しました");
    }
});


// --------------------
// 6. 最初に1回実行する
// --------------------
calculateTotal();