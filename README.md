# Survivor-Pool-Assistant

# Overview

NFL Survivor Pool Assistant helps to aggregate and streamline everything you need to know and every action you need to take for your pool. When you visit the page, the most up-to-date odds on all NFL games are available to you. Just pick the number of teams you're allowed to take each week and when you're ready, text your picks to your commish. No more forgetting to send picks in on time!

# Technical details

This app is in-progress - it currently only texts one commissioner number\.  Be sure to utilize the test data (testdata.json) file when testing and making changes locally, as The Odds API has a monthly limit on get requests before it starts charging $$$.

Front end is built with React<br>Server is Express

# Required credentials (make sure to .gitignore)
1) Twilio auth token & id
2) The-odds-api.com api key

# How to get component running
1) build webpack
  command: npm run-script build:dev
2) fire up server
  command: npm start
3) navigate to localhost:3000
