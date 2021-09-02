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
AUTH0_CLIENT_SECRET=
AUTH0_SECRET=
AUTH0_BASE_URL=http://localhost:4040
```

- For the `AUTH0_ISSUER_BASE_URL` value, replace `<AUTH0_DOMAIN>` with your **Domain** value.

- `AUTH0_CLIENT_ID` is your **Client ID** value.

- `AUTH0_CLIENT_SECRET` is your **Client Secret** value.

- The `SESSION_SECRET` value is the secret used to sign the session ID cookie, which can be either a string for a single secret or an array of multiple secrets. Execute the following command to generate a suitable string for the session secret:

```bash
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

- The `AUTH0_BASE_URL` value is the URL from where you are serving your application.

### Access the Auth0 Management API

You'll use the [Auth0 Management API](https://auth0.com/docs/api/management/v2) to implement email verification in your application. 

Start by installing the [Auth0 Management API SDK for Node.js](https://github.com/auth0/node-auth0):

```bash
npm install auth0
```

Then, open your `.env` file and add a new `AUTH0_DOMAIN` value to it:

```bash
AUTH0_ISSUER_BASE_URL=https://<AUTH0_DOMAIN>
AUTH0_CLIENT_ID=<...>
AUTH0_CLIENT_SECRET=<...>
AUTH0_SECRET=<...>
AUTH0_BASE_URL=http://localhost:4040
AUTH0_DOMAIN=

# Other values related to Prisma or your application
```

The value of `AUTH0_DOMAIN` is the value of `AUTH0_ISSUER_BASE_URL` without the protocol, `https://`.

Restart your Next.js server for it to recognize the changes that you've made to `.env`.

This Next.js web application uses the [`sendEmailVerification()` method](https://auth0.github.io/node-auth0/module-management.ManagementClient.html#sendEmailVerification) from the SDK to call the [`POST /api/v2/jobs/verification-email`](https://auth0.com/docs/api/management/v2#!/Jobs/post_verification_email) endpoint:

  - This endpoint sends an email to the specified user that asks them to click a link to [verify their email address](https://auth0.com/docs/brand-and-customize/email/manage-email-flow#verification-email).
    
  - Your web application must have the `update:users` permission from the Management API to perform this operation.

As such, follow these steps to assign permissions from the Management API to your Next.js web application:

- Open the ["APIs" section of the Auth0 Dashboard](https://manage.auth0.com/#/apis).
  
- Click on the "Auth0 Management API" option.

- Click on the "Machine to Machine Applications" tab.

- Locate your Auth0 web application register: `WHATABYTE Store`, or any other name you gave to your application earlier in the Auth0 dashboard.

- Click on the listing's toggle to switch it to "Authorized".

- Then, click on the arrow next to the toggle to display the menu that lets you assign Management API permissions to your Next.js web application.

- Select `update:users` from the "Permissions" menu and click the "Update" button.

You can follow these last steps in the future as your application grows and you need to perform more complex tasks easily in the Auth0 platform, such as accessing the phone number that your customers used to set up Multi-Factor Authentication (MFA). 

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
