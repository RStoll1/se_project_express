# WTWR (What to Wear?): Back End

A REST API server for the WTWR (What to Wear?) application that manages clothing items and user data based on weather conditions.

## Project Overview

This back-end server provides API endpoints for creating, reading, updating, and deleting clothing items, as well as managing user profiles. Users can like/unlike items and organize their wardrobe based on weather preferences.

## Video Explanation

You can watch a video walkthrough of the project here:  
[WTWR Back End](https://drive.google.com/file/d/1QtN7lcorWACK5x0im1swLm_wWLbnUeJS/view?usp=sharing)

The video covers:

- How the API endpoints work
- Authentication and authorization flow
- Data structure and relationships
- Example requests and responses

## Tech Stack

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Code Quality**: ESLint with Airbnb style guide
- **Development**: Nodemon for hot reloading

## Features

- RESTful API for clothing items (CRUD operations)
- User management endpoints
- Like/unlike functionality for items
- Item ownership and authorization
- Centralized error handling
- MongoDB data persistence
