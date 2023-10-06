![logo banner](https://i.imgur.com/pjQcE1T.gif)

# XYLO - The Digital Toy Box

### Overview
Xylo is an online playroom toy rotation creation app! It is your digital toy box inventory, where you can create the perfect toy rotation for your kiddos. If your current playroom is just a dumping ground for all things CHILD, much like my own, then Xylo can help you get organized and keep your little ones engaged. As Lovevery points out, "a study compared how children played when offered 4 vs. 16 toys in a room. Toddlers who were offered 4 toys engaged more meaningfully with each, playing in a deeper way and spending more time exploring than toddlers who had 16 available toys." When there are too many toy choices, children tend to bounce around and not stay focused on one toy or task for very long. With Xylo toy rotations, you can create themes or focus areas based on your child's age, interests, ability, and more. In your Xylo playroom, you can build an inventory to create your digital toy box, then customize each rotation in any way you like!

#### Technology Used:
- React
- Bootstrap
- CSS
- JavaScript
- Express
- Mongoose
- MongoDB

## User Stories
- As a user, I want to see a home page with links and a login or sign up button.
- As a user, I want the ability to log in and log out.
- As a user, I want to click on a link to see a list of all the toys, with photos.
- As a user, I want to click on a link to see a list of all my toys, with photos.
- As a user, I want to click on a link to see a list of all of my created toy rotations.
- As a user, I want to see the list of my rotations, with a link to a details page with more information.
- As a user, I want to see a list of all the toys that have been added to a specific rotation.
- As a user, I want the ability to add or delete my own toys.
- As a user, I want the ability to add a photo of my toys.
- As a user, I want to see a link I can click on to access my saved information.
- As a user, I want the ability to sort or filter through all the toys. (Bonus)
- As a user, I want the ability to search for toys with a search bar. (Bonus)
- As a user, I want the ability to create timeframes for my toy rotations and get a reminder to rotate upon logging in. (Bonus)
- As a user, I want to click a link that shows a resource page for toy rotation ideas, user blog, connected activities, sharing options, etc. (Bonus)

## ERD
![app erd](https://i.imgur.com/9UrLuph.png)

## API
Use this as the basis for your own API documentation. Add a new third-level
heading for your custom entities, and follow the pattern provided for the
built-in user authentication documentation.

Scripts are included in [`curl-scripts`](curl-scripts) to test built-in actions. Feel free to use Postman for testing, using the curl scripts listed below and in the folder for setting up headers and request bodies.
Add your own scripts to test your custom API.

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

### Pets

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/toys`             | `toys#index`    |
| GET   | `/toys/<toy_id>`    | `toys#show`    |
| POST   | `/toys`             | `toys#create`    |
| PATCH  | `/toys/<toy_id>` | `toys#update`  |
| DELETE | `/toys/<toy_id>`        | `toys#delete`   |

### Toys

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/pets/<pet_id>`             | `toys#create`    |
| PATCH  | `/pets/<pet_id>/<toy_id>` | `toys#update`  |
| DELETE | `/pets/<pet_id>/<toy_id>`        | `toys#delete`   |

#### Recommended Request bodies
Request - users#signup:

```json
{
    "credentials": {
      "email": "an@example.email",
      "name": "Example"
      "password": "an example password",
      "password_confirmation": "an example password"
    }
}
```

Request - toys#create (requires a token):

```json
{
    "toy": {
        "name": "xylophone",
        "type": "wooden",
        "level": "6 months and above",
        "focus": "music",
    }
}
```

### Token Auth Strategy
Send the token as `Bearer Token <token>`

## MVP SHOWCASE
(Screenshots here)

### Future Versions
- Expand to lessons and curriculum
- 

### Getting Started
Xylo

### Deployed App
Xylo: 
