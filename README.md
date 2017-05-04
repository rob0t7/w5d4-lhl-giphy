# Websockets+ plus JWT intro

Hey class,

Today we cover expanding our Chatty app to included *giphy* messages
that insert gifs into the chat window instead of just text.

Afterwards with the little time remaining we discussed on token based
authentication method that could be used...**JWT**.

## Giphy Chat

Websockets are awesome. They allow us to have two way
communication. But they only send 1 type of message, a string. Knowing
this fact we can then create specific types of messages by using
JSON.

What we are going to do is the following...When a user types "/giphy
<searchTerm>" we are going to find a random gif with the filter
criteria <searchTerm>. We are going to break the problem down into the
following steps:

* Explore and learn the Giphy API (using POSTMAN)
* Use our socket server to act as a proxy for accessing Giphy
* Use **Regular Expressions** to check whether the message is a giphy
  command or not.
* Have the server fetch the message url and return an *<img>* tag
  instead of repeating the message.
* Make react insert the message using HTML safe (see
  insertDangorousInnerHTML)
* Show a mic drop gif.
* Profit

## JWT

Since we had some extra time we
explored [JWT Tokens](http://jwt.io). JWT is used commonly with
token based authentication of APIs. We can use it for our SPA.

The format of a JWT consists of the following:
**XXXXXXXXXXXX.YYYYYYYYYYYYYY.ZZZZZZZZZZZ**. The XXXXXXXXXX contain
the header information on what crypto funciton is used to sign the
token. YYYYYYYYYYYYYYY is the BASE64 encoded JSON object. This
consists the meat of what our token is. It contains different claims
some of which are reserved (like iss = issuer) and the rest are
defined by us. Finally the ZZZZZZZZZZZ is the cryptographic signature
that ensure the token is not tampered with.

In case we implemented a very simple server component that issues the
token and then verifies if it is valid or not.

## Readings

* POSTMAN tool (https://www.getpostman.com/)
* HTMLSafe React
  (https://facebook.github.io/react/docs/dom-elements.html)
* Giphy API (https://github.com/Giphy/GiphyAPI)
* JWT (https://jwt.io)
* JWT Node Package (https://github.com/auth0/node-jsonwebtoken)
* In class code ()

Have fun.
