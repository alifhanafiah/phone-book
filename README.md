# Phone Book Web App

This is a Phone Book web application built with React.js, TypeScript, GraphQL, and Emotion CSS-in-JS. It allows users to manage their contacts, including adding, editing, deleting, and searching for contacts. The contact data is stored using the Web Storage API, providing persistence even after a page reload.

## Demo

You can access a live demo of this web app here: [Link to Demo](https://phone-book-sand.vercel.app/)

## Technical Stack

- React.js
- TypeScript
- GraphQL (Apollo Client)
- Emotion CSS-in-JS
- Web Storage API
- [Additional technologies used]

## Features

- **Contact List Page:**

  - Display favorite contacts at the top.
  - Pagination for contact list.
  - Add/remove contacts from the favorite list.
  - Search for contacts.
  - Delete contacts.

- **Form Contact Page:**

  - Add new contacts with unique names and valid phone numbers.

- **Edit Contact:**

  - Edit existing contacts with validation.

- **Data Persistence:**

  - Contact data is stored locally for a persistent experience.

- **Testing:**

  - Integration and unit tests (optional but recommended).

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/alifhanafiah/phone-book.git
   ```

1. Change directory to the project folder:

   ```bash
   cd phone-book
   ```

1. Install the project dependencies:

   ```bash
   npm install
   ```

1. Configure the GraphQL endpoint:

   - Update the GraphQL endpoint URL in the project configuration (if needed).

1. Start the development server:

   ```bash
   npm run dev
   ```

1. Open your browser and access the app at `http://localhost:5173`.

## Contributing

Contributions to this project are welcome. If you'd like to contribute, please follow these guidelines:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them.
- Push your changes to your fork.
- Create a pull request to the main repository.

## License

This project is licensed under the MIT - see the [LICENSE](LICENSE) file for details.
