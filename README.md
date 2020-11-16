# CBWA_bug_tracker

## Table of Contents 
  * [About the Project](#about-the-project) 
    * [Built with](#built-with)
  * [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
  * [Usage](#usage)
  * [Change log](#change-log)
  * [Roadmap](#roadmap)
  * [Contact me](#contact-me)
  
  ## About the Project
  
  This project is an API for a bug tracker system, which keeps track of reported software bugs. This allows you to register issues and follow them up.
    
  ## Built with
  * NodeJS
  * JavaScript
  * Heroku
  * MongoDB
  
  ## Getting Started
  To run this project using npm
  ```bash
    $ cd../CBWA_bug_tracker
    $ npm start
  ```
  
  ## Prerequisites
  * npm
  ```bash
    npm install npm@latest -g
  ```
  * Dependencies
  ```bash
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "mongodb": "^3.6.2"
  ```
    
    
  ## Installation
  1. Clone this project
  ```bash
    $ git clone https://github.com/freakles/CBWA_bug_tracker.git
  ```
  2. Install NPM Packages
  ```bash
    npm install
  ```

  ## Usage
  * Get all Projects 
  ```html
    '{GET}/projects'
  ```
  * Get individual Project by slug
  ```html
    '{GET}/projects/{slug}'
  ```
  * Add new Project
  ```html
    '{POST}/projects'
  ```
  ```html
    
    "projects": [
        {
            "_id": "5f985c2d35af075144fc0905",
            "slug": "BOOKS",
            "name": "bookstore",
            "description": "a book project"
        }
      ]
  ```
  ------------------------------------------------
  * Get all Users 
  ```html
    '{GET}/users'
  ```
  * Get individual User by email
  ```html
    '{GET}/users/{email}'
  ```
  * Add new User
  ```html
    '{POST}/users'
  ```
  ```html
    
    "users": [
        {
            "_id": "5f99645bd89a8a5fe4a23913",
            "name": "Jean Paul",
            "email": "jp@cbwa.com",
            "usertype": "admin",
            "key": "pass1234"
        }
  ```
  -------------------------------------------------
  * Get all Issues 
  ```html
    '{GET}/issues'
  ```
  * Get individual Issue by issueNumber
  ```html
    '{GET}/issues/{issueNumber}'
  ```
  * Get all Issues for a Project 
  ```html
    '{GET}/projects/{slug}/issues'
  ```
  * Add new Issue
  ```html
    '{POST}/projects/{slugName}/issues'
  ```
  * Update Status of the Issue
  ```html
    '{PUT}/projects/issues/{issueNumber}/{status}'
  ```
  ```html
    
     "issues": [
        {
            "_id": "5f9ac30b0d029b400e34b561",
            "issueNumber": "BOOKS-1",
            "title": "Missing requirements",
            "description": "The API does not contain all the requirements",
            "status": "wip",
            "project_id": "5f985c2d35af075144fc0905",
            "comment": []
         }
  ```
  -----------------------------------------------
  * Get all Comments 
  ```html
    '{GET}/comments'
  ```
  ```html
    "comments": [
        {
            "issueNumber": "BOOKS-1",
            "comment": [
                {
                    "id": 1,
                    "text": "first comment",
                    "author": "5f996488d89a8a5fe4a23914"
                },
                {
                    "id": 2,
                    "text": "second comment",
                    "author": "5f99645bd89a8a5fe4a23913"
                }
            ]
        },
        {
            "issueNumber": "BOOKS-2",
            "comment": [
                {
                    "id": 1,
                    "text": "I do not know",
                    "author": "5f99645bd89a8a5fe4a23913"
                },
                {
                    "id": 2,
                    "text": "what I am doing",
                    "author": "5f99645bd89a8a5fe4a23913"
                }
            ]
        }
  ```
  
  
  
  ## Change log
  
  October 2020
   > Created the project for a continuous assesment for Cloud Based Web Application in CCT.
   > * Models, controllers and routes
   > * Connect with the database
    
  November 2020
   > Fase 2 of the same project
   > * Handling errors
   > * Built a proper README.md for this project
    
  
  ## Roadmap
  
  > Build a Front-End
  >>* Login
  >>* List projects
  >>* List issues
  -------------------------------------
  > Docker-ise the application
  -------------------------------------
  > Start unit testing
  ____________________________________
  > Add in issue linking
  
  ## Contact me
  
  Jean Paul </br>
  twitter: [@freakles10](https://twitter.com/freakles10) </br>
  email: freakles@outlook.com
  
