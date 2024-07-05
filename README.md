# Flight Booking System

## Description

<p>This project is a flight booking system backend application that allows users to manage flight bookings and handle user authentication.</p>

## Table of Contents

<ul>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#routes">Routes</a></li>
    <li><a href="#middleware">Middleware</a></li>
    <li><a href="#models">Models</a></li>
</ul>

## Installation

<ol>
    <li>Clone the repository: <code>https://github.com/Kashishkashyap/FlightBookingSite.git</code></li>
    <li>Install dependencies:</li>
    <code>npm install</code>
    <li>Set Up Environment Variables: Create a <code>.env</code> file in the root directory with the following details:
        <pre>
        MONGO_URI=your_mongodb_connection_string
        MAILGUN_API_KEY=your_mailgun_api_key
        MAILGUN_DOMAIN=your_mailgun_domain
        PORT=3000
        </pre>
    </li>
</ol>

## Usage

<ol>
    <li>Start the server:</li>
    <code>npm start</code>
    <li>Access the application in your web browser at <code>http://localhost:3000</code>.</li>
</ol>

## Routes

<h2 id="booking-routes">Booking Routes</h2>

<ul>
    <li><code>POST /bookings</code> - <strong>Description:</strong> Create a new flight booking</li>
    <li><code>GET /bookings</code> - <strong>Description:</strong> Get a list of all bookings</li>
    <li><code>GET /bookings/new</code> - <strong>Description:</strong> Render the form to create a new booking</li>
    <li><code>GET /bookings/:id/edit</code> - <strong>Description:</strong> Render the form to edit a booking. <strong>URL Parameters:</strong> <code>id</code> - The ID of the booking to edit</li>
    <li><code>PUT /bookings/:id</code> - <strong>Description:</strong> Update the details of an existing booking. <strong>URL Parameters:</strong> <code>id</code> - The ID of the booking to update</li>
    <li><code>DELETE /bookings/:id</code> - <strong>Description:</strong> Delete an existing booking. <strong>URL Parameters:</strong> <code>id</code> - The ID of the booking to delete</li>
</ul>

<h2>User Authentication Routes</h2>

<ul>
    <li><code>POST /auth/signup</code> - <strong>Description:</strong> Register a new user</li>
    <li><code>POST /auth/signin</code> - <strong>Description:</strong> Log in an existing user</li>
</ul>

## Middleware

<p>List of middleware and their descriptions go here.</p>

<ul>
    <li><code>auth.js</code> - <strong>Description:</strong> Checks if the user is authorized to perform the action.</li>
</ul>

## Models

<p>List of models and their descriptions go here.</p>

<ul>
    <li><code>User Schema</code> - Defines the structure for user data.</li>
    <li><code>Booking Schema</code> - Defines the structure for booking data.</li>
</ul>
