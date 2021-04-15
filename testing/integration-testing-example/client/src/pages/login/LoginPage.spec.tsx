import { RouterTextUtils } from "../../shared/testing/RouterTestUtils"
import LoginPage from "./LoginPage"
import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, waitFor } from "@testing-library/dom"
import { LOGIN } from './useLogin'
import { act } from "@testing-library/react"
import { Login, LoginVariables, Login_login } from "./__generated__/Login"

const waitForResponse = () => new Promise(res => setTimeout(res,0));

describe('Feature: Login', () => {

  describe('Scenario: Successful login', () => {
    describe('Given I have an account', () => {
      describe('When I try to login', () => {
        test('Then I should be redirected to the dashboard', async () => {

          // Arrange
          const mocks = [
            {
              request: {
                query: LOGIN,
                variables: {
                  input: {
                    email: 'khalil@apollographql.com', password: "tacos"
                  }
                } as LoginVariables,
              },
              result: {
                data: {
                  login: {
                    __typename: 'LoginSuccess',
                    token: "bingo-bango-boom-auth-token",
                  },
                } as Login,
              },
            }
          ];

          const component = RouterTextUtils.renderWithRouter(
            <MockedProvider mocks={mocks} addTypename={true}>
              <LoginPage/>
            </MockedProvider>
          );

          // Act
          const emailInput = await component.getByPlaceholderText(/email/);
          fireEvent.change(emailInput, { target: { value: 'khalil@apollographql.com'}});
          
          const passwordInput = await component.getByPlaceholderText(/password/);
          fireEvent.change(passwordInput, { target: { value: 'tacos'}})

          const button = await component.findByRole('button');

          button.click();

          await act(async() => {
            await waitForResponse()  
          })   

          // Assert
          // Todo: spy on the call to the history object and see that it called /dashboard
          

        })
      })
    })
  })

  describe('Scenario: Account doesnt exist', () => {
    describe('Given I dont have an account', () => {
      describe('When I try to login', () => {
        test('Then I should be presented with a prompt to sign up', () => {
          expect(1 + 1).toBe(2)
        })
      })
    })
  })

  describe('Scenario: Incorrect password', () => {
    describe('Given I have an account', () => {
      describe('When I use an incorrect password to login', () => {
        test('Then I should be presented with a password failed error', () => {
          expect(1 + 1).toBe(2)
        })
      })
    })
  })

})