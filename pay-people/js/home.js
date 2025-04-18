let loggedInUserDetails = {};
// let walletBalance = 5000;
let walletBalance = 1500000;
let sumOfTransactionAmount = 0;
let transactionList = [];
function calculateWalletAmount() {
    let transactionList = JSON.parse(localStorage.getItem("transactionList"));
    if (transactionList && transactionList.length > 0) {
        transactionList.forEach((eachTransaction) => {
            sumOfTransactionAmount = sumOfTransactionAmount + Number(eachTransaction.amount);
        });
    }
    let latestWalletBalance = (walletBalance - sumOfTransactionAmount.toFixed(2));
    latestWalletBalance = latestWalletBalance.toFixed(2);
    localStorage.setItem("walletBalance", JSON.stringify(latestWalletBalance));
    let currentBalance = numberWithCommas(latestWalletBalance);
    document.getElementById("walletBalance").innerHTML = latestWalletBalance < 0 ? 0 : currentBalance;

}

function getUserName() {
    loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUserDetails && loggedInUserDetails.name) {
        document.getElementById("username").innerHTML = loggedInUserDetails.name;
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getTransactionList() {
    transactionList = JSON.parse(localStorage.getItem("transactionList"));
    const tableBody = document.querySelector('#transactionTable tbody');
    if (transactionList && transactionList.length > 0) {
        transactionList.forEach((eachTransaction, index) => {
            const row = document.createElement('tr');

            //Sl No Cell
            const serialNoCell = document.createElement('td');
            serialNoCell.textContent = index + 1;
            row.appendChild(serialNoCell);

            //Email
            const paidToCell = document.createElement('td');
            paidToCell.textContent = eachTransaction.toEmail;
            row.appendChild(paidToCell);

            //Amount Cell
            const amountCell = document.createElement('td');
            amountCell.textContent = eachTransaction.amount;
            let amountInRs = amountCell.textContent
            amountCell.innerHTML = "₹" + amountInRs;
            row.appendChild(amountCell);

            //Status Cell
            const paymentStatusCell = document.createElement('td');
            paymentStatusCell.textContent = eachTransaction.paymentStatus;
            row.appendChild(paymentStatusCell);

            //Date Cell
            const dateCell = document.createElement('td');
            dateCell.textContent = eachTransaction.date;
            row.appendChild(dateCell);

            tableBody.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
        //No Record Found
        const serialNoCell = document.createElement('td');
        serialNoCell.setAttribute("colspan", "5");
        serialNoCell.textContent = "No Record Found!";
        row.appendChild(serialNoCell);

        tableBody.appendChild(row);
    }
}
getUserName();
calculateWalletAmount();
getTransactionList();