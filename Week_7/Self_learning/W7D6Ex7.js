//The point of this challenge is to display a list of two books on your browser.
//In the body of the HTML page, create an empty section:
// <section class="listBooks"></section>
// In the js file, create an array called allBooks. This is an array of objects. 
//      Each object is a book that has 4 keys (ie. 4 properties) :
    //   title,
    //   author,
    //   image : a url,
    //   alreadyRead : which is a boolean (true or false).

//Initiate the array with 2 books of your choice (ie. Add manually 2 books objects in the array)
let allBooks=[
    {
        title: 'The Red Century',
        author: 'Myroslav Popovych',
        image: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/1/8/1836_3.jpg',
        alreadyRead: true
    },
    {
        title: 'The Weapon of the Revenge',
        author: 'Oleg Divov',
        image: 'https://s1.livelib.ru/boocover/1000360026/o/f72b/Oleg_Divov__Oruzhie_Vozmezdiya.jpeg',
        alreadyRead: false
    }
]
    //Requirements : All the instructions below need to be coded in the js 
    //  file:
      //  Using the DOM, render each book inside a div (the div must be
      //     added to the <section> created in part 1).
    const section=document.querySelector('.listBooks');
    
    const title=document.createElement('p');
    
    for (let i=0; i<allBooks.length; i++) {
        const div = document.createElement('div');
        div.id = 'bookslist';
        const title = document.createElement('p');
        title.innerText = `${allBooks[i].title}, written by ${allBooks[i].author}`;
        const image = document.createElement('img');
        image.src = allBooks[i].image;
        image.style.width = '100px';
        div.appendChild(title);
        div.appendChild(image);
        section.appendChild(div);
        if (allBooks[i].alreadyRead===true){
            title.style.backgroundColor='red'
        }
    }


      //  For each book :
        //    You have to display the book’s title and the book’s author.
        //    Example: HarryPotter written by JKRolling.
        //    The width of the image has to be set to 100px.
        //   If the book is already read. Set the color of the book’s details to red.



