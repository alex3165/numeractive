# Numeractive.fr

Numeractive is a collaborative blog based on NodeJs and AngularJs/ExpressJs. The project will be adapted to be used as a full javascript content management system.

## How to install

- <pre>git clone https://github.com/alex3165/numeractive.git</pre>

- go in node directory <pre>cd numeractive/node/</pre>

- Install node packages <pre>npm install</pre>

- Run database installer, some questions will be asked <pre>node console database</pre>

- Add admin user <pre>node console add:admin</pre>

- Install bower modules from public directory <pre>bower install</pre>

- Start node server (forever installed globally needed: node install forever -g)<pre>forever -w app.js</pre> 

## Notes

Queues task are in "node/todo.md" file, don't hesitate to pull request updates, improvements or fixes.

> Otherwise, you can contact me at alexr.3165@gmail.com, I'll give you more informations.
