let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = "https://mutant-ml.herokuapp.com";
var path = '/mutant';
var epath = '/stats';

describe('Controlador de mutantes', () => {
    it('Petición POST vacía', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({})
            .end(function (err, res, body) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(403);
                    done();
                }
            });
    }).timeout(1000);

    it('¿ es HUMANO ? - Matriz adn CUADRADA 6x6', (done) => {
        chai.request(url)
            .post(path)         
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AATAGA\",\"CAGTGC\",\"TTAGTT\",\"AGACGG\",\"GCGTCA\",\"TCGGGG\"]" })
            .end(function (err, res) {
                if(err){
                    done(err);
                }else{
                    expect(res).to.have.status(403); 
                    done();
                   
                }  
            });
    }).timeout(10000);

    it('¿ es MUTANTE ? - Matriz adn CUADRADA 6x6', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AAAAAT\",\"CAGTGC\",\"TTAGTT\",\"AGACGG\",\"GCGTCA\",\"TCGGGG\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    }).timeout(10000);

    it('DNA erróneo - Matriz CUADRADA 6x6', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AATGA\",\"CAGTGC\",\"TTAGTT\",\"AGACGG\",\"GCGTCA\",\"TCGGGG\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(403);
                    done();
                }
            });
    }).timeout(10000);

    //matriz 4x6
    it('¿ es HUMANO ? - Matriz adn 4x6', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AATAGA\",\"CAGTGC\",\"TTAGTT\",\"AGACGG\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(403);
                    done();
                }
            });
    }).timeout(10000);

    it('¿ es MUTANTE ? - Matriz adn 4x6', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AAAAAT\",\"CAGTGC\",\"GCGTCA\",\"TCGGGG\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    }).timeout(10000);

    it('DNA erróneo - Matriz 4x6', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AATGA\",\"CAGTGC\",\"GCGTCA\",\"TCGGGG\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(403);
                    done();
                }
            });
    }).timeout(10000);

    //matriz 8x5
    it('¿ es HUMANO ? - Matriz adn 8x5 - BUSQUEDA DIAGONAL DER-IZQ , IZQ-DER', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"CCTAA\",\"AGTGC\",\"TAGTT\",\"AGACG\",\"TTGGT\",\"TATAT\",\"TTAGT\",\"CTGAC\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(403);
                    done();
                }
            });
    }).timeout(10000);

    it('¿ es MUTANTE ? - Matriz adn 8x5', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AATAGA\",\"CAGTGC\",\"TTAGTT\",\"AGAAGG\",\"TTTGGT\",\"TTATAT\",\"TTAGTT\",\"TTAGAT\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    }).timeout(10000);

    it('DNA erróneo - Matriz 8x5 caracter inválido en dna', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AATAGA\",\"CAGTGC\",\"TTyGTT\",\"AGAAGG\",\"TTTGGT\",\"TTATAT\",\"TTAGTT\",\"TTAGAT\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(403);
                    done();
                }
            });
    }).timeout(10000);

    it('Get Estadísticas ', (done) => {
        chai.request(url)
            .get(epath)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                    console.log(res.body);
                }
            });
    }).timeout(10000);
});