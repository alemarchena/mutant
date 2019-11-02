				EXAMEN MERCADO LIBRE - RAUL ALEJANDRO MARCHENA

Ejecución de la API Rest desde POSTMAN

POST url: https://mutant-ml.herokuapp.com/mutant
headers Key: Content-Type , Value: application/json
body raw: {"dna": "[\"GGCAG\",\"ACCCC\",\"CCCTA\",\"CAGTG\"]"}

GET url: https://mutant-ml.herokuapp.com/stats/

DELETE url: https://mutant-ml.herokuapp.com/mutant

----------------------------------------------------------------------------------------------------
Herramientas de desarrollo: 
	https://code.visualstudio.com/
	https://nodejs.org/es/
	https://www.npmjs.com/
	http://expressjs.com/es/
	https://mongoosejs.com/

Dependencias:
 "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "mongoose": "^5.7.7",
    "morgan": "^1.9.1",
    "node": "^12.13.0"
  }
----------------------------------------------------------------------------------------------------

Pruebas Unitarias con
	https://mochajs.org/ 
	https://www.chaijs.com/
	https://www.chaijs.com/plugins/chai-http/
  	
"devDependencies": {
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "mocha": "^6.2.2",
    "nodemon": "^1.19.4"
  }

