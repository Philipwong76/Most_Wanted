/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eyecolor: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parents: ${person.parents}\n`;
    personInfo += `Currentspouse: ${person.currentSpouse}\n`; 
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

// Find the person's family objective 1 established
function findPersonFamily(person, people){
    let personFamily = `Parents: ${person.parents}\n`;
    personFamily += `Currentspouse: ${person.currentSpouse}\n`;
    personFamily += `Siblings: ${searchForSiblings(person, people)}\n`;


    if (!personFamily[0]) {
        alert("Could not find person's family.");
        return mainMenu(people);
    }
    alert(personFamily);
}

//Start of Family
//Family Traits
// Parent trait
function searchByParents(people){
    return people.filter(function(item){
        return person.parents.includes(item.id)
    });
}

// Siblings trait
function searchForSiblings(person, people){
    let foundSiblings = people.filter(function(item){
        return (
        person.parents.includes(item.parents[0]) || 
        person.parents.includes(item.parents[1])
        );
    });
    return displayPeople(foundSiblings);
}


// Spouse trait
function searchForSpouse(people){
    return people.filter(function(item){
        return person.currentSpouse.includes(item.id)
    })
}

//complete
function searchByTraits(people){
    let numberOfTraits = promptFor("How many traits would you like to search by? (1-5 traits)", chars)
    let searchResults 
    console.log(numberOfTraits)
    switch (numberOfTraits) {
        case '1':
            let trait = promptFor("Which trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait == 'eyecolor' ) {
                searchResults = searchByEye(people);
                break;
            }
            
            if (trait == 'id' ) {
                searchResults = searchById(people);
                break;
            }

            if (trait == 'gender' ) {
                searchResults = searchByGender(people);
                break;
            }

            if (trait == 'weight' ) {
                searchResults = searchByWeight(people);
                break;
            }

            if (trait == 'height' ) {
                searchResults = searchByHeight(people);
                break;
            }

            if (!searchResults[0]) {
                alert("Could not be found by trait.");
                return searchByTraits(people);
            }
            break;
        case "2":
            let trait1 = promptFor("What is the first trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait1 == 'eyecolor' ) {
                searchResults = searchByEye(people);

            }
            
            if (trait1 == 'id' ) {
                searchResults = searchById(people);

            }

            if (trait1 == 'gender' ) {
                searchResults = searchByGender(people);

            }

            if (trait1 == 'weight' ) {
                searchResults = searchByWeight(people);

            }

            if (trait1 == 'height' ) {
                searchResults = searchByHeight(people);

            }

            let trait2 = promptFor("What is the second trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait2 == 'eyecolor' ) {
                searchResults = searchByEye(people);
                break;
            }
            
            if (trait2 == 'id' ) {
                searchResults = searchById(people);
                break;
            }

            if (trait2 == 'gender' ) {
                searchResults = searchByGender(people);
                break;
            }

            if (trait2 == 'weight' ) {
                searchResults = searchByWeight(people);
                break;
            }

            if (trait2 == 'height' ) {
                searchResults = searchByHeight(people);
                break;
            }

            if (!searchResults[0]) {
                alert("Could not be found by trait.");
                return searchByTraits(people);
            }

            break;
        case "3":
            let trait31 = promptFor("What is the first trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait31 == 'eyecolor' ) {
                searchResults = searchByEye(people);

            }
            
            if (trait31 == 'id' ) {
                searchResults = searchById(people);

            }

            if (trait31 == 'gender' ) {
                searchResults = searchByGender(people);

            }

            if (trait31 == 'weight' ) {
                searchResults = searchByWeight(people);

            }

            if (trait31 == 'height' ) {
                searchResults = searchByHeight(people);

            }

            let trait32 = promptFor("What is the second trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait32 == 'eyecolor' ) {
                searchResults = searchByEye(people);
            }
            
            if (trait32 == 'id' ) {
                searchResults = searchById(people);
            }

            if (trait32 == 'gender' ) {
                searchResults = searchByGender(people);
            }

            if (trait32 == 'weight' ) {
                searchResults = searchByWeight(people);
            }

            if (trait32 == 'height' ) {
                searchResults = searchByHeight(people);
            }

            let trait33 = promptFor("What is the third trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait33 == 'eyecolor' ) {
                searchResults = searchByEye(people);
                break;
            }
            
            if (trait33 == 'id' ) {
                searchResults = searchById(people);
                break;
            }

            if (trait33 == 'gender' ) {
                searchResults = searchByGender(people);
                break;
            }

            if (trait33 == 'weight' ) {
                searchResults = searchByWeight(people);
                break;
            }

            if (trait33 == 'height' ) {
                searchResults = searchByHeight(people);
                break;
            }
            if (!searchResults[0]) {
                alert("Could not be found by trait.");
                return searchByTraits(people);
            }

            break;
        case "4":
            let trait41 = promptFor("What is the first trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait41 == 'eyecolor' ) {
                searchResults = searchByEye(people);

            }
            
            if (trait41 == 'id' ) {
                searchResults = searchById(people);

            }

            if (trait41 == 'gender' ) {
                searchResults = searchByGender(people);

            }

            if (trait41 == 'weight' ) {
                searchResults = searchByWeight(people);

            }

            if (trait41 == 'height' ) {
                searchResults = searchByHeight(people);

            }

            let trait42 = promptFor("What is the second trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait42 == 'eyecolor' ) {
                searchResults = searchByEye(people);
            }
            
            if (trait42 == 'id' ) {
                searchResults = searchById(people);
            }

            if (trait42 == 'gender' ) {
                searchResults = searchByGender(people);
            }

            if (trait42 == 'weight' ) {
                searchResults = searchByWeight(people);
            }

            if (trait42 == 'height' ) {
                searchResults = searchByHeight(people);
            }

            let trait43 = promptFor("What is the thrid trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait43 == 'eyecolor' ) {
                searchResults = searchByEye(people);
            }
            
            if (trait43 == 'id' ) {
                searchResults = searchById(people);
            }

            if (trait43 == 'gender' ) {
                searchResults = searchByGender(people);
            }

            if (trait43 == 'weight' ) {
                searchResults = searchByWeight(people);
            }

            if (trait43 == 'height' ) {
                searchResults = searchByHeight(people);
            }

            let trait44 = promptFor("What is the forth trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait44 == 'eyecolor' ) {
                searchResults = searchByEye(people);
                break;
            }
            
            if (trait44 == 'id' ) {
                searchResults = searchById(people);
                break;
            }

            if (trait44 == 'gender' ) {
                searchResults = searchByGender(people);
                break;
            }

            if (trait44 == 'weight' ) {
                searchResults = searchByWeight(people);
                break;
            }

            if (trait44 == 'height' ) {
                searchResults = searchByHeight(people);
                break;
            }
            if (!searchResults[0]) {
                alert("Could not be found by trait.");
                return searchByTraits(people);
            }
            break;
        case "5":
            let trait51 = promptFor("What is the first trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait51 == 'eyecolor' ) {
                searchResults = searchByEye(people);

            }
            
            if (trait51 == 'id' ) {
                searchResults = searchById(people);

            }

            if (trait51 == 'gender' ) {
                searchResults = searchByGender(people);

            }

            if (trait51 == 'weight' ) {
                searchResults = searchByWeight(people);

            }

            if (trait51 == 'height' ) {
                searchResults = searchByHeight(people);

            }

            let trait52 = promptFor("What is the second trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait52 == 'eyecolor' ) {
                searchResults = searchByEye(people);
            }
            
            if (trait52 == 'id' ) {
                searchResults = searchById(people);
            }

            if (trait52 == 'gender' ) {
                searchResults = searchByGender(people);
            }

            if (trait52 == 'weight' ) {
                searchResults = searchByWeight(people);
            }

            if (trait52 == 'height' ) {
                searchResults = searchByHeight(people);
            }

            let trait53 = promptFor("What is the thrid trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait53 == 'eyecolor' ) {
                searchResults = searchByEye(people);
            }
            
            if (trait53 == 'id' ) {
                searchResults = searchById(people);
            }

            if (trait53 == 'gender' ) {
                searchResults = searchByGender(people);
            }

            if (trait53 == 'weight' ) {
                searchResults = searchByWeight(people);
            }

            if (trait53 == 'height' ) {
                searchResults = searchByHeight(people);
            }

            let trait54 = promptFor("What is the forth trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait54 == 'eyecolor' ) {
                searchResults = searchByEye(people);
            }
            
            if (trait54 == 'id' ) {
                searchResults = searchById(people);
            }

            if (trait54 == 'gender' ) {
                searchResults = searchByGender(people);
            }

            if (trait54 == 'weight' ) {
                searchResults = searchByWeight(people);
            }

            if (trait54 == 'height' ) {
                searchResults = searchByHeight(people);
            }

            let trait55 = promptFor("What is the fifth trait would you like to search by? \n 'eyecolor' \n 'id' \n 'gender \n 'weight' \n 'height' " , chars)
            if (trait55 == 'eyecolor' ) {
                searchResults = searchByEye(people);
                break;
            }
            
            if (trait55 == 'id' ) {
                searchResults = searchById(people);
                break;
            }

            if (trait55 == 'gender' ) {
                searchResults = searchByGender(people);
                break;
            }

            if (trait55 == 'weight' ) {
                searchResults = searchByWeight(people);
                break;
            }

            if (trait55 == 'height' ) {
                searchResults = searchByHeight(people);
                break;
            }
            if (!searchResults[0]) {
                alert("Could not be found by trait.");
                return searchByTraits(people);
            }
            break;
        default:
            app(people);
            break;
    }
    return searchResults
}

// trait function

// ID trait
function searchById(people){
    let userInputID = parseInt(promptFor("Do you know the peron's id number?",chars))

    return people.filter(function(elementOfArrayOfPeople){
        if (elementOfArrayOfPeople.id == userInputID){
            return elementOfArrayOfPeople
        }
    })
}

// Eye color Trait
function searchByEye(people){
    let eyeColor = promptFor('What eye color would you like to select? \n "green" \n "brown" \n "blue" \n "hazel" ',chars)
    return people.filter(function(person){return (person.eyeColor.includes(eyeColor))})
}

// Gender trait
function searchByGender(people){
    let gender = promptFor('What gender would you like to select? \n "male" or "female".',chars)
    return people.filter(function(person){return (person.gender.includes(gender))})
}

// Eye color Trait
function searchByEye(people){
    let eyeColor = promptFor('What eye color would you like to select? \n "green" \n "brown" \n "blue" \n "hazel" ',chars)
    return people.filter(function(person){return (person.eyeColor.includes(eyeColor))})
}

// Height trait
function searchByHeight(people){
    let userInputID2 = parseInt(promptFor("Do you know the person's height?",chars))

    return people.filter(function(peopleArray1){
        if (peopleArray1.height == userInputID2){
            return peopleArray1
        }
    })
}

// Weight trait
function searchByWeight(people){
    let userInputID3 = parseInt(promptFor("Do you know the person's height?",chars))

    return people.filter(function(peopleArray2){
        if (peopleArray2.weight == userInputID3){
            return peopleArray2
        }
    })
}

//End of physical attribute traits

function findPersonDescendants(person , people) {
    let foundDescendants = people.filter(function (item) {
        if (item.parents.includes(person.id)) {
            return true;
        }
    });
    displayPeople(foundDescendants);
}