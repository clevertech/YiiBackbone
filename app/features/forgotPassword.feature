Feature: Forgot Password feature
  As a user
  I want to click a link
  So that I can have my password emailed to me when I forgot it

  # Background:
    # User is not logged in

  Scenario: Example Scenario  
		Given I am on the login page
		When I click the forgot password link
		And I enter in my email
		And click submit
		Then my password is emailed to me 
