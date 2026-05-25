/* Instructions

Create a function getAction that takes a string representing a user role and returns
an action for the user. Use a switch statement with complex conditions to 
handle multiple roles.  

Test the function with different roles
console.log(getAction("admin")); // Output: Manage users and settings
console.log(getAction("editor")); // Output: Edit content
console.log(getAction("viewer")); // Output: View content
console.log(getAction("guest")); // Output: Limited access
console.log(getAction("unknown")); // Output: Invalid role
// */

function getAction(value: string){
    switch (value) {
        case 'admin':
            console.log(`${value}: manage users and settings`);
            break;
        case 'editor':
            console.log(`${value}: edit content`);
            break;
        case 'viewer':
            console.log(`${value}: view content`);
            break;
        case 'guest':
            console.log(`${value}: limited access`);
            break;
        case 'unknown':
            console.log(`${value}: invalid role`);
        };
    };

getAction('admin');
getAction('editor');
getAction('viewer');
getAction('guest');
getAction('unknown');

