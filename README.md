# WHATABYTE Store: Auth0 Next.js Sample

You can use this starter application to practice implementing user authentication using Auth0 in a Next.js web application. A comprehensive authentication strategy involves implementing the following security features: 

- Add user login and logout.
- Retrieve user profile information.
- Protect application routes.
- Make secure calls to an API.

## Quick Set Up

### Set up Auth0

If you haven't already, [sign up for a free Auth0 account](https://auth0.com/signup?&signUpData=%7B%22category%22%3A%22button%22%7D&email=undefined) to connect your web application with the Auth0 Authentication-as-a-Service platform.

- Open the [Applications](https://manage.auth0.com/#/applications) section of the Auth0 Dashboard.

- Click on the **Create Application** button and fill out the form with the following values:

  - **Name**: `WHATABYTE Store`

  - **Application Type**: Regular Web Applications

- Click on the **Create** button.

> Visit the ["Register Applications"](https://auth0.com/docs/applications/set-up-an-application) document for more details.

An Auth0 Application page loads up.

As such, click on the **"Settings"** tab of your Auth0 Application page, locate the **"Application URIs"** section, and fill in the following values:

- **Allowed Callback URLs**: `http://localhost:4040/api/auth/callback`

- **Allowed Logout URLs**: `http://localhost:4040/`

Scroll down and click the **"Save Changes"** button.

Next, locate the **"Basic Information"** section. Store the **"Domain"**, **"Client ID"**, and **"Client Secret"** values in a `.env` file under the current project directory:

```bash
AUTH0_ISSUER_BASE_URL=https://<AUTH0_DOMAIN>
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=82k8V04pQ-s2B3nzJ3IvUD3VJjHzFnWb8GtvzYh6j8VQZPfCWHxW87WVcb53T8WU
AUTH0_SECRET=35ffc01abbd8f95b85493e546db1b4c7682a002bd0765bf9b8993a5fbf10a365
AUTH0_BASE_URL=http://localhost:4040
```

- For the `AUTH0_ISSUER_BASE_URL` value, `<AUTH0_DOMAIN>` is your **Domain** value.

- `AUTH0_CLIENT_ID` is your **Client ID** value.

- `AUTH0_CLIENT_SECRET` is your **Client Secret** value.

- The `SESSION_SECRET` value is the secret used to sign the session ID cookie, which can be either a string for a single secret or an array of multiple secrets. Execute the following command to generate a suitable string for the session secret:

```bash
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

- The `AUTH0_BASE_URL` value is the URL from where you are serving your application.

### Set up the project

Install the project dependencies:

```bash
npm install
```

### Set up the database

This project uses Next.js API routes and Prisma to quickly create CRUD endpoints.

Run the following command to apply the most recent migration (`prisma/migrations/...`) and start the database:

```bash
npx prisma migrate dev
```

### Run the project

With the Auth0 configuration set, run the Next.js application by issuing the following command:

```bash
npm run dev
```

Visit [`http://localhost:4040/`](http://localhost:4040/) to access the home page:

![WHATABYTE home page](https://images.ctfassets.net/23aumh6u8s0i/7DzEqnirUH9IwEUbwmrtFp/eeff2798aa0ae33005757a3f8b81a2aa/whatabyte-home.png)

Sign up or log in to access the profile page, [`http://localhost:4040/profile`](http://localhost:4040/profile):

![WHATABYTE profile page](https://images.ctfassets.net/23aumh6u8s0i/2VP6xHagmxSIt5mS99y22I/9da44a8db43ba15eb06046a41c13a317/whatabyte-profile.png)

Sign up or log in to access the API testing harness, [`http://localhost:4040/api-tester`](http://localhost:4040/api-tester):

![WHATABYTE API testing harness](https://images.ctfassets.net/23aumh6u8s0i/39t6j01ve5y3CnZSHdYUjm/2dfba41ada48785ba7e7593c8531ac93/api-tester.png)

Use the buttons to test making different CRUD requests to the Next.js API routes.
