// cypress/support/commands.js
Cypress.Commands.add('loginByGoogleApi', () => {
    cy.log('Logging in to Google')
    cy.request({
      method: 'POST',
      url: 'https://www.googleapis.com/oauth2/v4/token',
      body: {
        grant_type: 'refresh_token',
        client_id: Cypress.env('googleClientId'),
        client_secret: Cypress.env('googleClientSecret'),
        refresh_token: Cypress.env('googleRefreshToken'),
      },
    }).then(({ body }) => {
        const { access_token, id_token } = body
        cy.log('body', body)
  
      cy.request({
        method: 'GET',
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: { Authorization: `Bearer ${access_token}` },
      }).then(({ body }) => {
        const userItem = {
          token: id_token,
          user: {
            googleId: body.sub,
            email: body.email,
            givenName: body.given_name,
            familyName: body.family_name,
            imageUrl: body.picture,
          },
        }
  
          window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
          cy.log(userItem)
          cy.visit('https://simplestudy.cloud/login')
          cy.get(':nth-child(4) > a').click()
          cy.visit('https://accounts.google.com/v3/signin/identifier?opparams=%253F&dsh=S-1710674292%3A1710623090340965&access_type=offline&client_id=1073547697198-44vnbt0fp834assscl54t07pobvqdaje.apps.googleusercontent.com&ddm=0&o2v=2&prompt=select_account+consent&redirect_uri=https%3A%2F%2Fsimplestudy.cloud%2Fpages%2FgoogleAuth&response_type=code&scope=email+profile&service=lso&theme=mn&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hANeMIw4aYzCKMO7rZnn79QDH2HBusrSfgNkKsVy-0nZC2Az2OJZyTPX5X97ZoLajHL_2_jPcdAndtRXsY9sQ_cxhz1sLSJkhxKvjxCUHndFqGoxCUf89uxc9YW4nxBJvTPb180NW-2R8N6R2QyyhEADIcaD4wGluqO2zLn8dgEZeR1y77d2RlvwC0xijLTUlNYw-jwANj3Vu8eXxwqqP0DdwzVOiwk8kyNcVoEvnh0tCLN1FpP_8gLo0MQrRIa30eMJSaorQhw_BZJSSypJdZfhpQ6TaV3dxQGkHfx6RkOWmBhaZYJvYABblgkYGAO_pitSvPuelMhPbJrj4rjO5G_9OTgvz05GrOQZqmLsgjFG79Xi2coBroNrQRaPS_JxdT3MjlSQUqkXdVJV0XwxuGXHBQ--sksjvn1PjJ9jyTY-pbjiw7d4Ud-iio6lPGY9ljwjkG_vxPIgiGIIjRByr6PPrSjSkQ%26flowName%3DGeneralOAuthFlow%26as%3DS-1710674292%253A1710623090340965%26client_id%3D1073547697198-44vnbt0fp834assscl54t07pobvqdaje.apps.googleusercontent.com%26theme%3Dmn%23&app_domain=https%3A%2F%2Fsimplestudy.cloud&rart=ANgoxce5wsmjz0ZbHEm5tarNQAYl-DDLzTv2Bd4eSE1d0K1CZxBQHWqgGNHuW4FDzlv1nm3swDOdHWHSBbs6ejsys0fieXeMEZxuWw_jzJJbgMBB3N184m4')
          cy.origin().should('eq', 'https://accounts.google.com/v3/signin/identifier?opparams=%253F&dsh=S-1710674292%3A1710623090340965&access_type=offline&client_id=1073547697198-44vnbt0fp834assscl54t07pobvqdaje.apps.googleusercontent.com&ddm=0&o2v=2&prompt=select_account+consent&redirect_uri=https%3A%2F%2Fsimplestudy.cloud%2Fpages%2FgoogleAuth&response_type=code&scope=email+profile&service=lso&theme=mn&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hANeMIw4aYzCKMO7rZnn79QDH2HBusrSfgNkKsVy-0nZC2Az2OJZyTPX5X97ZoLajHL_2_jPcdAndtRXsY9sQ_cxhz1sLSJkhxKvjxCUHndFqGoxCUf89uxc9YW4nxBJvTPb180NW-2R8N6R2QyyhEADIcaD4wGluqO2zLn8dgEZeR1y77d2RlvwC0xijLTUlNYw-jwANj3Vu8eXxwqqP0DdwzVOiwk8kyNcVoEvnh0tCLN1FpP_8gLo0MQrRIa30eMJSaorQhw_BZJSSypJdZfhpQ6TaV3dxQGkHfx6RkOWmBhaZYJvYABblgkYGAO_pitSvPuelMhPbJrj4rjO5G_9OTgvz05GrOQZqmLsgjFG79Xi2coBroNrQRaPS_JxdT3MjlSQUqkXdVJV0XwxuGXHBQ--sksjvn1PjJ9jyTY-pbjiw7d4Ud-iio6lPGY9ljwjkG_vxPIgiGIIjRByr6PPrSjSkQ%26flowName%3DGeneralOAuthFlow%26as%3DS-1710674292%253A1710623090340965%26client_id%3D1073547697198-44vnbt0fp834assscl54t07pobvqdaje.apps.googleusercontent.com%26theme%3Dmn%23&app_domain=https%3A%2F%2Fsimplestudy.cloud&rart=ANgoxce5wsmjz0ZbHEm5tarNQAYl-DDLzTv2Bd4eSE1d0K1CZxBQHWqgGNHuW4FDzlv1nm3swDOdHWHSBbs6ejsys0fieXeMEZxuWw_jzJJbgMBB3N184m4'); // Verify the origin
          let email = 'alomgirhossainjoy27@gmail.com'
            cy.get('#identifierId').type(email)
          cy.get('#identifierNext > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe > .VfPpkd-vQzf8d').click()
          
      })
    })
})
  
Cypress.Commands.add('logoutByGoogleApi', () => {
    cy.log('Logging out from Google')
    window.localStorage.removeItem('googleCypress')
    cy.visit('/')
})

describe('Sign in with Google', () => {
    it('should sign in with Google', () => {
      cy.loginByGoogleApi()
    })
})