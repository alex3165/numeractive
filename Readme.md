# Numeractive.fr

Numeractive is a collaborative blog based on NodeJs and AngularJs/ExpressJs. The project will be adapted to be used as a full javascript content management system.

## How to install

- Install the database by executing the script "numeractive.sql" in the "db" folder

- Install back modules using "package.json" with npm command, run (in node folder) : <pre>npm install</pre>

- Install front modules using "bower.json" with bower command, run (in node/public folder) : <pre>bower install</pre>

- Start node server <pre>forever -w app.js</pre>

> Make sure you configured your db connection in "node/routes/db.js" file.

## Notes

Queues task are in "node/todo.md" file, don't hesitate to pull request updates, improvements or fixes.

> Otherwise, you can contact me at alexr.3165@gmail.com, I'll give you more informations.