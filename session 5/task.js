class Person {
    #email
    #id
    constructor(name,email,id) 
    {
        this.name=name
        this.setEmail=email
        this.setId=id
    }
    
    get getEmail(){
        console.log(this.#email)    
    }

    set setEmail(email)
    {
        if(typeof email === "string" ){
           this.#email=email
        }
        else{
            console.log("Email must be text ")
        }}

    get getId(){
        console.log(this.#id)
    }
    set setId(id){
        if(typeof id ==="number" ){
            this.#id=id
        }
    else{
        console.log("ID must be numbers")
    }}
}

class Principal extends Person 
{

   constructor(name,email,id) {
    super(name,email,id)
    this.student=[]
    }

    addMems(Person){
        this.student.push(Person)
        return `${Person.name} added to school`
        }

    remMems(Person){
        this.student.pop(Person)
        return`${Person.name} removed from school`
    }
}
class Teacher extends Person
{
    constructor(name,email,id,subject) {
        super(name,email,id)
        this.subject=subject
        this.grades={}
        }
        gradeStudents(studName,grade){
        this.grades[studName]=grade
        return `${studName} grade is ${grade}`
        }
}
class students extends Person 
{
    constructor(name,email,id){
        super(name,email,id)
        this.subjects=[]
    }

    enroll(subjectName){
        this.subjects.push(subjectName)
        return`${this.name} enrolled in ${subjectName}`
    }

}
    let prin = new Principal("mostafa","mos@.com",1324)
    let stud1 = new students("ali","sdd@.com",1114)    
    let tech1= new Teacher ("3esam","essam@.com",1010,"math")


    console.log(prin)
    console.log(stud1)
    console.log(tech1)
