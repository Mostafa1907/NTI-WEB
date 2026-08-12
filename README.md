# Courses API

A RESTful API built with Node.js, Express.js, and MongoDB for managing courses.

## Features

- Create a new course
- Get all courses
- Get a specific course by ID
- Update a course
- Delete a course
- Upload course images
- Store uploaded images using Multer
- Validate uploaded image files
- Store course data in MongoDB
- Organize uploaded images into separate folders

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- dotenv



## How to Run the Project

1. Clone the repository.

2. Open the project folder in the terminal.

3. Install the required dependencies:

-->  npm install

4. Create a `.env` file and add the required environment variables.

5. Start the server.

The API will run on the configured port.



## API Usage Examples

### Get All Courses

Retrieves all courses stored in the database.

### Get Course By ID

Retrieves a specific course using its ID.

### Create Course

Creates a new course and allows uploading a course image.

The request should include the course information and an image file.

### Update Course

Updates the information of an existing course.

A new course image can also be uploaded.

### Delete Course

Deletes a course from the database.

## Image Upload

Course images are uploaded using Multer and stored inside the `uploads/courses` folder.

Only supported image formats such as JPG, JPEG, and PNG are accepted.
