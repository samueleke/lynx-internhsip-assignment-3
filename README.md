# Express CRUD API Assignment

This assignment involves creating an Express CRUD API with specific routes and data management schemas. 

## Routes

The API should have the following routes:

1. `/media/avatar/:id` - GET the avatar of a particular user based on their ID. Avatars are stored under `./data` in the filesystem and have the following name `{studentId}.{imageExtension}`.
2. `/student` - GET all students' data, their assignments, and subjects.
3. `/student/:id` - GET a particular student's data based on the id path param.
4. `/student` - POST to create a new student by providing `firstName` and `lastName` in the `req.body`. The avatar is generated using a placeholder image generator (see Addendum I) and must be queryable by using the `/media/avatar/:id` endpoint.
5. `/student/:studentId/subject/:subjectId` - PUT to assign an existing subject to a student.
6. `/student/:id` - DELETE a student based on ID.
7. `/assignment` - POST to create a new assignment by providing a title.
8. `/subject` - POST to create a new subject by providing a title.
9. `/subject/:subjectId/assignment/:assignmentId` - PUT to add an existing assignment to a subject.
10. `/assignment/grade/:studentId/:assignmentId` - POST to grade an assignment for a particular student.

## Database Schema

Your database data must reflect the following schema for management of data:

```json
Student: {
  id: string (unique),
  firstName: string,
  lastName: string,
  avatar: string (location of the avatar using the /media/avatar endpoint),
  subjects: Subject[]
}

GradedAssignment: {
  student: Student,
  subject: Subject,
  assignment: Assignment,
  grade: string (must be one of 'A' | 'B' | 'C' | 'D' | 'E')
}

Assignment: {
  id: string (unique),
  title: string
}

Subject: {
  id: string (unique),
  title: string,
  assignment: Assignment[]
}
```
## Adendum I:
Image generation can be easily accomplished by using a public API, a comprehensive list
of APIs can be found [here](https://github.com/public-apis/public-apis) search for ones that generate an image for you, any will do.
Some recommendations from me include [PlaceKitten](https://placekitten.com/) or [PlaceDog](https://place.dog/), simply store the image
you download from the API under `./data` as `{studentId}.{imageExtension}`

## Bonus points:
* for validating the user inputs of any requests
* for error handling on the avatar fetching (3rd party API error handling)
* for error handling when working with the database itself (ex. handling if anassignment you want to modify does not exist, etc.)
* for optimizing the `/media/avatar` endpoint by using Express `res.pipe`

## Getting Started

To get started with this assignment, follow these steps:

1. Set up a new Express.js project by installing the necessary dependencies.
2. Create the necessary routes as specified above.
3. Set up a database (like MongoDB) and create the necessary schemas as specified above.
4. Implement the placeholder image generator functionality for student avatars.
5. Implement validation for user inputs and error handling for avatar fetching and database operations.
