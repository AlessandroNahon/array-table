//input
const arr1 = [
  ["name", "id", "age", "weight", "isCool"],
  ["Susan", "3", "20", "120", true],
  ["John", "1", "21", "150", true],
  ["Bob", "2", "23", "90", false],
  ["Ben", "4", "20", "100", true],
]

const arr2 = [
  ["name", "id", "height"],
  ["Bob", "2", "50"],
  ["John", "1", "45"],
  ["Ben", "4", "43"],
  ["Susan", "3", "48"]
]

const arr3 = [
  ["name", "id", "parent"],
  ["Bob", "2", true],
  ["John", "1", true]
]

//parses matrix (user table) into array of user objects
function parseArray(arr) {
  const cats = arr[0]
  const users =  arr.reduce((acc, item, index)=> {
    if (index > 0) {
      const objArr = cats.map((cat, i) => ({[`${cat}`]: item[i]}))
      const user = objArr.reduce(
        (obj, item) => Object.assign(obj, item), {})
  
      return acc[item] = [user],acc
    }
    return acc
  },{})

  return Object.values(users).flat()
}

// We take advantage of the 2nd argument of the filter method
// which gives us context to the filter's callback function.
// We use the "this" context as a mechanism to store cached objects by their id
// and then use "this" to decide whether to retain these objects from the array or not.
function merge(arr) {
  return arr.filter(function(u) {
    return this[u.id]?
      !Object.assign(this[u.id], u):
      (this[u.id] = u)
  }, {})
}

//parse table and create user objects
const a1 = parseArray(arr1)
const a2 = parseArray(arr2)
const a3 = parseArray(arr3)

//merge tables
const users = merge([...a1, ...a2, ...a3])

//display
const body = document.querySelector('body')

function createP (prop, type) {
  const el = document.createElement("p")
  const val = document.createTextNode(`${type}: ${prop}`)
  el.appendChild(val)
  return el
}

users.forEach(u => {
  body.appendChild(createP(u.name, "name"))
  body.appendChild(createP(u.age, "age"))
  body.appendChild(createP(u.isCool, "isCool"))
  body.appendChild(createP(u.weight, "weight"))
})




