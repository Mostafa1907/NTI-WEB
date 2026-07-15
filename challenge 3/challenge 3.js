let name=prompt("Enter UR NAME")
let attendPerc=Number(prompt("ENTER UR ATTENDANCE PERCENTAGE"))
let midscore=Number(prompt("ENTER UR MIDTERM SCORE"))
let finalscore=Number(prompt("ENTER UR FINAL SCORE "))
let assignscore=Number(prompt("ENTER UR ASSIGNMENT"))
let paystat=prompt("UR PAYMENT STATUS ( PAID / UNPAID )")

if(paystat == "unpaid")
{
    alert("U CAN NOT VIEW UR RESULT")
}
else 
{
    let gpa
    let total= midscore + finalscore + assignscore

    if(total>= 92)
    {
        gpa="A"
    }
    else if ( total>=84)
    {
        gpa="B"
    }
    else if(total>=72)
    {
        gpa="C"
    }
    else if(total>=60) 
    {
        gpa="D"
    }
    else
    {
        gpa="F"
    }  
    
    let status
    if(attendPerc < 60 )
    {
        status="Fail"
    }
    else 
    {
        status="PASSED"
    }

    alert
    ("        ======= STUDENT RESULT =======\n\n" +
        "Student Name : " + name +
        "\nAttendance : " + attendPerc + "%" +
        "\nMidterm : " + midscore +
        "\nFinal Exam : " + finalscore +
        "\nAssignment : " + assignscore +
        "\nTotal Score : " + total +
        "\n GPA : " + gpa +
        "\nAcademic Status : " + status
    )



}       