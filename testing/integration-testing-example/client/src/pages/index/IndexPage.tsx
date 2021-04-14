
import React from 'react'
import Layout from '../../shared/components/layout/Layout';

const text = `
// src/login/LoginPage.spec.tsx

describe('Login', () => {
  describe('Scenario: Failed login', () => {
    
  })
})
`;

const IndexPage = () => (
  <Layout>
    <h1>Integration Test Example with Apollo Client & Jest</h1>
    <p>By <a href="https://khalilstemmler.com">Khalil Stemmler</a></p>
    <blockquote>Integration tests: <i>Verify that several components that come together to realize a <u>feature</u> work correctly.</i></blockquote>
    <code>
      <pre>
        {text}
      </pre>
    </code>
    <h2>Try it out</h2>
    <p>Go to the <a href="/login">login page</a> and test the following cases:</p>
    <h3>Successful login</h3>
    <p>Enter "khalil@apollographql.com" for the email and "tacos" for the password.</p>

    <h3>Account doesn't exist</h3>
    <p>Enter any email other than "khalil@apollographql.com".</p>

    <h3>Incorrect combination</h3>
    <p>Enter "khalil@apollographql.com" for the email and any password other than "tacos".</p>
  </Layout>
)

export default IndexPage;