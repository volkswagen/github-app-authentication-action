# GitHub App Authentication Action
Get temporary GitHub API credentials using a GitHub App

[![Test](https://github.com/volkswagen/github-app-authentication-action/actions/workflows/test.yml/badge.svg)](https://github.com/volkswagen/github-app-authentication-action/actions/workflows/test.yml)
[![System Test](https://github.com/volkswagen/github-app-authentication-action/actions/workflows/automerge.yml/badge.svg)](https://github.com/volkswagen/github-app-authentication-action/actions/workflows/automerge.yml)

## Usage

First [Create a GitHub App](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app) (Callback URL, OAuth-Flow and Webhook-Url is not necessary for this action) and add it to your GitHub Organization.

## Example pipeline
```yaml
name: Authenticate
on: [push]
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
    - name: Authenticate
      id: authenticate
      uses: volkswagen/github-app-authentication-app@v1
      with:
        appId: ${{ secrets.APP_ID }}
        clientId: ${{ secrets.CLIENT_ID }}
        clientSecret: ${{ secrets.CLIENT_SECRET }}
        privateKey: ${{ secrets.PRIVATE_KEY }}
        installationId: ${{ secrets.INSTALLATION_ID }}
    - name: Another Job 
      uses: something_else
      with:
        token: ${{ steps.authenticate.output.token }}
```

## Mandatory Arguments

`appId` is the app ID of the GitHub App (see App Settings > General > About)  
`clientId` the client ID of the GitHub App (see App Settings > General > About, e.g. Iv1.*********)  
`privateKey` the private key of the GitHub App  
`clientSecret` the client secret of the GitHub App  
`installationId` the installation id of the GitHub App  

## Outputs

`token` is a token that can be used on the GitHub API 
