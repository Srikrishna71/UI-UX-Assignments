// i
let a = parseFloat(prompt("Enter first number:"))
let b = parseFloat(prompt("Enter second number:"))
alert("Sum: " + (a+b) + "Difference: " + (a-b) + "Product: " + (a*b) + "Quotient: " + (a/b))

// ii
let arr = [12, 5, 34, 7, 19]
let largest = Math.max(...arr)
let smallest = Math.min(...arr)
console.log("Largest:", largest)
console.log("Smallest:", smallest)
console.log("Ascending:", [...arr].sort((x,y)=>x-y))
console.log("Descending:", [...arr].sort((x,y)=>y-x))

// iii
function validateForm(){
  let name=document.getElementById("name").value
  let email=document.getElementById("email").value
  let age=parseInt(document.getElementById("age").value)
  let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(name===""){alert("Name is required");return false}
  if(!emailPattern.test(email)){alert("Invalid email");return false}
  if(isNaN(age)||age<18||age>100){alert("Age must be between 18 and 100");return false}
  alert("Form is valid");return true
}

// iv
let student={name:"abc",age:27,grades:"A"}
student.class="12th"
student.grades="A+"
for(let key in student){console.log(key+":",student[key])}

// v
function processArray(arr){
  return arr.filter(x=>x%2===0).map(x=>x*2).reduce((sum,x)=>sum+x,0)
}
console.log(processArray([1,2,3,4,5,6]))
