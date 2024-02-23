function displayExpenses() {
    fetch('../page/json/test.json') // JSON 파일의 경로를 전달합니다.
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // 응답을 JSON으로 파싱합니다.
        })
        .then(data => {
            // JSON 데이터를 사용하여 HTML에 표시하는 코드
            const expensesContainer = document.getElementById('expenses');
            data.forEach(expense => {
                const expenseElement = document.createElement('div');
                expenseElement.classList.add('expense');
                expenseElement.innerHTML = `
                <div class="main_object" style="height: 100%; width: 200px; margin-right: 20px; ">
                    <div>
                    <p>Date: ${expense.date}</p>
                    <p>name: ${expense.name}</p>
                    <p>category: ${expense.category}</p>
                    <p>brand: ${expense.brand}</p>
                    <p>Price: ${expense.price}</p>
                </div>
                </div>
                `;
                expensesContainer.appendChild(expenseElement);
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// displayExpenses() 함수를 호출하여 실행합니다.
displayExpenses();