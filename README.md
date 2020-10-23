# GitHub Dashboard

This is an application that allow you to find repositories by their names.

![Preview of GitHub Dashboard](preview.jpg)

## Description

When type text into the search field and press Enter, a search by name should be performed and its result should be displayed in the list of repositories.

By default, if nothing is entered in the field, list of the 10 most popular repositories is shown.

The order of sorting the repositories is by number of stars on GitHub (from highest to lowest). Choosing of sorting will be added at the next version.

On page reloads, the search query and current page number state should be preserved and used for the original request.

There is a pagination at the bottom of the page.

## How to use
* `git clone` this repository;
* `npm install` all dependencies;
*  create .env file in root directory;
*  type into .env `TOKEN_GITHUB=your own token`; 
*  type `npm start`, if you want to run NodeJS server;