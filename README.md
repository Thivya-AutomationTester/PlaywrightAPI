###  Overview ###
This project is a **Playwright-based API automation framework** for testing RESTful services. It includes structured fixtures, reusable assertions, and Allure reporting for detailed test results.
### Project Features ###
 - Structured Playwright fixtures for API tests.
 - Common response assertions using assertResponse.
 - Dynamic Allure reports with timestamping.
 - Full CRUD operations tested on the Booking API.
 - TypeScript-based for type safety and maintainability.
### Prerequisites ###
- Node.js >= 18
- Playwright
- Allure Commandline (for report generation)
### Project Structure ###
```
PlaywrightAPI/
│
├── 📂 .github/                      # GitHub workflow or configuration files (CI/CD, actions)
│
├── 📂 allure-results/               # Raw Allure test result files (auto-generated)
│
├── 📂 allure-report-YYYYMMDD-HHmmss/ # Timestamped Allure HTML report (auto-generated)
│
├── 📂 fixtures/                     # Custom Playwright fixtures 
│   └── test-fixtures.ts
│
├── 📂 tests/                        # All API test cases
│   └── apiTest.spec.ts
│
├── 📂 utils/                        # Test data and reusable helpers
│   └── BookingHelpers.ts
│   └── test-data.json
│
├── 📄 package.json                  # Project scripts and dependencies
├── 📄 playwright.config.ts          # Playwright configuration file
└── 📄 README.md                     # Project documentation
```

### Test Execution ###
Tests are written in TypeScript using Playwright's test framework.
This script will:
    - Run all Playwright API tests.
    - Generate a timestamped Allure report.
    - Open the report in your browser.
 ```
npm run test:allure

 ```
### Test Data ###
All the test data for API requests is stored in utils/test-data.json. 
This file contains JSON objects for different scenarios such as booking creation, authentication credentials, and updates.
### Fixtures ###
Fixtures are stored in the fixtures folder and extend Playwright’s test object to provide reusable setups like:
 - bookingid: Creates a new booking and returns its ID.
 - authToken: Generates a token for API authentication.
 - apiContext: Creates a Playwright API context with headers set for authenticated requests.
 - assertResponse: A helper function to perform common assertions on API responses.
### Reporting ###
 - Allure results are stored in allure-results/.
 - Each test run generates a new report folder: allure-report-YYYYMMDD-HHmmss/.
 - Run npm run test:allure to generate and view fresh reports.
### Notes ###
 - Project fully TypeScript based.
 - Designed for testing REST APIs (Booking API example).
 - Flexible to extend with more API endpoints.
