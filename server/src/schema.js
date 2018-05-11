import { makeExecutableSchema } from 'graphql-tools';
import { v1 as neo4j } from 'neo4j-driver';

const typeDefs = `
type Movie {
  movieId: ID!
  title: String
  year: Int
  plot: String
  poster: String
  imdbRating: Float
  genres: [String]
  similar(first: Int=3, offset:Int=0): [Movie]
}

type Query {
  moviesByTitle(subString: String!, first: Int=3, offset: Int=0): [Movie]
}
`;

const resolvers = {
  Query: {
    moviesByTitle: (root, args, context) => {
      let session = context.driver.session();
      let query = "MATCH (movie:Movie) WHERE LOWER(movie.title) CONTAINS LOWER($subString) RETURN movie LIMIT $first;"
      return session.run(query, args)
        .then( result => { return result.records.map(record => { return record.get("movie").properties })})
    },
  },
  Movie: {
    genres: (movie, _, context) => {
      let session = context.driver.session();
      let params = {movieId: movie.movieId};
      let query = `
				MATCH(m:Movie)-[:IN_GENRE]->(g:Genre)
				WHERE m.movieId = $movieId
 				RETURN g.name AS genre
			`;

      return session.run(query, params)
      	.then( result => { return result.records.map(record => {return record.get("genre")})})

    },
    similar: (movie, _, context) => {
      let session = context.driver.session();
      let params = {movieId: movie.movieId};
      let query = `
				MATCH (m:Movie) WHERE m.movieId = $movieId
        MATCH (m)-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(movie:Movie)
        WITH m, movie, COUNT(*) AS genreOverlap
        MATCH (m)<-[:RATED]-(:User)-[:RATED]->(movie:Movie)
        WITH movie,genreOverlap, COUNT(*) AS userRatedScore
        RETURN movie ORDER BY (0.9 * genreOverlap) + (0.1 * userRatedScore)  DESC LIMIT 3
			`;

      return session.run(query, params)
      	.then( result => {return result.records.map(record => {return record.get("movie").properties})})
    }
  }

};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

let driver;

export function context(headers, secrets) {
  if (!driver) {
    driver = neo4j.driver(secrets.NEO4J_URI || "bolt://localhost:7687", neo4j.auth.basic(secrets.NEO4J_USER || "neo4j", secrets.NEO4J_PASSWORD || "letmein"))
  }
  return {
    driver
  }
};
