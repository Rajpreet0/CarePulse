# CarePulse

CarePulse is a healthcare management system built with Next.js, AppWrite, Twilio, TypeScript, TailwindCSS, and ShadCN. It aims to streamline healthcare operations by providing efficient management tools.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Complex Forms](#complex-forms)
  - [Code Breakdown](#code-breakdown)
    - [Patient Registration Form](#patient-registration-form)
    - [Appointment Scheduling Form](#appointment-scheduling-form)
    - [Medical History Form](#medical-history-form)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Patient Management**: Register and manage patient information.
- **Appointment Scheduling**: Schedule and track appointments.
- **Medical Records**: Maintain comprehensive medical histories.
- **Notifications**: Send reminders and notifications via Twilio integration.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Development Server

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

You can start editing the project by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Installation

To set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Rajpreet0/CarePulse.git
   cd CarePulse
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   Create a `.env.local` file in the root directory and add the necessary environment variables for AppWrite and Twilio integrations.

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

After setting up the project, you can:

- Register new patients.
- Schedule appointments.
- View and update medical histories.
- Receive notifications for upcoming appointments.

## Complex Forms

### Code Breakdown

Here is a detailed explanation of the complex forms:

#### Patient Registration Form

**Code Overview:**

```tsx
import React, { useState } from 'react';

const PatientRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    contact: '',
    address: '',
    allergies: '',
    conditions: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Send data to the backend or AppWrite API
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        type="date"
        name="dob"
        onChange={handleChange}
        required
        className="input-field"
      />
      <select name="gender" onChange={handleChange} required className="input-field">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        onChange={handleChange}
        required
        className="input-field"
      />
      <textarea
        name="address"
        placeholder="Address"
        onChange={handleChange}
        required
        className="input-field"
      />
      <textarea
        name="allergies"
        placeholder="Allergies"
        onChange={handleChange}
        className="input-field"
      />
      <textarea
        name="conditions"
        placeholder="Existing Conditions"
        onChange={handleChange}
        className="input-field"
      />
      <button type="submit" className="btn-primary">Register</button>
    </form>
  );
};

export default PatientRegistrationForm;
```

**What it Does:**
- Collects patient information via controlled components (`useState`).
- Handles form submission (`handleSubmit`) and logs or sends the data to the backend.
- Provides real-time updates to the form state on input changes.

#### Appointment Scheduling Form

**Code Overview:**

```tsx
const AppointmentForm = ({ patients, practitioners }) => {
  const [formData, setFormData] = useState({
    patient: '',
    date: '',
    time: '',
    reason: '',
    practitioner: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment Scheduled:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <select
        name="patient"
        onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
        required
        className="input-field"
      >
        <option value="">Select Patient</option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>{patient.name}</option>
        ))}
      </select>
      <input
        type="date"
        name="date"
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
        className="input-field"
      />
      <input
        type="time"
        name="time"
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        required
        className="input-field"
      />
      <textarea
        name="reason"
        placeholder="Reason for Appointment"
        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        className="input-field"
      />
      <select
        name="practitioner"
        onChange={(e) => setFormData({ ...formData, practitioner: e.target.value })}
        required
        className="input-field"
      >
        <option value="">Select Practitioner</option>
        {practitioners.map((practitioner) => (
          <option key={practitioner.id} value={practitioner.id}>{practitioner.name}</option>
        ))}
      </select>
      <button type="submit" className="btn-primary">Schedule</button>
    </form>
  );
};

export default AppointmentForm;
```

**What it Does:**
- Dynamically lists patients and practitioners from props.
- Allows scheduling an appointment with specific details.
- Submits the data for backend processing.

## Contributing

We welcome contributions to enhance CarePulse. To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request detailing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For more information, visit the [CarePulse Repository](https://github.com/Rajpreet0/CarePulse).
