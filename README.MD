# OODA Loops 

Based on Feathers-vuex TodoMVC demo stack which takes the existing [Vue](https://vuejs.org) [TodoMVC demo](https://vuejs.org/v2/examples/todomvc.html) and adds [Feathers](https://featherjs.com), and [Feathers-vuex](https://feathers-plus.github.io/v1/feathers-vuex) awesomeness!

In short, this stack makes it really simple to get reactive updates in Vue from a Feathers.js server, through Vuex.
 
It’s a beautiful combination of full-stack tech.

# How to get started

First, clone this repo

`git clone git@github.com:wdmtech/feathers-vuex-todomvc.git`

## Server (Feathers)

`cd server`

`npm install`

`npm run start`

## Client (Vue)

`cd client`

`npm install`

`npm run serve` or `vue ui` if you have [vue-cli 3](https://cli.vuejs.org/) or later.

Navigate to the url displayed (default `localhost:8080`) to view in your browser:

![preview.png](preview.png)


# Further information

## CRUD operations in the UI

The [Models and Instances API](https://feathers-plus.github.io/v1/feathers-vuex/model-classes.html) is used to create/remove/edit todos, and there is also an example [implementation](https://github.com/wdmtech/feathers-vuex-todomvc/blob/master/client/src/mixins/LoopsMixin.js) that illustrates receiving events from the server on the client.  

## `todos` service

### &hellip;on the client

The service is defined in feathers-vuex: [./client/src/store/services/todos.js](https://github.com/wdmtech/feathers-vuex-todomvc/blob/master/client/src/store/services/todos.js)

This is then loaded by the store: [./client/src/store/index.js](https://github.com/wdmtech/feathers-vuex-todomvc/blob/master/client/src/store/index.js)

