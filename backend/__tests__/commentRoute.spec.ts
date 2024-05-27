import supertest from 'supertest'
import {server} from '../src/server'
import { PrismaClient, Post, Comment, User } from '@prisma/client'
import { after, describe } from 'node:test'

const prisma = new PrismaClient()
let post : Post
let user : User
let comment: Comment

beforeAll( async() => {
        user = await prisma.user.create({
            data: {
            first_name: 'Shawn',
            last_name: 'Barza',
            email: 'sample@email.com',
            password: 'samplepassword',
            type: 'user',
            image: '',
            created_at: new Date,
            updated_at: null,
            deleted_at: null
            }
        })
        post = await prisma.post.create({
            data: {
                caption: 'Sample Caption',
                content: 'Insert text here',
                user_id: user.user_id,
                votes: 0,
            }
        })
            comment = await prisma.comment.create({
                data: {
                    content: 'Nice!',
                    created_at: new Date,
                    deleted_at: null,
                    user_id: user.user_id,
                    post_id: post.post_id
                }
            })
    }),
   

describe('', ()=> {
    it ('should get all comments', async() => {
        const response = await supertest(server).get('/comments')
        expect(response.status).toBe(200)
    })
})

describe('', ()=> {
    it ('should get comment by id', async() => {
        const response = await supertest(server).get(`/comments/${comment.comment_id}`)
        expect(response.status).toBe(200)
    })
})

describe('', ()=> {
    it ('should create a comment', async() => {
        const response = await supertest(server).post(`/`)
        expect(response.status).toBe(200)
    })
})

afterAll(()=> {
    server.close()
})

