let pin = "1234"
let balance = 20000
let operation
let deposite
let withdraw
let at
let newpin
while (at = 6) {

    let enteredpin = prompt("ENTER UR PIN")
    if (enteredpin !== pin) {
        alert("PIN IS INCORRECT")
    }
    else {



        let choose = prompt("1-withdraw -- 2-deposit money -- 3-check balance -- 4-change pin ")
        switch (Number(choose)) 
        {
            case 1:
                let withdraw = Number(prompt("ENTER MONEY YOU NEED"))

                if (withdraw <= 0) {
                    alert("invalid")
                }
                else if (withdraw > balance) {
                    alert("insufficient balance")
                }
                else {
                    balance -= withdraw
                    alert("ً Withdraw succesful \n " + "Withdraw : " + withdraw + "  Remain Balance : " + balance)

                }

                break;
            case 2:
                let deposite = Number(prompt("Enter amount to deposit:"));

                if (deposite > 0) {
                    balance = balance + deposite;
                    alert("Deposit Successful");
                    alert("Current Balance = " + balance);
                } else {
                    alert("Deposit amount must be greater than zero.");
                }
                alert("withdraw succesful \n" + "withdraw : " + withdraw + "remain balance :" + balance)
                break;

            case 3:

                alert("Your balance is: " + balance);
                console.log(balance);
                break;

            case 4:
                let newpin =prompt("Enter New Pin")
                pin = newpin
                alert("your password has been changed successfully")
                break;

        }

    }
}
