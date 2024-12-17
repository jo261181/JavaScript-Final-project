'use strict';

const mockData = require('./mockData.js').data;
const prompt = require('prompt-sync')();

// Your code here

let QuestionUserToFindAMatch = prompt("Please; give a correct answer to the following questions to find your perfect match! Press Enter to begin.\n");

let profileUser = {}
profileUser.Name = prompt("What is your first name? ").trim();
profileUser.last_name = prompt("What is your last name? ").trim();
profileUser.age = prompt("What is your age? ").trim();
profileUser.gender = prompt("What is your gender? M/F/X ").toUpperCase().trim();
profileUser.gender_interest = prompt("Which gender are you most interested in? ").toUpperCase().trim();
profileUser.location = prompt("Rural / City? ").toLowerCase().trim();
profileUser.min_age_interest = prompt("What is the minimal age that you would like to date? ").trim();
profileUser.max_age_interest = prompt("What is the maximal age that you would like to date? ").trim()


// naam
while (!profileUser.Name || profileUser.Name.trim() === " ") {
    profileUser.Name = prompt("What is your first name? (Please enter a valid name)");
}

// achternaam
while (!profileUser.last_name || profileUser.last_name.trim() === " ") {
    profileUser.last_name = prompt("What is your last name? (Please enter a valid name)");
}

// leeftijd
let validAge = Number(profileUser.age);
while (isNaN(validAge) || validAge < 18 || profileUser.age.trim() === "") {
    if (profileUser.age.trim() === "") {
        profileUser.age = prompt("You have not entered a valid input. Please enter your age.").trim();
    } else if (isNaN(validAge)) {
        profileUser.age = prompt("That is not a valid age. Please enter a number.").trim();
    } else if (validAge < 18) {
        profileUser.age = prompt("You're too young, come back later.").trim();

    }
    validAge = Number(profileUser.age);
}

// geslacht
while (profileUser.gender !== "M" && profileUser.gender !== "F" && profileUser.gender !== "X") {
    profileUser.gender = prompt("Please, provide a valid gender. Choose M: (Male), F: (Female), or X: (Genderneutral)").toUpperCase().trim();
}

// interesse in geslacht
while (profileUser.gender_interest !== "M" && profileUser.gender_interest !== "F" && profileUser.gender_interest !== "X") {
    profileUser.gender_interest = prompt("What gender are you interested in? Choose M: (Male), F: (Female), or X: (Genderneutral)").toUpperCase();
}

// city/rural
while (profileUser.location !== "rural" && profileUser.location !== "city") {
    profileUser.location = prompt("Please choose rural or city");
}

// minimum en maximum leeftijd
while (isNaN(profileUser.min_age_interest) || isNaN(profileUser.max_age_interest) ||
    Number(profileUser.min_age_interest) < 18 || Number(profileUser.max_age_interest) > 70 ||
    Number(profileUser.min_age_interest) >= Number(profileUser.max_age_interest)) {
    profileUser.min_age_interest = prompt("What is the minimal age that you would like to date? (18 or older)").trim();
    profileUser.max_age_interest = prompt("What is the maximal age that you would like to date? (70 or younger)").trim();
}

const minAgeInterest = Number(profileUser.min_age_interest);
const maxAgeInterest = Number(profileUser.max_age_interest);

// Filter kandidaten
const filteredData = mockData.filter(candidate => {
    const ageMatch = candidate.age >= minAgeInterest && candidate.age <= maxAgeInterest;
    const genderMatch = profileUser.gender_interest === "X"
        ? true
        : candidate.gender === profileUser.gender_interest;

    // Controleer of de locatie overeenkomt
    const locationMatch = candidate.location === profileUser.location;

    // Combineer alle voorwaarden
    return ageMatch && genderMatch && locationMatch;
});

if (filteredData.length > 0) {
    console.log(`\nfound ${filteredData.length} Potential matches:`);
    filteredData.forEach(candidate => {
        console.log(`♥  ${candidate.first_name} ${candidate.last_name}, ${candidate.age} years old, Gender: ${candidate.gender}, Location: ${candidate.location}`);
    });

} else {
    console.log("No potential matches found.");
}