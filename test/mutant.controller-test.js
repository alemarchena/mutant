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
                    expect(res).to.have.status(400);
                    done();
                }
            });
    }).timeout(20000);

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
    }).timeout(20000);

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
    }).timeout(20000);

    it('DNA erróneo (diferentes dimensiones en la matriz )- Matriz CUADRADA 6x6', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AATGA\",\"CAGTGC\",\"TTAGTT\",\"AGACGG\",\"GCGTCA\",\"TCGGGG\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(400);
                    done();
                }
            });
    }).timeout(20000);

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
    }).timeout(20000);

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
    }).timeout(20000);

    it('DNA erróneo (diferentes dimensiones en la matriz) - Matriz 4x6', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AATGA\",\"CAGTGC\",\"GCGTCA\",\"TCGGGG\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(400);
                    done();
                }
            });
    }).timeout(20000);

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
    }).timeout(20000);

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
    }).timeout(20000);

    it('DNA erróneo - Matriz 8x5 caracter (y) inválido  en dna, ', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AATAGA\",\"CAGTGC\",\"TTyGTT\",\"AGAAGG\",\"TTTGGT\",\"TTATAT\",\"TTAGTT\",\"TTAGAT\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(400);
                    done();
                }
            });
    }).timeout(20000);

    it('Prueba con Matriz de 1x4 MUTANTE', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AAAA\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    }).timeout(20000);

    it('Prueba con Matriz de 1x4 HUMANO', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"ACAA\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    }).timeout(20000);

    it('Prueba con Matriz de 1x1', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"A\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(400);
                    done();
                }
            });
    }).timeout(20000);

    it('Matriz con caracteres de dna invalidos, solo admite G,T,C,H', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AAAAGGTTTHHCHTA\",\"GGTTTHHCHTAAAAA\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(400);
                    done();
                }
            });
    }).timeout(20000);

    it('Prueba con Matriz invalida', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(400);
                    done();
                }
            });
    }).timeout(20000);

    it('¿Es mutante? - Matriz de 1x15', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AAAAGGTTTCCCATA\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    }).timeout(20000);

    it('Estadísticas de mutantes y humanos ', (done) => {
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
    }).timeout(20000);

    it('¿Es mutante? Repitiendo un mismo dna - no debe guardar en la bdd', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AAAAGGTTTCCCATA\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    }).timeout(20000);
    
    it('Estadísticas verificando que no se repita un registro existente ', (done) => {
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
    }).timeout(20000);
});