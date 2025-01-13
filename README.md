# E-Commerce Backend

The backend of this e-commerce platform is built to support the frontend, handling product data, user authentication, and order processing. The backend provides API endpoints for product management, user registration and login, and order management. It securely handles authentication using JWT tokens and ensures smooth communication between the frontend and the database.
---

## Features
- **User Authentication: Users can register and log in to access app.** 
- **Product Management: Allows CRUD operations for products, including images, categories, and prices.** 
- **Category Navigation: Users can view products one by one, based on the navigation.** 
- **Cart Functionality: Users can easly add and remove products to/from their cart** 
- **Role-based Authorization: Different levels of access for users and admins, ensuring security and proper user control.** 

## Technologies Used
- **Node.js: Backend framework for handling server-side logic.** 
- **Express.js: Web framework for building RESTful APIs.** 
- **MongoDB: NoSQL database for storing product, user, and order data.** 
- **Mongoose: ODM for MongoDB to define schemas and interact with the database.** 
- **JWT (JSON Web Token): For user authentication and secure session management.** 
- **bcrypt.js: For hashing user passwords.** 
- **bdotenv: For managing environment variables.** 
- **cors: For enabling cross-origin resource sharing (CORS) between frontend and backend.** 




## Quick Start

To get started with E-commerce  App Frontend on your local machine:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/prathyanthDhanus/cybpress_machinetask-e-com_backend.git

3. **Start the Application**
   npm start

## Environment Variables

-  **PORT** - Port number
-  **MONGODB_URL** - Momgodb url
- **USERSECRET_KEY** - User secrete key (jwt)




