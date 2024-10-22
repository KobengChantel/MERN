// // const a = "1";
// // console.log("aaa", a);
// // 02 defining variables
// // //using const we cant assign another value
// // const hello = "world";
// // // using let
// // // let hello = "world";
// // let hello: String= "world";
// // //we cahnge value only to the same type e.g string
// // hello = "foo";
// // //03 FUNCTIONS
// // const getFullName = (name: string, surname: string) => {
// //   return name + "" + surname;
// // };
// // console.log(getFullName("Monster", "lessons"));
// //04interfaces special entity in ts to help us create object
// //allproperties in interface are mandatory
// //creating objects
// //I = interface
// interface UserInterface{
//   name: string;
//   //agenot mandotary
//   age?: number;
//   getMessage(): string
// }
// const UserInterface= {
//   name: 'Monster',
//   age: 30,
//   getMessage() {
//     return "hello" + name;
//   },
// };
// const user2Interface = {
//   name: "Jack",
//   getMessage() {
//     return "hello" + name;
//   },
// };
// // helps in typo
// // console.log(user.nameee)
// console.log(use.getMessage());
//05 TYPES AND UNIONS
