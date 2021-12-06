# Impro

## About
Impro is a music player that allows room for musical improvisation. It takes a base track that is missing a solo, and performs the solo based on information of the piece and the sound chunks you feed it. This system works great for groups such as Jazz Bands, Progressive Rock/Metal Groups, and many more that need it*. 

*Of course it can play normal music too if you don't have a solo, but that's just boring.

This is a capstone project I made to graduate. I do not know what I am going to do with it post graduation, but I will be putting a license of some sort on it. I do not know yet because I do not want this system I have created abused by a large company, but I am willing to let other people who want to use this for projects such as video games.

## How to Use

There are a few programs that are required
 - node (at least v12.22.5)
 - python (at least 3.9.2)

To run the server end, you can run `npm start` or `node server.js` and that will start the server. if you want to test the desktop client, you can run `npm test` or `npx electron clientapp.js`.

It is also suggested that you clean out the tmp folder before you begin. you can just delete the folder in general if you want because the program will create a folder again for to load it up again