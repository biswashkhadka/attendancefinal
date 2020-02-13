const dotenv = require('dotenv');
dotenv.config;
const path = require("path");
const app = require('../index.js')
const request = require('supertest');
const expect = require('chai').expect;
const conn = require('../TestFolder/dbtest');
process.env.ATTENDANCE = 'test';

 let token ='';
 let id ='';

describe('Testing API all routes', () => {
    before(function(done) {
        this.timeout(150000)
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });
    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });
    // it('Pass, should get signup token', (done) => {
    //     request(app).post('/signup')
    //     .send({
    //         fullName:'Biswash Khadka',
    //         address:'kathmandu',
    //         module:'Android',
    //         email:'biswash1511@gmail.com',
    //         username:'biswash',
    //         password:'biswash1511',
    //         image:''            

    //     })
    //         .then((res) => {
    //             expect(res.statusCode).to.equal(200)
    //             expect(res.body).to.contain.property('token');
    //             token = `Bearer ${res.body.token}`
    //             done();
    //         })
    //         .catch((err) => done(err));
    // })


    //note
    it('Pass, fetch data to server', (done) => {
        request(app).post('/addNote')
            .send({
                title: "webapi",
                message: "class will be tomorrow."
            })
            .then((res) => {
                expect(res.statusCode);
                done();
            })
            .catch((err) => done(err));
    })


    it('Pass, add schedule', (done) => {
        request(app).post('/addSchedule')
            .send({
                day: "Monday",
                subject: "IOT.",
                date:"02/19/2019"
            })
            .then((res) => {
                expect(res.statusCode);
                foodId = res.body.id
                done();
            })
            .catch((err) => done(err));
    })

   it('Pass, add student', (done) => {
        request(app).post('/student')
            .send({
                fullname: "Bibek Panta",
                address: "Lamgunj",
                email: "bibek@gmail.com",
                batch: "22A",
                admissionnum:"170294"
            })
            .then((res) => {
                expect(res.statusCode);
                studentId = res.body.id
                done();
            })
            .catch((err) => done(err));
    })


     it('Fail, passing empty value', (done) => {
            request(app).post('/student').send({
                fullname: "",
                address: "Lamgunj",
                email: "bibek@gmail.com",
                batch: "22A",
                admissionnum:"170294"
                })
                .then((res) => {
                    expect(res.statusCode).to.equal(500)
                    done();
                })
                .catch((err) => done(err));
        })

    it('Pass, Get student details', (done) => {
            request(app).get('/student')
                // .set('Authorization', token)
                .then((res) => {
                    const body = res.body;
                    // expect(body).to.contain.property('_id');
                    expect(body).to.not.be.empty;
                    done();
                })
                .catch((err) => done(err));
        })

       
        it('Pass, update student info', (done) => {
            // let foodId = res.body._id
            request(app).put('/update/' + foodId)
            
                .set('Authorization', token)
                .send({
                   fullname: "Bibek updated",
                address: "Lamgunj updated",
                email: "bibek@gmail.com",
                batch: "22A",
                admissionnum:"170294"
                    
                })
                .then((res) => {
                    expect(res.statusCode).to.equal(500);
                    expect(res.body).to.not.be.empty;
                    done();
                })
                .catch((err) => done(err));
        })

        it('OK, create new food and delete the same food', (done) => {
            request(app).post('/addNote')
                .set('Authorization', token)
                .send({
                    title: "deleted",
                    message: "sucessfully deleted",
                    
                })
                .then((res) => {
                    let id = res.body._id
                    request(app).delete('/note/' + id)
                        .set('Authorization', token)
                        .then((res) => {
                            expect(res.statusCode).to.equal(500);
                            //expect(res.body).to.contain.property('status', 'Location deleted successfully');
                            done();
                        })
                        .catch((err) => done(err));
                })
                .catch((err) => done(err));
        })

         it('Pass, Get note details', (done) => {
        request(app).get('/')
            // .set('Authorization', token)
            .then((res) => {
                const body = res.body;
                expect(body).to.not.be.empty;
                done();
            })
            .catch((err) => done(err));
    })

          it('Pass, Get schedule details', (done) => {
        request(app).get('/')
            // .set('Authorization', token)
            .then((res) => {
                const body = res.body;
                expect(body).to.not.be.empty;
                done();
            })
            .catch((err) => done(err));
    })


          it('Pass, Get schedule details', (done) => {
        request(app).get('/student')
            // .set('Authorization', token)
            .then((res) => {
                const body = res.body;
                expect(body).to.not.be.empty;
                done();
            })
            .catch((err) => done(err));
    })
 


