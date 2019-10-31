let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = "https://mutant-ml.herokuapp.com";
var path = '/mutant';

describe('Controlador de mutantes ', () => {
    console.log (url);
    it('Verificamos si es mutante o humano', (done) => {
        chai.request(url)
            .post(path)         
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AATAGA\",\"CAGTGC\",\"TTAGTT\",\"AGACGG\",\"GCGTCA\",\"TCGGGG\"]" })
            .end(function (err, res,body) {
                if(err){
                    done(err);
                }else{
                    expect(res).to.have.status(403); 
                    
                    done();
                }  
            });
    }).timeout(10000);
});