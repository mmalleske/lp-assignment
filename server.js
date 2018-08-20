const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')

const app = express();

mongoose.connect('mongodb://userTwo:test420@ds127342.mlab.com:27342/launchpad-assignment');

const Profile = mongoose.model('Profile', {
  name: String,
  description: String
});

const typeDefs = `
  type Query {
    hello(name: String): String!
    profiles: [Profile]
  }
  type Profile {
    id: ID!
    name: String!
  }
  type Mutation {
    createProfile(name: String!): Profile
    updateProfile(id: ID!, name: String): Boolean
    deleteProfile(id: ID!): Boolean
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    profiles: () => Profile.find()
  },
  Mutation: {
    createProfile: async (_, { name }) => {
      const profile = new Profile({name});
      await profile.save();
      return profile;
    },
    updateProfile: async (_, {id, name}) => {
      await Profile.findByIdAndUpdate(id, {name});
      return true
    },
    deleteProfile: async (_, {id}) => {
      await Profile.findByIdAndRemove(id);
      return true
    }
  }
}

app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once('open', function() {
  // server.start(() => console.log('Server is running on localhost:4000'))
  app.listen(3000, () => console.log('App listening on port 3000'))
});
