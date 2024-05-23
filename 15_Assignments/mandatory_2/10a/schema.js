import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

import { users } from "./users.js";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => users,
    },
    userById: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => users.find((user) => user.id === args.id),
    },
    userByName: {
      type: UserType,
      args: { name: { type: GraphQLString } },
      resolve: (parent, args) => users.find((user) => user.name === args.name),
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const newUser = {
          id: users.length + 1,
          name: args.name,
          email: args.email,
        };
        users.push(newUser);
        return newUser;
      },
    },
  },
});


export const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType,
});