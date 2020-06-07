export default {
  types: `
    type Auth {
      id: ID!
      email: String
      token: String!
      expiresIn: Int!
    }
  `,
  query: `
    login(email: String!, password: String!): Auth!
    signup(email: String!, password: String!): Auth!
  `
}