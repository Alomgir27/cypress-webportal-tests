# SimpleStudy Web Portal Cypress Tests

Cypress documentation: (https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)[https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test]

## Getting Started

Follow these steps to get your testing environment up and running.

### Prerequisites

- Git
- Node.js and npm (Node Package Manager)

### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
# clone the repo
$ git clone https://github.com/SimplesStudy/cypress-webportal-tests
$ cd cypress-webportal-tests
```

### 2. Configure Environment Variables
Copy the environment template configuration file:
```bash
$ cp cypress.env.example.json cypress.env.json
```

***User Credentials:*** Ensure the supportEmail and supportPassword variables are set to your support email and password.

```bash
supportEmail
supportPassword
```

### 3. Install Dependencies

Install the necessary dependencies for the project:

```bash
$ npm install
```

# Running Tests
There are two ways to run your Cypress tests: using the Cypress UI or running them directly via the command line.

### Open Cypress Ui Test Runner

```bash
# from app's directory run following command
$ npx cypress open
```
This opens the Cypress interface, where you can run individual tests interactively.


### Running Tests via CLI
To run tests without the Cypress Test Runner and record the results, use this command:
```bash
# from app's directory run following command
$ npx cypress run --record --key aecfab60-1961-458c-9155-4397d5bf9de8
```

