let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = "https://mutant-ml.herokuapp.com";
var path = '/mutant';
var epath = '/stats';


describe('Controlador de mutantes', () => {
  
    it('0) Verificando division por cero en base vacía ', (done) => {
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

    it('1) Petición POST vacía', (done) => {
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

    it('2) Verificar y Guardar ¿ es HUMANO ? - Matriz adn CUADRADA 6x6', (done) => {
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

    it('3) Verificar y Guardar ¿ es MUTANTE ? - Matriz adn CUADRADA 6x6', (done) => {
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

    it('4) DNA erróneo (diferentes dimensiones en la matriz )- Matriz CUADRADA 6x6', (done) => {
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
    it('5) Verificar y Guardar ¿ es HUMANO ? - Matriz adn 4x6', (done) => {
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

    it('6) Verificar y Guardar ¿ es MUTANTE ? - Matriz adn 4x6', (done) => {
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

    it('7 ) DNA erróneo (diferentes dimensiones en la matriz) - Matriz 4x6', (done) => {
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
    it('8) Verificar y Guardar ¿ es HUMANO ? - Matriz adn 8x5 - BUSQUEDA DIAGONAL DER-IZQ , IZQ-DER', (done) => {
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

    it('9) Verificar y Guardar ¿ es MUTANTE ? - Matriz adn 8x5', (done) => {
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

    it('10) DNA erróneo - Matriz 8x5 caracter (y) inválido  en dna, ', (done) => {
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

    it('11) Prueba con Matriz de 1x4 HUMANO', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AAAA\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(403);
                    done();
                }
            });
    }).timeout(20000);

    
    it('12) Prueba con Matriz de 1x1', (done) => {
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

    it('13) Matriz con caracteres de dna invalidos, solo admite G,T,C,H', (done) => {
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

    it('14 ) Prueba con Matriz invalida', (done) => {
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

    it('15) Verificar y Guardar ¿Es mutante? - Matriz de 1x15', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"AAAAGGTTTCCCATA\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(403);
                    done();
                }
            });
    }).timeout(20000);

    it('16) Estadísticas de mutantes y humanos ', (done) => {
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

    it('17) Verificar y No Guardar ¿Es mutante? Repitiendo un mismo dna del TEST 3 - no debe guardar en la bdd', (done) => {
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
    
    it('18) Estadísticas verificando que no se repita un registro existente ', (done) => {
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

    it('19) Verificar y Guardar - Matriz de 2x4 MUTANTE', (done) => {
        chai.request(url)
            .post(path)
            .set('Content-Type', 'application/json')
            .send({ "dna": "[\"CCCC\",\"GGGG\"]" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    }).timeout(20000);

    it('20) Estadísticas FINAL ', (done) => {
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

    it('21) Eliminando datos de la colección', (done) => {
        chai.request(url)
            .delete(path)
            .set('Content-Type', 'application/json')
            .send({})
            .end(function (err, res, body) {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    }).timeout(20000);
    it('22) Verificar colección vacía ', (done) => {
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