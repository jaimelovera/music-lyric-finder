# Song Lyric Search App Using React

> A react web application for searching music lyrics using Reacts built in context API along with the Musixmatch public API. Please note that the free version of the API only returns partial lyrics.

## Visit My Hosted Demo
https://music-lyric-finder.netlify.app/

 The free api I am using has a limited amount of requests I can make per day, so if no data loads please try again another day!

## Musixmatch API
Get your API key [here](https://developer.musixmatch.com) and add it to the .ENV file. 

Or use mine since I left it in there :P

## Quick Start 
```
# Install dependencies
npm install

# Serve on localhost:3000
npm start

# Build for production
npm run build
```

## Motivation
I built this small application to practice using react router to build a single page application, axios for making HTTP requests to talk with an API, and how to use reacts Context API to manage global state.

I learned how to use CSS modules in react to scope my css classes locally to each component (SUPER awesome).

I learned about Cross-Origin Resource Sharing (CORS) and why all modern browsers implement it ... and how to get around it using a proxy server which was sufficient for my needs since this is only a small project with no user authentication and security is not a top priority.

I realized that if I shared a link to a specific track, the link led to a 404 because the browser tries to find a file that does not exist. This is happening because I am doing client side routing with Router, therefore I had to redirect all links to the index file.

I made sure that when the API call returns a 404 status I display a 404 page. I also used regex in the router path to only allow integers for the track ID.

## App Info

#### Author: [Jaime Lovera](https://www.jaimelovera.com/)