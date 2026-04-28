var arr = [
    {
        userName: "Test",
        lastName: "Test",
        email: "test.test@gmail.com"
    },
    {
        userName: "Dmitro",
        lastName: "Porohov",
        email: "dmitro.porohov@yahoo.com"
    },
    {
        userName: "Andrii",
        lastName: "",
        email: "andrii@mail.ru"
    },
];

// Регулярное вырожение :
// ^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)? - одно или два слова  (разделеные точкой ) 
// @(gmail\.com|yahoo\.com)$ - разрешенные домены  gmail.com и yahoo.com
var emailPattern = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?@(gmail\.com|yahoo\.com)$/;

var trustedEmails = [];

for (var i = 0; i < arr.length; i++) {
    if (emailPattern.test(arr[i].email)) {
        trustedEmails.push(arr[i].email);
    }
}

console.log(trustedEmails);
