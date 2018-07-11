![javaScript icon](https://github.com/Zefevr/FinalEvaluation/blob/master/dev-icons/js.svg)
![react icon](https://github.com/Zefevr/FinalEvaluation/blob/master/dev-icons/react.svg)
![redux icon](https://github.com/Zefevr/FinalEvaluation/blob/master/dev-icons/redux.svg)
![html icon](https://github.com/Zefevr/FinalEvaluation/blob/master/dev-icons/html.svg)
![css icon](https://github.com/Zefevr/FinalEvaluation/blob/master/dev-icons/css.svg)
![typescript icon](https://github.com/Zefevr/FinalEvaluation/blob/master/dev-icons/ts.svg)
![postgress icon](https://github.com/Zefevr/FinalEvaluation/blob/master/dev-icons/postgress.svg)

## Evaluation Tool for Teacher
> Final assigment for Codaisseur Academy

_______________________________________________________________________________

### Installation:

Clone this repository. Run `yarn` to install all libraries.

* On Server's folder: Run `yarn tsc` to compile. Run `nodemon .` on the target folder.

* On Client's folder: Run `yarn start` to listen app on local port.

_______________________________________________________________________________

### List of features (User Stories):

1. As a Teacher I can sign into the tool with my email and password to start using it.
2. As a Teacher, after I signed in, I see a (list of) current classes, identifiable by their Batch number
(e.g. Batch #1), start date, and end date.
3. As a Teacher, I can create a new class by giving it a Batch number, start date, and end date.
4. As a Teacher I can add, edit, remove students in a class. To add a student I need to provide: 1)
their full name, 2) (a link to) their profile picture.
5. As a Teacher, I can click on a class, after which I see a grid of all the students by their name and
photo, and the last colour code given to them. Above the students grid, I see a bar with 1-3
segments, showing me the percentage (%) of students evaluated GREEN, YELLOW, and RED.
6. As a Teacher, when I click on a student, I can click on GREEN, YELLOW, or RED, fill in
the date (defaults to today), and a remark.
7. As a Teacher, I can edit my own evaluations.
8. ALGORITHM PART = As a Teacher, from the class view I can click a button “ASK A
QUESTION”. It shows me the name and picture of a random student to ask a question. Not
entirely random though: RED students get ~45% of the questions YELLOW students
~35%, and GREEN students ~20%.
