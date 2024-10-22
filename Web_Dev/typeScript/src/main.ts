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

// //05 TYPES AND UNIONS
// //union operator
// interface UserInterface {
//   name: string
//   surname: string
// }
// let username: string = "alex";

// let pagename: string | number = "1";

// let errorMessage: string | null = null;

// let user: UserInterface | null = null;

// let someProp: string | number | null | undefined | string[] | object

// //TypeAlliases is when we have basic typescript by default and we can create our own and use it every where
// type ID = string;
// type PopularTag= string;

// interface UserInterface {
//   id: ID;
//   name: string;
//   surname: string;
// }
// //const popularTags: string[] = ['dragon', 'coffee'];
// const popularTags: PopularTag[]= ['dragon', 'coffee'];

// let username: string = "alex";

// let pagename: string | number = "1";

// let errorMessage: string | null = null;

// let user: UserInterface | null = null;

// let someProp: string | number | null | undefined | string[] | object

// ///unions and typealliases
// type ID = string;
// type PopularTag= string;
// type MaybePopularTag = string | null

// interface UserInterface {
//   id: ID;
//   name: string;
//   surname: string;
// }
// const dragonsTags: MaybePopularTag= "dragon";

// //const popularTags: string[] = ['dragon', 'coffee'];
// const popularTags: PopularTag[]= ['dragon', 'coffee'];

// let username: string = "alex";

// let pagename: string | number = "1";

// let errorMessage: string | null = null;

// let user: UserInterface | null = null;

// let someProp: string | number | null | undefined | string[] | object

///06 Any Void Unknown
// VOID is when we return nothing
// const doSomething = (): void => {
//   console.log("doSomething");
//   // return 1;
// };

// const foo: void= undefined;

// ///Any in type script
// // any type turns off typescript check
// const doSomething = (): void => {
//   console.log("doSomething");
//   // return 1;
// };

// const foo: any= "foo";
// console.log(foo.bar());

//never in typescript
// any type turns off typescript check
// function that will never happen or ends
// const doSomething = (): never => {
// throw "never";
// };

//type unknwon
// let vAny: any = 10;
// let vUnknown: unknown = 10;
// let s1: string = vAny;
// let s2: string = vUnknown;

//bonus regarding typesession
//"as" operator makes type session
// let vAny: any = 10;
// let vUnknown: unknown = 10;
// let s1: string = vAny;
// let s2: string = vUnknown as string;

// let pageNumber: string = "1";
// let numericpagenumber: number = (pageNumber as uknown) as number;
// console.log(vAny.foo());
// console.log(vUnknown.foo());
//HIGHLY RECOMMENDED TO USE UNKNOWN AND VOID

//07 WORKING WITH 
// typescript doesnt know about markup
// const someElement = document.querySelector(".foo") as HTMLInputElement;
// console.log('someElement', someElement.value)

//adding listener
// const someElement = document.querySelector(".foo");

// someElement.addEventListener('blur', (event) => {
// const target = event.target as HTMLInputElement
//   console.log('event', .target.value)
// })

//08 CREATIING CLASSES IN TYPESCRIPT

//working with clases
// they are sugar round prototypes
//public, 
// private(can only be used inside the class), 
//protected( is protected and only accessible within class 'User' and its subclasses)
// impllementing interface
// static propeerty are only accessble on the class

// interface UserInterface {
// getFullName(): string;
// }

// class User implements UserInterface{
//   // private firstName: string
//   // private lastName: string

// //protected firstName: string
//  firstName: string
//  lastName: string
// readonly unchangableName: string
// static readonly maxAge = 50;

//   constructor(firstName: string, lastName: string)
//   {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.unchangableName = firstName;
//   }

// changeUnchangableName(): void{
//   //this.unchangableName = "foo";
// }

//   getFullName():string {
//     return this.firstName + " "
// + this.lastName;
//   }
// }

// class Admin extends User {
// private editor: string;

// setEditor(editor: string): void {
//   this.editor = editor
// }
// getEditor(): string;
// return this.editor;
// }

// const user = new User("Monster", "lessons");
// console.log(user.firstName);
// console.log(User.maxAge);

// const admin = new Admin('foo','bat');
// console.log(admin.firstName)

//09 GENERICS IN TYPESCRIPT with interfaces and functions
//all generic datatypes sre writen inside "<>"
//explicit declaration are easier to read
//generic allows us to have different data types
//we can pass data typez
// append returns a new array

// const updateArray = append<string>('baz',['foo', 'bar'])

// const addId = <T>(obj: T) => {
//   const id= Math.random().toString(16);
//   return{
//     ...obj,
//     id,
//   };
// };

// interface UserInterface{
//   name: string;
//   data: TemplateStringsArray;
// }

// const user : UserInterface<{meta: string }> = {
//   name: "jack",
//   data: {
//     meta: "foo",
//   },
// };

// const user2: UserInterface<string[]
// > = {
//   name:'John',
//   data: ["foo","bar","baz"],
// };
// const result = addId<UserInterface>(user);
// console.log("result", result);

//enumus in typescript
//enumus is enumerable//capital letter is the code style
// numbers are increameted from ero
//values are with = sign
//enum inside interface


// const statuses = {
//   noStarted: 0,
//   inProgress:1,
//   done: 2,
// };
// console.log(statuses.inProgress);

enum Status {
  NotStarted = "notStarted",
  InProgress = "inProgress",
  Done = "done",
}

interface Task{
  id: string;
  status: Status;
}
let notStartedStatus: Status = Status.NotStarted;
notStartedStatus = Status.Done;
console.log(Status.InProgress);