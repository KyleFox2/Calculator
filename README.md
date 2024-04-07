# Calculator App

**Description:** Calculator App is a simple web application designed for basic arithmetic calculations. Built with HTML, CSS, and JavaScript, it offers a straightforward interface for performing addition, subtraction, multiplication, and division operations.

## Overview

This app is a convenient tool for maths. It leverages JavaScript to handle the logic behind operations, and I've assured quality within the application through Cypress and JS for the automated end-to-end testing.

## Features

- **Simple Interface:** The app features a clean and minimalist design, making it easy for users to input numbers and operators.
- **Arithmetic Operations:** Users can perform addition, subtraction, multiplication, and division operations seamlessly.
- **All Clear and Delete Functions:** With the "AC" button, users can clear all operands, while the "DEL" button allows for the deletion of the last entered character.
- **Responsive Design:** The app adapts to different screen sizes, ensuring a consistent user experience across devices.

## Usage

### Running the App

To use the Calculator App, simply open the `index.html` file in any web browser of your choice. The calculator interface will be displayed, ready for calculations.

### Testing
- Test cases in Excel, check [this Google Sheets document]([https://docs.google.com/spreadsheets/d/18NszpYo1fmwGb__hvIy-mU81LSvELhMYlyICU1u1R9k/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1J5-a7s8r0LfIy5E6I0YKsWl0F9B04XynIerXr5YdqLc/edit?usp=drive_link)).
- Cypress test results, check [this screenshot]([https://docs.google.com/spreadsheets/d/18NszpYo1fmwGb__hvIy-mU81LSvELhMYlyICU1u1R9k/edit?usp=sharing](https://drive.google.com/file/d/1kpszD9Okv6-QsY-nYoE-EUfDPjZfr6Fb/view?usp=drive_link)).

The app includes Cypress tests to validate its functionality. Follow these steps to run the tests:

1. Ensure Cypress is installed (`npm install cypress --save-dev`).
2. Navigate to the `cypress` directory.
3. Run `cypress open` to open the Cypress Test Runner.
4. Click on the test file (`calculator_spec.js`) to execute the tests.
