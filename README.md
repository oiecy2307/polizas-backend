BOILERPLATE FOR EXPRESS API
==================================

This boilerplate is based on Express & ES6 REST API Boilerplate.
It has some security topics added that are mentioned in this blog:
https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

NOTES:
- When running in local machine: export GOOGLE_APPLICATION_CREDENTIALS="./cuenta-servicio.json" is needed
- run: "nsp check" to check for npm vulnerabilities
- USE JSONSCHEMA FOR VALIDATE INCOMING JSONS
- USE VALIDATOR INSTEAD OF REGEXES
- Read this guide of 40 advices of node best practices https://github.com/i0natan/nodebestpractices/tree/security-best-practices-section#-65-collection-of-common-generic-security-best-practices-15-items
