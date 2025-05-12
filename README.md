# FastPass API

This project is the official FastPass applcation API

## 🚀 How to run

1. Clone the repository
2. This project uses docker and docker compose, make sure you have them installed
3. Create and configure .env file (check .env.example)
4. Run the following command to start the services:

    ```bash
    npm install # install node dependencies

    docker compose up -d postgres # if you dont have an instance of postgres running
    npx prisma migrate dev  # maybe you will need to change db url in ,env

    docker compose up --build
    ```

5. The services will be available at the following URLs:
    - API: http://localhost:3333
    - PostgreSQL: http://localhost:5432

## 🛠️ Technologies

- NodeJS 22.13
- NestJS
- PostgreSQL
- Docker

## 📚 Documentation

(OpenAPI) API Documentation is available at [docs](http://localhost:3333/api)

## 📬 Contact Me

If you have any questions, suggestions, feel free to talk with us!

- Email: [zanelallopes9977@gmail.com](mailto:zanelallopes9977@gmail.com)