//     it('Fail, sending empty name and password', (done) => {
//         request(app).post('/signup').send({
//             email:'raju@gmail.com',
//             fullName:'',
//             password:'',
//             age:'14',
//             phone:'12121212',
//             address:'Chabhel',
//             image:'' 
//             })
//             .then((res) => {
//                 expect(res.statusCode).to.equal(500)
//                 expect(res.body).to.contain.property('status', 'User validation failed: fullName: Path fullName is required.')
//                 done();
//             })
//             .catch((err) => done(err));
//     })

//     //Login
//     // it('Pass, should get login token', (done) => {
//     //     request(app).post('/login')
//     //     .send({
//     //         email:'jemin@gmail',
//     //         password:'jemin123',           

//     //     })
//     //         .then((res) => {
//     //             expect(res.statusCode).to.equal(500)
//     //             // expect(res.body).to.contain.property('token');
//     //             expect(res.body).to.contain.property('status', 'User not found!', 'token');
//     //             token = Bearer ${res.body.token};
//     //             done();
//     //         })
//     //         .catch((err) => done(err));
//     // })

//     it('Fail, sending empty email as login detail', (done) => {
//         request(app).post('/signup').send({
//             email:'',
//             password:'jemin123', 
//             })
//             .then((res) => {
//                 expect(res.statusCode).to.equal(500)
// //                expect(res.body).to.contain.property('status', 'User validation failed: fullName: Path fullName is required.')
//                 done();
//             })
//             .catch((err) => done(err));
//     })

//     it('Pass, Get user details', (done) => {
//         request(app).get('/me')
//             .set('Authorization', token)
//             .then((res) => {
//                 const body = res.body;
//                 expect(body).to.contain.property('_id');
//                 expect(body).to.contain.property('email', 'raju@gmail.com');
//                 expect(body).to.contain.property('fullName', 'Raju Chandra');
//                 expect(body).to.contain.property('address', 'Chabhel');
//                 expect(body).to.contain.property('phone', '12121212');
//                 done();
//             })
//             .catch((err) => done(err));
//     })

//     it('Fail, provided dummy token', (done) => {
//         request(app).get('/me')
//             .set('Authorization', 'dummytoken')
//             .then((res) => {
//                 const body = res.body;
//                 expect(body).to.not.be.empty;
//                 done();
//             })
//             .catch((err) => done(err));
//     })

//     //contact
//     it('Pass, fetch data to server', (done) => {
//         request(app).post('/contacts')
//             .send({
//                 email: "jemin@gmail.com",
//                 description: "contact me"
//             })
//             .then((res) => {
//                 expect(res.statusCode).to.equal(200);
//                 done();
//             })
//             .catch((err) => done(err));
//     })

//     // it('Fail, sending empty email', (done) => {
//     //     request(app).post('/contacts').send({
//     //         email:'',
//     //         description:'contactt', 
//     //         })
//     //         .then((res) => {
//     //             expect(res.statusCode).to.equal(500)
//     //             done();
//     //         })
//     //         .catch((err) => done(err));
//     // })

//    
//     it('Fail, empty body', (done) => {
//         request(app).get('/contacts')
//             // .set('Authorization', 'dummytoken')
//             .then((res) => {
//                 const body = res.body;
//                 expect(body).to.not.be.empty;
//                 done();
//             })
//             .catch((err) => done(err));
//     })

//     //food
//     it('Pass, posting food data', (done) => {
//         request(app).post('/foods')
//             .send({
//                 name: "pizza",
//                 price: "2232",
//                 image: ""
//             })
//             .then((res) => {
//                 expect(res.statusCode).to.equal(200);
//                 foodId = res.body.id
//                 done();
//             })
//             .catch((err) => done(err));
//     })

//   
    });