const graphql = require('graphql'); 
//const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author')
const Genrer = require('../models/genrer')

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       genre: { type: GraphQLString },
       publicationYear: { type: GraphQLInt },
       author: { 
        type: AuthorType ,
        resolve(parent, args){
            return Author.findById(args.id);
           }
        } 
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       books: { 
           type: GraphQLList(BookType),
           resolve(parent, args){
            return Book.find( { authorId: args.id });
        }
     },
    })
});

const GenrerType = new GraphQLObjectType({
    name: 'Genrer',
    fields: () => ({
       id: { type: GraphQLID },
       description: { type: GraphQLString },
       books: { 
           type: GraphQLList(BookType),
           resolve(parent, args){
            return Book.find( { genrer: args.description });
        }
     },
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return Book.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({});
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return Book.findById(args.id)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({});
            }
        },
        genrer: {
            type: GenrerType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return Book.findById(args.id)
            }
        },
        genrers: {
            type: new GraphQLList(GenrerType),
            resolve(parent, args){
                return Genrer.find({});
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: { 
                name: { type: new GraphQLNonNull(GraphQLString) },
                birthYear: { type: GraphQLInt } 
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    birthYear: args.birthYear
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: { 
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });    
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema( { query: RootQuery, mutation: Mutation } );