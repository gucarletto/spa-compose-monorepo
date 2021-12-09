# SPA with Docker Compose

This app was built with:

 - Backend: Nodejs (with Typescript), Express, Prisma, Jest.
 - Database: PostgreSQL.
 - Frontend: React (with Typescript), Bulma components

# How to Run

First option is to put all components up by running with this command in this folder: docker-compose up --detach --build; docker-compose exec challenge-backend yarn dev:migrate

Optionally run all of them separately by running:
 - Run "yarn install" on both back and front folders
 - Create on back folder a .env with database URL
 - Run "yarn dev"
 - Create on front folder a .env with API URL
 - Run "yarn start"