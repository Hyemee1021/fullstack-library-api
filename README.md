#Library Mgmt
This project is about managing the library including listing and burrowing books. This is the api server of [frontend repo]

you can visit [here]

## How to use

1. Clone the project by running `git clone <repo link>` in oyour terminal.
2. Run `cd <foldername>` to go inside the project or open the project in your fab code editor.
3. Install dependencies `npm i ` from the terminal with in the root directory of the project.
4. Rename `.env.sample` to `.env` and pass the value accordingly.
5. Run the project `npm run dev` for the dev envirnment and `npm start` in the rpoduction. Please note that `npm run dev` will use `nodemon` behind. So, run `npm i nodemon -g` to install nodemon package in your system level if you do not have yet.
6. The server should be running at [`http://localhost:8000`](http://localhost:8000)

## Available apis

All the apis segmentation path are followed by `http://localhost:8000/api/v1`

### User API

User api is will follow the following pattern `http://localhost:8000/api/v1/users`

| #   | PATH          | METHODS | PRIVATE | DESCRIPTION                                              |
| --- | ------------- | ------- | ------- | -------------------------------------------------------- |
| 1.  | '/'           | 'GET'   | Ture    | It returns the user obj                                  |
| 2.  | '/'           | 'POST'  | flase   | Server expects the user obj and create a user in the db  |
| 3.  | '/admin-user' | 'POST'  | True    | Server expects the admin obj and create a user in the db |

### Books API

User api is will follow the following pattern `http://localhost:8000/api/v1/books`
