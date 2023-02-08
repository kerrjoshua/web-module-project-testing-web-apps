import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm/>)
    const mainHeader = screen.getByRole('heading')

    expect(mainHeader).toHaveTextContent(/^contact form$/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'josh')

    if (firstName.value.length < 5) {
        const err = screen.getByText(/at least 5/i)
    }
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
const firstName = screen.getByLabelText(/first name/i);
const lastName = screen.getByLabelText(/last name/i)
const email = screen.getByLabelText(/email/i);
userEvent.type(firstName, 'j');
userEvent.clear(firstName)
userEvent.type(lastName, 'j');
userEvent.clear(lastName)
userEvent.type(email, 'j');
userEvent.clear(email)
const errs = screen.getAllByText(/^error/i);
expect(errs.length).toBe(3);

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
const firstName = screen.getByLabelText(/first name/i);
const lastName = screen.getByLabelText(/last name/i)
const email = screen.getByLabelText(/email/i);
userEvent.type(firstName, 'jonnu');
userEvent.type(lastName, 'smith');
userEvent.type(email, 'j');
userEvent.clear(email)
const errs = screen.getAllByText(/^error/i);
expect(errs.length).toBe(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
const email = screen.getByLabelText(/email/i);
userEvent.type(email, 'j');
userEvent.clear(email)
const errs = screen.getAllByText(/email must be a valid email address/i);
expect(errs.length).toBe(1);

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
const submit = screen.getByText(/submit/i);
userEvent.click(submit);
const err = screen.getByText(/lastName is a required field/i);

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
        render(<ContactForm />);
    const fNameInput = screen.getByLabelText(/first name/i);
    const lNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByText(/submit/i);

    const firstName = 'Gordon'
    const lastName = 'Gano'
    const email = 'ggano@gmail.com'
    const message = 'Please do not go!'

    userEvent.type(fNameInput, firstName);
    userEvent.type(lNameInput, lastName);
    userEvent.type(emailInput, email);
    userEvent.click(submitButton);

    expect(screen.queryByText(firstName)).toBeTruthy()
    expect(screen.queryByText(lastName)).toBeTruthy();
    expect(screen.queryByText(email)).toBeTruthy();
    expect(screen.queryByText(message)).toBeFalsy();



});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
const fNameInput = screen.getByLabelText(/first name/i);
const lNameInput = screen.getByLabelText(/last name/i);
const emailInput = screen.getByLabelText(/email/i);
const messageInput = screen.getByLabelText(/message/i);
const submitButton = screen.getByText(/submit/i);

const firstName = 'Gordon'
const lastName = 'Gano'
const email = 'ggano@gmail.com'
const message = 'Please do not go!'

userEvent.type(fNameInput, firstName);
userEvent.type(lNameInput, lastName);
userEvent.type(emailInput, email);
userEvent.type(messageInput, message);
userEvent.click(submitButton);

expect(screen.queryByText(firstName)).toBeTruthy()
expect(screen.queryByText(lastName)).toBeTruthy();
expect(screen.queryByText(email)).toBeTruthy();
expect(screen.queryByText(message)).toBeTruthy();


});
