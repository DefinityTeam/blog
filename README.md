# Definity Blog
## Introduction
This repository hosts the Definity blog. It's made in [TypeScript](https://typescriptlang.org)/JavaScript using [Express](https://expressjs.com) and [EJS](https://ejs.co), to make hosting it yourself easier. (You will still have to deal with SQL, though. Sorry.)

By default, it runs on port 8080, but you can modify it on the first line of `index.ts` / `index.js`. **However, if you use production, then please make sure ports 80 and 443 are available, as the specified port is ignored in production.**

## Running
No guarantees any of this will work yet. Apologies.

Open a terminal, and setup if you haven't done `git clone` yet:
```
$ > git clone https://github.com/DefinityTeam/blog
$ > cd website
$ > npm ci --only=production
```
Starting in development: `npm run start`</br>
Starting in production: `npm run start -- --prod`

## Building
```
$ > npm ci
$ > npm run build
```
(Yes, it's that easy.)

## Contributing
When contributing to the main/parent repository, it is recommended to use `npm run watch`. When you make changes to the directory, or any `.ts`/`.json` file, `nodemon` will automatically restart the server.

Once you've finished your changes, ^C and `npm run build`. After that, you're good to go.

## License
Copyright (C) 2021 Definity

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
