# Impro

## About
Impro is a music player that allows room for musical improvisation. It takes a base track that is missing a solo, and performs the solo based on information of the piece and the sound chunks you feed it. This system works great for groups such as Jazz Bands, Progressive Rock/Metal Groups, and many more that need it*. 

*Of course it can play normal music too if you don't have a solo, but that's just boring.

This is a capstone project I made to graduate. To those who don't know what a capstone project is, I had to create a learning experience, and work on it for at least 30 hours. My goal was to learn web development and what it takes to be innovative with.

I do not know what I am going to do with it post-graduation yet, but I would for sure like to finish this, and apply a license of some sort on it even if it means restarting the project. As a linux user (I use Arch BTW to those curious, but that is a different learning experience) I do not want this system I have created abused by a large company, but I am willing to let other people who want to use this for projects such as video games.

## How to Use

There are a few programs that are required
 - node (at least v12.22.5)
 - python (at least 3.9.2)

To run the server end, you can run `npm start` or `node server.js` and that will start the server. if you want to test the desktop client, you can run `npm test` or `npx electron clientapp.js`.
Run `npm install` in the project root directory to install the required dependencies.

It is also suggested that you clean out the tmp to save space after every session. you can just delete the folder in general if you want because the program will create a folder again for to load it up again if you want