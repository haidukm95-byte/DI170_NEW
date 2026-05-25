/*
Instructions

    Get an Element from the DOM:

    Use document.getElementById() to retrieve an HTML element from the DOM.

    Use Type Assertion:

    Apply a type assertion to cast the element to a specific HTML element type, such as HTMLInputElement.

    Access the Element’s Properties:

    Once cast, use the properties of the specific element type, like setting the value of an input element.

    Test the Functionality:
    Ensure that you can successfully set or manipulate a property of the element.

Additional Notes:

    Type assertions are a powerful way to let TypeScript know more about the type of an element when you’re certain of it. However, you should use them cautiously, as incorrect assertions can lead to runtime errors if the type is not as expected.
 */
const textInput = document.getElementById('text_input');
const buttonAdd = document.querySelector('.add_input');
buttonAdd?.addEventListener('click', () => {
    const newSpan = document.createElement('span');
    const newParagraph = document.createElement('p');
    const newRemove = document.createElement('button');
    newSpan.className = 'text_sample_span';
    newParagraph.className = 'text_sample';
    newRemove.className = 'remove_input';
    newRemove.innerText = 'Remove';
    newParagraph.innerText = textInput.value;
    newSpan.appendChild(newParagraph);
    newSpan.appendChild(newRemove);
    document.body.appendChild(newSpan);
    newRemove.addEventListener('click', () => {
        document.body.removeChild(newSpan);
    });
});
export {};
//# sourceMappingURL=Ex7.js.map