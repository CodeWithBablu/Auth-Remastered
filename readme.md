<h1 id="title" align="center">Authentiaction System</h1>

<p id="description">A complete authentication system which can be used as a starter code for creating any new application</p>

<h2>🚀 Demo</h2>

<b>[Live Demo](https://authsystem.up.railway.app/)</b>

<h2>A Glimpse Behind the Curtain :</h2>

<br><br><b>Home</b><br><br>

![home](https://github.com/CodeWithBablu/Auth-Remastered/assets/59352323/d3c3461f-3911-4763-81bb-f89199f6484c)

<br><br><b> Sign-in Page </b> <br><br>

![signin](https://github.com/CodeWithBablu/Auth-Remastered/assets/59352323/8b3c799a-9f0a-49a3-8be1-758eb523e869)

<br><br><b> Email verification link mail </b><br><br>

![email verification](https://github.com/CodeWithBablu/Auth-Remastered/assets/59352323/667edb38-aa9b-481d-8d27-3786bf535c7a)

<br><br><b> Sign-up Page </b><br><br>

![signup](https://github.com/CodeWithBablu/Auth-Remastered/assets/59352323/a36b3fe8-3e6f-4306-b7ba-930e61581fce)

<br><br><b> Reset password request Page </b><br><br>

![reset request](https://github.com/CodeWithBablu/Auth-Remastered/assets/59352323/9680ac94-8b8b-42e2-8897-1a5acf1d539f)

<br><br><b> Reset password link mail </b><br><br>

![reset request mail](https://github.com/CodeWithBablu/Auth-Remastered/assets/59352323/c56c23d1-85df-4e20-9852-78f68a2bc295)

<br><br><b> Reset password Page  </b><br><br>

![forgot passowrd](https://github.com/CodeWithBablu/Auth-Remastered/assets/59352323/a29a1431-8b6f-4a6e-b19d-3d7c83bb1216)

<br><br><b> profile Page </b><br><br>

![profile](https://github.com/CodeWithBablu/Auth-Remastered/assets/59352323/0712f679-71c0-4a12-a1c7-9685845e0763)

<br><br><b> Error Page: to look back to your deeds  </b><br><br>

![error](https://github.com/CodeWithBablu/Auth-Remastered/assets/59352323/b2ab29d4-cefe-46f9-9b9b-909d6f5e79ed)




<h2>🧐 Features 😎️</h2>

Here're some of the project's best features:

- Sign up with email
- Sign in
- Sign out
- Reset password after sign in
- The password stored in the db are encrypted
- Google login/signup (Social authentication)
- Forgot password
- Display notifications for - unmatching passwords during sign up
- Display notifications for - incorrect password during sign in

<h2>🛠️ Installation Steps:</h2>

<p>1. Get the latest snapshot</p>

```
git clone https://github.com/CodeWithBablu/Auth-Remastered.git
```

<p>2. Install NPM dependencies</p>

```
npm install
```

<p>3. Then simply start your app</p>

```
npm start
```
<p>4. Then simply start your app</p>

**Extra configuration**
  -  tailwindcss
  -  for those who don't want to dig in
  -  .env file setup
```
  BASE_URL= (your web app base url)
  PORT=
  SESSION_SECRET=
  
  NODE_ENV= options("dev","prod")
  MONGO_URL= (your database url)
  
  SITE_KEY= (for recapcha)
  SITE_SECRET= (for recapcha)
  
  USER_EMAIL= (for nodemailer)
  USER_PASS="App password google"

  <!-- to setup google authentication -->
  
  G_CLIENT_ID=
  G_CLIENT_SECRET=
  G_CALL_BACK=

```
<h2>💻 Built with</h2>

Technologies used in the project:

- Node Js
- Express Js
- EJS
- CSS
- Javascript
- tailwindcss
- MongoDB
- Passport Js
