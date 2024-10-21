import { server, getRequestBody } from "../../starter.js";
import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as chai from "chai";
import chaiHttp from 'chai-http';
import { request } from 'chai-http';

chai.use(chaiHttp);

const response = ''
const body = ''

const testUsers = [
    { username: 'user1', age: 25, hobbies: ['coding'] },
    { username: 'user2', age: 30, hobbies: ['reading'] }
];

describe('', async () => {

    it('should GET all users', (done) => {
        request.execute(server)
            .get('/api/users')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).eql(0)
                done();
            });
    });

    it('should POST a new user', (done) => {

        request.execute(server)
            .post('/api/users')
            .send(JSON.stringify(testUsers[0]))
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('username').equal(testUsers[0].username);
                expect(res.body).to.have.property('age').equal(testUsers[0].age);
                expect(res.body).to.have.property('hobbies').that.deep.equal(testUsers[0].hobbies);
                done();
            });
    });

    it('should GET a single user by id', (done) => {
        request.execute(server)
            .post('/api/users')
            .send(JSON.stringify(testUsers[0]))
            .end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(201);
                const userId = res.body.id;

                request.execute(server)
                    .get(`/api/users/${userId}`)
                    .end((err, res) => {
                        if (err) done(err);
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('id').equal(userId);
                        expect(res.body).to.have.property('username').equal(testUsers[0].username);
                        expect(res.body).to.have.property('age').equal(testUsers[0].age);
                        expect(res.body).to.have.property('hobbies').that.deep.equal(testUsers[0].hobbies);
                        done();
                    });
            });
    });

    it('should PUT new user info', (done) => {

        request.execute(server)
            .post('/api/users')
            .send(JSON.stringify(testUsers[0]))
            .end((err, res) => {
                if (err) return done(err);

                expect(res).to.have.status(201);
                const userId = res.body.id;

                request.execute(server)
                    .put(`/api/users/${userId}`)
                    .send(JSON.stringify(testUsers[1]))
                    .end((err, res) => {
                        if (err) done(err);
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('username').equal(testUsers[1].username);
                        expect(res.body).to.have.property('age').equal(testUsers[1].age);
                        expect(res.body).to.have.property('hobbies').that.deep.equal(testUsers[1].hobbies);
                        done();
                    });

            })

    });

    it('should DELETE user', (done) => {
        request.execute(server)
            .post('/api/users')
            .send(JSON.stringify(testUsers[0]))
            .end((err, res) => {
                if (err) return done(err);

                expect(res).to.have.status(201);
                const userId = res.body.id;

                request.execute(server)
                    .delete(`/api/users/${userId}`)
                    .end((err, res) => {
                        if (err) done(err);
                        expect(res).to.have.status(204);

                        request.execute(server)
                            .get(`/api/users/${userId}`)
                            .end((err, res) => {
                                if (err) done(err);
                                expect(res).to.have.status(404);
                                done();
                            });
                    });
            })

    })

    afterAll('', () => {
        server.close()
    })

})